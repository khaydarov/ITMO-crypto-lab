/**
 * Base CryptoSystem config
 */
import CryptoSystem from "../index";

export interface CryptoSystemConfig {
  /**
   * Extra string that expands a key
   */
  salt: string;

  /**
   * The key max length
   */
  keyMaxLength: number;

  /**
   * Encryption strategies
   */
  algorithms: string[];
}

export interface PlaygroundConfig {
  /**
   * Playground holder
   */
  holder: string;
  /**
   * SocketServer URL
   */
  socketServer: string,

  /**
   * Instance of CryptoSystem
   */
  cryptoSystem: CryptoSystem
}
