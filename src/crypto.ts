const CryptoJS = require('crypto-js');

/**
 * Adapter for CryptoJS
 * wraps any Crypto library implementations
 */
export default class Crypto {
  /**
   * Returns encrypted string
   *
   * @param {String} algorithm - which algorithm will be used for encryption
   * @param {String} plainText - a plain text that will be encrypted
   * @param {String} key - a key that will be used for encryption
   *
   * @return string
   */
  public encrypt(algorithm: string, plainText: string, key: string): string {
    if (!CryptoJS[algorithm]) {
      throw new Error('Algorithm is not implemented');
    }

    const cipher = CryptoJS[algorithm].encrypt(plainText, key);

    return cipher.toString();
  }

  /**
   * Returns decrypted string
   *
   * @param {String} algorithm - which algorithm will be used for decryption
   * @param {String} cipherText — cipher string
   * @param {String} key - decryption key
   *
   * @return string
   */
  public decrypt(algorithm: string, cipherText: string, key: string): string {
    if (!CryptoJS[algorithm]) {
      throw new Error('Algorithm is not implemented');
    }

    const bytes = CryptoJS[algorithm].decrypt(cipherText, key);

    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
