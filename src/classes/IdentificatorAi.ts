import { CONFIG } from './Config'

/**
 * 
 * `@class
 *  @description Ai Identification
 * 
 */
export class IdentificatorAi {

  public name: string;
  public id: number;
  public initData: {};
  public loadingLimit: number;
  public pathAi: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.pathAi = path;
    this.id = getRandomId();
    this.initData = {};
    this.loadingLimit = CONFIG.loadingLimit;
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
   * @return path to file with code where the AI will be ran.
   */
  getPathAi(): string {
      return this.pathAi;
  }

  /**
   * @return optional initial data
   */
  getInitData(): {} {
    return this.initData;
  }

  /**
   * @param {String} tankName - name of the tank.
   * @param {object} initData - optional initial data.
   */

  includeAi (tankName: string, initData: {}): void {
    this.name = tankName;
    this.initData = initData !== undefined ? initData : {};
  }

}

export function getRandomId(): number {
  let idRandomString: string = (new Date()).getTime().toString();
  idRandomString = idRandomString.substr(idRandomString.length - 6, 6) + "" + Math.round(10000000 * Math.random());
  return Number(idRandomString);
}
