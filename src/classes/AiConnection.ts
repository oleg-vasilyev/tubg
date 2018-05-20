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
  public aiProcessingCheckInterval: NodeJS.Timer;
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

  public commandTank(command: ICommandAi): void {

    this.commandData = {
      move: command.move,
      shoot: command.shoot,
      rotate: command.rotate
    };

    if (this.commandData.shoot) {
      this.tank.shoot();
      this.commandData.shoot = false;
    }

    if (this.commandData.move) {
      this.tank.moveForward();
      this.commandData.move = false;
    }

    if (this.commandData.rotate) {
      this.tank.rotate(this.commandData.rotate);
    }
  }

  public xhRequest(): XMLHttpRequest { // connect connect to AI file on XHR request
    const xhr: XMLHttpRequest = new XMLHttpRequest();

    return xhr;
  }

  public sendRequest(resolve: () => void, reject?: () => void): void {
    const xhr: XMLHttpRequest = this.xhRequest();
    const stateJSON: string = JSON.stringify(this.tank.state);
    xhr.open('POST', `${this.identificatorAi.getPathAi}`, true);
    xhr.timeout = this.aiProcessingLimit;
    this.aiProcessingRejectCallback = reject;
    xhr.ontimeout = () => {
      if (this.aiProcessingRejectCallback !== null) {
        this.aiProcessingRejectCallback({
          message: 'Simulation cannot be continued because ' + this.tank.name + ' #' + this.tank.id + ' does not respond',
          performanceIssues: true,
          tankName: this.tank.name,
          tankId: this.tank.id
        });
        this.aiProcessingResolveCallback = null;
        this.aiProcessingRejectCallback = null;
      }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(stateJSON));
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        if (this.aiProcessingRejectCallback) {
          this.aiProcessingRejectCallback({
            message: "XMLHTTPRequest to '" + this.tank.name + "' is status different from 200",
            performanceIssues: false,
            tankName: this.tank.name,
            tankId: this.tank.id
          });
          this.aiProcessingResolveCallback = null;
          this.aiProcessingRejectCallback = null;
        } else {
          resolve();
          this.commandData = JSON.parse(xhr.responseText);
        }
      }
    };
  }

  public activateXHR(resolve: () => void, reject?: () => void): void {
    this.simulationStepXHR(resolve, reject);
    this.status = 'simulationStep';
  }

  public simulationStepXHR(resolve: () => void, reject?: () => void): void {
    if (this.tank.health === 0) {
      return;
    } else {
      this.aiProcessingResolveCallback = resolve;
      this.aiProcessingRejectCallback = reject;
      this.sendRequest(resolve, reject);
    }
  }


  /**
   * next code for webworker
   */
  public createWorker(aiIdent: IdentificatorAi): Worker { // connect to ai from file in Webworker
    return new Worker(aiIdent.getPathAi());
  }

  public activate(resolve: () => void , reject?: () => void): void {
    this.aiWorker = this.createWorker(this.identificatorAi);
    this.aiWorker.onerror = (err) => {
      console.error(err);
      if (this.aiProcessingRejectCallback) {
        this.aiProcessingRejectCallback({
          message: 'Web Worker of ' + this.tank.name + ' returned an error',
          performanceIssues: false,
          tankName: this.tank.name,
          tankId: this.tank.id
        });
        this.aiProcessingResolveCallback = null;
        this.aiProcessingRejectCallback = null;
      }
    };
    if (this.aiProcessingCheckInterval) {
      clearInterval(this.aiProcessingCheckInterval);
      this.aiProcessingCheckInterval = null;
    }

    this.aiProcessingCheckInterval = setInterval(
      () => {
        if (this.aiProcessingRejectCallback !== null) {
          const now = (new Date()).getTime();
          const dt = now - this.aiProcessingStart;
          if (dt > this.aiProcessingLimit) {
            clearInterval(this.aiProcessingCheckInterval);
            this.aiProcessingCheckInterval = null;
            this.aiProcessingRejectCallback({
              message: 'Simulation cannot be continued because ' + this.tank.name + ' #' + this.tank.id + ' does not respond',
              performanceIssues: true,
              tankName: this.tank.name,
              tankId: this.tank.id
            });
          }
        }
      },
      Math.max(this.identificatorAi.loadingLimit, Math.round(this.aiProcessingLimit / 2))
  );

    this.aiWorker.onmessage = (commandEvent) => {
      if (this.aiProcessingResolveCallback !== null) {
        this.isReady = true;
        this.commandTank(commandEvent.data);
        let callback;
        const now = (new Date()).getTime();
        const dt = now - this.aiProcessingStart;
        if (dt > this.identificatorAi.loadingLimit && this.aiProcessingRejectCallback !== null) {
          callback = this.aiProcessingRejectCallback;
          this.aiProcessingResolveCallback = null;
          this.aiProcessingRejectCallback = null;
          callback({
            message: 'Simulation cannot be continued because ' + this.tank.name + ' #' + this.tank.id + ' has performance issues',
            performanceIssues: true,
            tankName: this.tank.name,
            tankId: this.tank.id
          });

          return;
        }
        callback = this.aiProcessingResolveCallback;
        this.aiProcessingResolveCallback = null;
        this.aiProcessingRejectCallback = null;
      }
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
    if (this.aiWorker && this.tank.health === 0) {
      this.aiWorker.terminate();
      this.aiWorker = null;
      resolve();

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
