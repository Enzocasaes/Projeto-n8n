"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const https_1 = __importDefault(require("https"));
// Custom node para gerar números aleatórios usando Random.org
class Random {
    description = {
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
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'True Random Number Generator',
                        value: 'trueRandomNumberGenerator',
                        description: 'Gera um número aleatório verdadeiro usando Random.org',
                        action: 'Generate a true random number',
                    },
                ],
                default: 'trueRandomNumberGenerator',
            },
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                required: true,
                description: 'Valor mínimo',
                displayOptions: {
                    show: {
                        operation: ['trueRandomNumberGenerator'],
                    },
                },
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
                displayOptions: {
                    show: {
                        operation: ['trueRandomNumberGenerator'],
                    },
                },
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000000,
                },
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i);
                if (operation === 'trueRandomNumberGenerator') {
                    const min = this.getNodeParameter('min', i);
                    const max = this.getNodeParameter('max', i);
                    // Validação básica - não pode min > max
                    if (min > max) {
                        throw new Error('Min deve ser menor que Max');
                    }
                    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
                    // Faz a requisição HTTP
                    const result = await new Promise((resolve, reject) => {
                        const request = https_1.default.get(url, (res) => {
                            let data = '';
                            res.on('data', (chunk) => {
                                data += chunk.toString();
                            });
                            res.on('end', () => {
                                const num = parseInt(data.trim(), 10);
                                if (isNaN(num)) {
                                    reject(new Error('Resposta inválida da API'));
                                }
                                else {
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
                }
                else {
                    throw new Error(`Operação não reconhecida: ${operation}`);
                }
            }
            catch (error) {
                returnData.push({
                    json: {
                        error: error instanceof Error ? error.message : 'Erro desconhecido',
                        operation: this.getNodeParameter('operation', i),
                        min: this.getNodeParameter('min', i),
                        max: this.getNodeParameter('max', i)
                    }
                });
            }
        }
        return [returnData];
    }
}
exports.Random = Random;
//# sourceMappingURL=Random.node.js.map