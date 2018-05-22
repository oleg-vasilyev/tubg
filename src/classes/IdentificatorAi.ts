import { CONFIG } from './Config';

/**
 *  @class
 *  @description Ai Identification
 */
export class IdentificatorAi {

  public name: string;
  public id: number;
  public initData: {};
  public loadingLimit: number;
  public pathAi: string;

  public constructor(name: string, path: string) {
    this.name = name;
    this.pathAi = path;
    this.id = getRandomId();
    this.initData = {};
    this.loadingLimit = CONFIG.aiProcessingLimit;
  }

  /**
   * @return name of the AI.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @return Maximum time for loading of AI(ms)
   */
  public getLoadingLimit(): number {
    return this.loadingLimit;
  }

  /**
   * @return path to file with code where the AI will be ran.
   */
  public getPathAi(): string {
      return this.pathAi;
  }

  /**
   * @return optional initial data
   */
  public getInitData(): {} {
    return this.initData;
  }

  /**
   * @param {String} tankName - name of the tank.
   * @param {object} initData - optional initial data.
   */

  public includeAi(tankName: string, initData: {}): void {
    this.name = tankName;
    this.initData = initData !== undefined ? initData : {};
  }

}

export function getRandomId(): number {
  const thisTime: string = (new Date()).getTime().toString();
  const idRandom: string = thisTime;

  return Number(idRandom);
}
