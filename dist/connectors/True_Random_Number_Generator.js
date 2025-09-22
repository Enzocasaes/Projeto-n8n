"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomConnector = void 0;
const https = __importStar(require("https"));
class RandomConnector {
    async execute(options) {
        const { min, max } = options;
        if (typeof min !== 'number' || typeof max !== 'number' || isNaN(min) || isNaN(max)) {
            throw new Error('Os valores de Min e Max devem ser números válidos.');
        }
        if (min > max) {
            throw new Error('O valor de Min deve ser menor ou igual ao valor de Max.');
        }
        const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk.toString(); });
                res.on('end', () => {
                    const num = parseInt(data, 10);
                    if (isNaN(num)) {
                        reject(new Error('Resposta inválida da API Random.org.'));
                    }
                    else {
                        resolve({
                            result: num,
                            min,
                            max,
                            datetime: new Date().toISOString(),
                            source: 'random.org'
                        });
                    }
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
}
exports.RandomConnector = RandomConnector;
//# sourceMappingURL=True_Random_Number_Generator.js.map