export function getRandomId(): number {
  let idRandomString: string = (new Date()).getTime().toString();
  idRandomString = idRandomString.substr(idRandomString.length - 6, 6) + "" + Math.round(10000000 * Math.random());
  return Number(idRandomString);
}

/**
 * 
 * `Class of AI Identification for Tank
 * 
 */
export class AiIdent {

  public name: string;
  public id: number;
  public initData: {} | null;
  public loadingLimit: number;

  constructor() {
    this.name = "";
    this.id = getRandomId();
    this.initData = null;
    this.loadingLimit = 100;
  }

  /**
   * @return name of the AI.
   */
  getName(): string {
    return this.name;
  }

  /**
   * @return Maximum time for loading of AI(ms)
   */
  getLoadingLimit(): number {
    return this.loadingLimit;
  }

  /**
   * @return path to file with code of Web Worker where the AI will be ran.
   */
  getPathAi(): string {
      return `ai/${this.name}.tank.js`;
  }

  /**
   * @return optional initial data
   */
  getInitData(): {} | null {
    return this.initData;
  }

  /**
   * It is kept in `/tanks/[tankName].tank.js` files
   * @param {String} tankName - name of the tank.
   * @param {object} initData - optional initial data.
   */

  includeAi (tankName: string, initData: {}): void {
    this.name = tankName;
    this.initData = initData !== undefined ? initData : null;
  }

}

