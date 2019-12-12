/**
 * Playground for CryptoSystem
 */
import {PlaygroundConfig} from './types';
import CryptoSystem from './index';

export default class Playground {
  /**
   * Instance of CryptoSystem
   */
  private crypto: CryptoSystem;

  /**
   * Socket server URL
   */
  private socketServer: string;

  /**
   * Playground holder
   */
  private holder: HTMLElement;

  /**
   * Web socket connection
   */
  private ws: WebSocket;

  /**
   * Holder nodes
   */
  private nodes = {
    area: null,
    input: null,
  };

  /**
   * @param config
   */
  constructor(config: PlaygroundConfig) {
    this.crypto = config.cryptoSystem;
    this.socketServer = config.socketServer;

    if (!config.holder) {
      throw new Error('Please set holder');
    }

    this.holder = document.getElementById(config.holder);
    this.prepare();
  }

  /**
   * Prepare playground
   */
  private prepare() {
    if (!this.holder) {
      throw new Error('something went wrong');
    }

    this.prepareNodes();
    this.startSocketConnection();
  }

  private prepareNodes() {
    const area = this.holder.getElementsByClassName('container__message-area');
    this.nodes.area = area.item(0);

    const input = this.holder.getElementsByClassName('container__input');
    this.nodes.input = input.item(0);

    this.nodes.input.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.keyCode !== 13) {
        return;
      }

      event.preventDefault();

      const message = this.nodes.input.textContent;
      console.log('Message is:', message);

      const cipherText = this.crypto.encrypt(message);
      console.log('Sending ]encrypted message:', cipherText);
      console.log('------------------------');

      this.ws.send(cipherText);
      this.nodes.input.textContent = '';
    }, false);
  }

  private startSocketConnection() {
    this.ws = new WebSocket('ws://' + this.socketServer);
    this.ws.onmessage = (message) => {
      this.handleMessage(message);
    };
  }

  private handleMessage(message: MessageEvent) {
    const data = message.data;

    if (!data) {
      return;
    }

    console.log('Got new message:', data);
    const decrypted = this.crypto.decrypt(data);
    console.log('Decrypted message is:', decrypted);

    const messageElement = this.createMessage(decrypted);
    this.nodes.area.append(messageElement);
  }

  private createMessage(content: string): Element {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = 'Аноним:' + content;

    return message;
  }
}
