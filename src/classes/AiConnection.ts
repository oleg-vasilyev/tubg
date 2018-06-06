import { ICallbackArg, ICommandAi } from '../interfaces/interfaces';
import { CONFIG } from './Config';
import { IdentificatorAi } from './IdentificatorAi';
import { Simulation } from './Simulation';
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
  public status: string;
  public perfomanceIssues: boolean;

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
    this.perfomanceIssues = false;
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

  public activate(simulation: Simulation): void {
    this.aiWorker = this.createWorker(this.identificatorAi);
    this.aiWorker.onerror = () => {
      // tslint:disable-next-line:no-string-throw
      throw 'Web Worker of ' + this.tank.name + ' returned an error';
    };
    this.aiWorker.onmessage = (commandEvent) => {
      this.isReady = true;
      const now = (new Date()).getTime();
      const dt = now - this.aiProcessingStart;
      if (dt > this.identificatorAi.loadingLimit) {
        this.perfomanceIssues = true;
        // tslint:disable-next-line:no-string-throw
        throw 'Simulation cannot be continued because ' + this.tank.name + ' #' + this.tank.id + ' has performance issues';
      }
      this.commandData = commandEvent.data;
      this.tank.historyState.push(this.tank.state);
      this.tank.historyCommand.push(commandEvent.data);
      this.tank.madeMove = true;
      simulation.simulationStep();
    };
    this.aiProcessingStart = (new Date()).getTime();
    this.aiWorker.postMessage({state: this.tank.state, type: 'init'});
    // tslint:disable-next-line:no-console
    console.log(simulation);
    this.status = 'simulationStep';
}

  public deactivate(): void {
    if (this.aiWorker) {
      this.aiWorker.terminate();
      this.aiWorker = null;
    }
  }

  public simulationStep(): void {
    if (this.perfomanceIssues === true) {
      this.deactivate();

      return;
    }
    this.isReady = false;
    if (this.aiWorker && this.tank.health <= 0) {
      this.deactivate();

      return;
    }
    this.aiProcessingStart = (new Date()).getTime();
    if (this.aiWorker) {
      this.aiWorker.postMessage({state: this.tank.state, type: 'step'});
    }
  }

}
