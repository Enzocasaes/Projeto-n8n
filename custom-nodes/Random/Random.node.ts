import { IExecuteFunctions } from 'n8n-workflow';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import https from 'https';

// Custom node para gerar números aleatórios usando Random.org
export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    group: ['transform'],
    version: 1,
    description: 'Gera números aleatórios usando Random.org',
    defaults: {
      name: 'Random',
      color: '#4CAF50',
    },
    icon: 'file:random-icon.svg',
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Min',
        name: 'min',
        type: 'number',
        default: 1,
        required: true,
        description: 'Valor mínimo',
        typeOptions: {
          minValue: 1,
          maxValue: 1000000,
        },
      },
      {
        displayName: 'Max',
        name: 'max',
        type: 'number',
        default: 100,
        required: true,
        description: 'Valor máximo',
        typeOptions: {
          minValue: 1,
          maxValue: 1000000,
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    
    for (let i = 0; i < items.length; i++) {
      try {
        const min = this.getNodeParameter('min', i) as number;
        const max = this.getNodeParameter('max', i) as number;
        
        // Validação básica - não pode min > max
        if (min > max) {
          throw new Error('Min deve ser menor que Max');
        }
        
        const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
        
        // Faz a requisição HTTP
        const result = await new Promise<number>((resolve, reject) => {
          const request = https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => { 
              data += chunk.toString(); 
            });
            
            res.on('end', () => {
              const num = parseInt(data.trim(), 10);
              if (isNaN(num)) {
                reject(new Error('Resposta inválida da API'));
              } else {
                resolve(num);
              }
            });
          });
          
          request.on('error', (err) => {
            reject(new Error(`Erro: ${err.message}`));
          });
        });
        
        // Retorna o resultado
        returnData.push({ 
          json: { 
            randomNumber: result, 
            min, 
            max
          } 
        });
        
      } catch (error) {
        returnData.push({ 
          json: { 
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            min: this.getNodeParameter('min', i),
            max: this.getNodeParameter('max', i)
          } 
        });
      }
    }
    
    return [returnData];
  }
}
