"use strict";
// Conector Random para n8n
// Operação: True Random Number Generator
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomConnector = void 0;
class RandomConnector {
    /**
     * Gera um número aleatório inteiro entre min e max (inclusive).
     */
    trueRandomNumberGenerator(options) {
        const { min, max } = options;
        if (min > max)
            throw new Error('min deve ser menor ou igual a max');
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.RandomConnector = RandomConnector;
//# sourceMappingURL=random.js.map