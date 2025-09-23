"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const https_1 = __importDefault(require("https"));
class Random {
    description = {
        displayName: 'Random',
        name: 'random',
        group: ['transform'],
        version: 1,
        description: 'True Random Number Generator',
        defaults: {
            name: 'Random',
            color: '#4CAF50',
        },
        icon: 'file:random-icon.svg',
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Valor Mínimo',
                name: 'min',
                type: 'number',
                default: 1,
                required: true,
                description: 'Define o valor mínimo do intervalo para geração do número aleatório',
                placeholder: 'Ex: 1',
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000000000,
                },
            },
            {
                displayName: 'Valor Máximo',
                name: 'max',
                type: 'number',
                default: 100,
                required: true,
                description: 'Define o valor máximo do intervalo para geração do número aleatório',
                placeholder: 'Ex: 100',
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000000000,
                },
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const min = this.getNodeParameter('min', i);
                const max = this.getNodeParameter('max', i);
                // Validação dos parâmetros
                if (typeof min !== 'number' || typeof max !== 'number' || isNaN(min) || isNaN(max)) {
                    throw new Error('Os valores de Min e Max devem ser números válidos.');
                }
                if (min > max) {
                    throw new Error('O valor mínimo deve ser menor ou igual ao valor máximo.');
                }
                if (min < 1 || max > 1000000000) {
                    throw new Error('Os valores devem estar entre 1 e 1.000.000.000.');
                }
                const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
                const result = await new Promise((resolve, reject) => {
                    const request = https_1.default.get(url, { timeout: 10000 }, (res) => {
                        let data = '';
                        res.on('data', (chunk) => {
                            data += chunk.toString();
                        });
                        res.on('end', () => {
                            try {
                                const trimmedData = data.trim();
                                const num = parseInt(trimmedData, 10);
                                if (isNaN(num)) {
                                    reject(new Error(`Resposta inválida da API Random.org: "${trimmedData}"`));
                                }
                                else if (num < min || num > max) {
                                    reject(new Error(`Número fora do intervalo esperado: ${num}`));
                                }
                                else {
                                    resolve(num);
                                }
                            }
                            catch (error) {
                                reject(new Error(`Erro ao processar resposta: ${error instanceof Error ? error.message : String(error)}`));
                            }
                        });
                    });
                    request.on('error', (err) => {
                        reject(new Error(`Erro de conexão com Random.org: ${err.message}`));
                    });
                    request.on('timeout', () => {
                        request.destroy();
                        reject(new Error('Timeout na requisição para Random.org'));
                    });
                });
                returnData.push({
                    json: {
                        result,
                        min,
                        max,
                        datetime: new Date().toISOString(),
                        source: 'random.org',
                        success: true
                    }
                });
            }
            catch (error) {
                returnData.push({
                    json: {
                        error: error instanceof Error ? error.message : String(error),
                        min: this.getNodeParameter('min', i),
                        max: this.getNodeParameter('max', i),
                        datetime: new Date().toISOString(),
                        source: 'random.org',
                        success: false
                    }
                });
            }
        }
        return [returnData];
    }
}
exports.Random = Random;
//# sourceMappingURL=Random.node.js.map