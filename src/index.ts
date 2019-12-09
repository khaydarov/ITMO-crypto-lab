import Crypto from './crypto';
import { CryptoSystemConfig } from './types';
import KeyGenerator from './keyGenerator';

/**
 * CryptoSystem class
 * High-level abstraction for the cipher-js library
 * Allows mixing salt with key generation
 */
export default class CryptoSystem {
  /**
   * CryptoSystem config
   */
  private config: CryptoSystemConfig;

  /**
   * Instance of class that implements Crypto interface
   */
  private crypto: Crypto;

  /**
   * Instance of keyGenerator class
   */
  private keyGenerator: KeyGenerator;

  /**
   * Constructor
   * initializes CryptoSystem
   *
   * @param {CryptoSystemConfig} config - system configuration
   */
  constructor(config: CryptoSystemConfig) {
    this.config = config;
    this.crypto = new Crypto();
    this.keyGenerator = new KeyGenerator();
  }

  /**
   * Method returns encrypted message
   * @param {string} message - string that must be encrypted
   *
   * @return string
   */
  public encrypt(message: string): string {
    const key = this.keyGenerator.generate(message, this.config.salt);
    const algorithm = this.getEncryptionAlgorithm(key);
    const encrypted = this.crypto.encrypt(algorithm, message, key);

    return this.shuffle(encrypted, key);
  }

  /**
   * Method returns decrypted message
   * @param {string} cipher - encrypted message that must be decrypted
   *
   * @return string
   */
  public decrypt(cipher: string): string {
    const recovered = this.recover(cipher);
    const key = recovered.key;
    const cipherText = recovered.cipherText;
    const algorithm = this.getEncryptionAlgorithm(key);

    return this.crypto.decrypt(algorithm, cipherText, key);
  }

  /**
   * Returns the name of algorithm that will be used
   * @param {string} key - crypto key
   *
   * @return string
   */
  private getEncryptionAlgorithm(key: string): string {
    const algorithmIndex = key.length % this.config.algorithms.length;
    return this.config.algorithms[algorithmIndex];
  }

  /**
   * Method shuffles cipherText with key so that it could be publicly send
   *
   * @param {String} cipherText - encrypted text
   * @param {String} key - a key that is used for text encryption
   *
   * @return string
   */
  private shuffle(cipherText: string, key: string): string {
    /**
     * cipherText = 'message';
     * key = 'key';
     */
    let parts = this.getTextParts(cipherText);

    const keyChars = key.split('');

    /**
     * console.log('cipherText', cipherText);
     * console.log('parts', parts);
     * console.log('key', key);
     */

    /**
     * Number of rounds to shuffle cipher text with key
     */
    for (const char of keyChars) {
      parts = this.getTextParts(cipherText);

      cipherText = parts.right + char + parts.left;
    }

    return cipherText + ':' + keyChars.length;
  }

  /**
   * Recovers cipher text and key from shuffled string
   * @param {String} shuffled — cipher text mixed with key
   *
   * @return object
   */
  private recover(shuffled: string): { cipherText: string, key: string } {
    const key = [];
    let [cipherText, keyLength] = shuffled.split(':');

    for (let i = 0; i < +keyLength; i++) {
      const parts = this.getTextParts(cipherText);

      /**
       * left part of cipher text contains key char
       * for this strategy the last char belongs to the key
       */
      const left = parts.left.substring(0, parts.left.length - 1);
      const keyChar = parts.left.substr(parts.left.length - 1);

      key.push(keyChar);
      cipherText = parts.right + left;
    }

    return {
      cipherText,
      key: key.reverse().join(''),
    };
  }

  /**
   * Splits passed text into left and right parts
   * @param {String} text - some string
   *
   * @return object
   */
  private getTextParts(text: string): {left: string, right: string} {
    let left, right;

    const textLength = text.length;

    if (textLength % 2 === 0) {
      left = text.substring(0, textLength / 2);
      right = text.substring(textLength / 2, textLength);
    } else {
      left = text.substring(0, textLength / 2 + 1);
      right = text.substring(textLength / 2 + 1, textLength);
    }

    return {
      left,
      right,
    };
  }
}
