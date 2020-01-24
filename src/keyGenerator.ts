/**
 * Key generator class
 * Implements basic key generator interface
 */
export default class KeyGenerator {
  /**
   * Returns new Generated key using any strategy
   * The key is always even
   *
   * @param {String} text - special string that it is get a key
   * @param {String} salt - special salt for complication
   * @param {Number} length - the key length
   *
   * @return string
   */
  public generate(text: string, salt: string, length: number): string {
    const key = this.deriveKey(text);
    return salt.substring(0, length) + key;
  }

  /**
   * Derives key from passed text
   * Using simple strategy. Will be expanded later
   *
   * @param {String} text - special string that it is get a key
   *
   * @return string
   */
  private deriveKey(text: string): string {
    const isEven = text.length % 2 === 0;
    const key = text.split('').filter((char, index) => {
      if (isEven) {
        return index % 2;
      }
      return !(index % 2);
    });

    return key.join('');
  }
}
