import { ICallbackArg, ICommandAi } from '../interfaces/interfaces';
import { CONFIG } from './Config';
import { IdentificatorAi } from './IdentificatorAi';
import { Tank } from './Tank';

/**
 * @class of AI connection
 */
export class AiConnection {

  public tank: Tank;
  public identificatorAi: IdentificatorAi;
  public aiProcessingStart: number;
  public aiProcessingLimit: number;
  public aiProcessingResolveCallback: ((arg: ICallbackArg) => void) | null;
  public aiProcessingRejectCallback: ((arg: ICallbackArg) => void) | null;
  public isReady: boolean;
  public commandData: ICommandAi;
  public aiWorker: Worker | null;
  public onActivationCallback: Array<() => void>;
  public onDectivationCallback: Array<() => void>;
  public status: string;
  /**
   * @param {identificatorAi} identificatorAi - identification of tank's AI Script
   * @param {Tank} tank - tank
   */
  public constructor(tank: Tank, identificatorAi: IdentificatorAi) {
    this.tank = tank;
    this.aiProcessingStart = 0;
    this.aiProcessingLimit = CONFIG.aiProcessingLimit;
    this.aiProcessingResolveCallback = null;
    this.aiProcessingRejectCallback = null;
    this.onActivationCallback = [];
    this.onDectivationCallback = [];
    this.identificatorAi = identificatorAi;
    this.isReady = false;
    this.aiWorker = null;
    this.status = 'activate';
    this.commandData = {
      move: false,
      shoot: false,
      rotate: tank.direction
    };
  }

  public setProcessingLimit(t: number): void {
    this.aiProcessingLimit = t;
  }

  public getTank(): Tank {
    return this.tank;
  }

  /**
   * next code for webworker
   */
  public createWorker(aiIdent: IdentificatorAi): Worker { // connect to ai from file in Webworker
    return new Worker(aiIdent.getPathAi());
  }

  public activate(resolve: () => void , reject?: () => void): void {
    this.aiWorker = this.createWorker(this.identificatorAi);
    this.aiWorker.onerror = () => {
      // tslint:disable-next-line:no-console
      console.log('Web Worker of ' + this.tank.name + ' returned an error');
    };

    this.aiWorker.onmessage = (commandEvent) => {
      this.isReady = true;
      const now = (new Date()).getTime();
      const dt = now - this.aiProcessingStart;
      if (dt > this.identificatorAi.loadingLimit) {
        // tslint:disable-next-line:no-console
        console.log('Simulation cannot be continued because ' + this.tank.name + ' #' + this.tank.id + ' has performance issues');

        return;
      }
      this.tank.historyCommand.push(commandEvent.data);
    };
    this.aiProcessingStart = (new Date()).getTime();
    this.aiProcessingResolveCallback = resolve;
    this.aiProcessingRejectCallback = reject;
    this.aiWorker.postMessage(this.tank.state);
    this.status = 'simulationStep';
}

  public deactivate(): void {
    if (this.aiWorker) {
      this.aiWorker.terminate();
      this.aiWorker = null;
    }
  }

  public simulationStep(resolve: () => void, reject?: () => void): void {
    this.isReady = false;
    if (this.aiWorker && this.tank.health === 0) {
      this.aiWorker.terminate();
      this.aiWorker = null;

      return;
    }
    this.aiProcessingStart = (new Date()).getTime();
    if (this.aiWorker) {
      this.aiProcessingResolveCallback = resolve;
      this.aiProcessingRejectCallback = reject;
      this.aiWorker.postMessage(this.tank.state);
    }
  }

}
