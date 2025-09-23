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
            icon: 'file:random-icon.svg',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                required: true,
                description: 'Valor mínimo do intervalo',
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                required: true,
                description: 'Valor máximo do intervalo',
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const min = this.getNodeParameter('min', i);
            const max = this.getNodeParameter('max', i);
            const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
            const result = await new Promise((resolve, reject) => {
                https_1.default.get(url, (res) => {
                    let data = '';
                    res.on('data', (chunk) => { data += chunk; });
                    res.on('end', () => {
                        const num = parseInt(data, 10);
                        if (isNaN(num)) {
                            reject(new Error('Resposta inválida da API Random.org.'));
                        }
                        else {
                            resolve(num);
                        }
                    });
                }).on('error', (err) => {
                    reject(err);
                });
            });
            returnData.push({ json: { result, min, max, datetime: new Date().toISOString(), source: 'random.org' } });
        }
        return [returnData];
    }
}
exports.Random = Random;
//# sourceMappingURL=Random.node.js.map