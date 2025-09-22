

/**
 * Parâmetros para geração de número randômico verdadeiro
 * @param min Valor mínimo (Min)
 * @param max Valor máximo (Max)
 */
export interface TrueRandomNumberOptions {
  /**
   * Valor mínimo do intervalo (Min)
   * @friendlyName Min
   */
  min: number;
  /**
   * Valor máximo do intervalo (Max)
   * @friendlyName Max
   */
  max: number;
}

import * as https from 'https';

export interface TrueRandomNumberResult {
  result: number;
  min: number;
  max: number;
  datetime: string;
  source: string;
}

export class RandomConnector {
  async execute(options: TrueRandomNumberOptions): Promise<TrueRandomNumberResult> {
    const { min, max } = options;
    if (typeof min !== 'number' || typeof max !== 'number' || isNaN(min) || isNaN(max)) {
      throw new Error('Os valores de Min e Max devem ser números válidos.');
    }
    if (min > max) {
      throw new Error('O valor de Min deve ser menor ou igual ao valor de Max.');
    }
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
    return new Promise((resolve, reject) => {
      https.get(url, (res: import('http').IncomingMessage) => {
        let data = '';
        res.on('data', (chunk: Buffer) => { data += chunk.toString(); });
        res.on('end', () => {
          const num = parseInt(data, 10);
          if (isNaN(num)) {
            reject(new Error('Resposta inválida da API Random.org.'));
          } else {
            resolve({
              result: num,
              min,
              max,
              datetime: new Date().toISOString(),
              source: 'random.org'
            });
          }
        });
      }).on('error', (err: Error) => {
        reject(err);
      });
    });
  }
}
