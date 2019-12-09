/**
 * Base CryptoSystem config
 */
export interface CryptoSystemConfig {
  /**
   * Extra string that expands a key
   */
  salt: string;

  /**
   * Encryption strategies
   */
  algorithms: string[];
}
