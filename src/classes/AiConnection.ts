import { Tank } from './Tank';
import { IdentificatorAi } from './IdentificatorAi';
import { ICommandAi, IRejectCallbackArg } from '../interfaces/interfaces';
import { CONFIG } from './Config'
/**
 * 
 * @class of AI connection
 * 
 */
export class AiConnection {
  
  public tank: Tank;
  public identificatorAi: IdentificatorAi;
  public aiProcessingStart: number;
  public aiProcessingLimit: number;
  public aiProcessingCheckInterval: any;
  public aiProcessingResolveCallback: ()=>void | null;
  public aiProcessingRejectCallback: (arg: IRejectCallbackArg)=>void | null;
  public isReady: boolean;
  public commandData: ICommandAi;
  public aiWorker: Worker | null;
  public onActivationCallback: Array<()=>{}>;
  public onDectivationCallback: Array<()=>{}>;
  /**
   * @param {identificatorAi} identificatorAi - identification of tank's AI Script
   * @param {Tank} tank - tank
   */
  constructor(tank: Tank, identificatorAi: IdentificatorAi) {
    this.tank = tank;
    this.aiProcessingStart = 0;
    this.aiProcessingLimit = CONFIG.aiProcessingLimit;
    this.aiProcessingResolveCallback = null;
    this.aiProcessingRejectCallback = null;
    this.onActivationCallback = [];
    this.onDectivationCallback = [];
    this.identificatorAi = identificatorAi;
    this.isReady = false;
    this.commandData = {
      move: false,
      shoot: false,
      rotate: tank.direction
    };
  }

  setProcessingLimit(t: number): void {
    this.aiProcessingLimit = t;
  }

  getTank(): Tank {
    return this.tank;
  }

  activate(resolve: ()=>{}, reject: ()=>{}): void {
    this.aiWorker = this.createWorker(this.identificatorAi);
    this.aiWorker.onerror = (err) => {
      console.error(err);
      if(this.aiProcessingRejectCallback) {
        this.aiProcessingRejectCallback({
          message: "Web Worker of '" + this.tank.name + "' returned an error",
          performanceIssues: false,
          tankName: this.tank.name,
          tankId: this.tank.id
        });
        this.aiProcessingResolveCallback = null;
        this.aiProcessingRejectCallback = null;
      }
    };
    if(this.aiProcessingCheckInterval) {
      clearInterval(this.aiProcessingCheckInterval);
      this.aiProcessingCheckInterval = null;
    }

    this.aiProcessingCheckInterval = setInterval(() => {
      if(this.aiProcessingRejectCallback !== null) {
        let now = (new Date()).getTime();
        let dt = now - this.aiProcessingStart;
        if (dt > this.aiProcessingLimit) {
          clearInterval(this.aiProcessingCheckInterval);
          this.aiProcessingCheckInterval = null;
          this.aiProcessingRejectCallback({
            message: "Simulation cannot be continued because " + this.tank.name + " #" + this.tank.id + " does not respond",
            performanceIssues: true,
            tankName: this.tank.name,
            tankId: this.tank.id
          });
        }
      }
    }, Math.max(this.identificatorAi.loadingLimit, Math.round(this.aiProcessingLimit/2)));

    this.aiWorker.onmessage = (commandEvent) => {
      if (this.aiProcessingResolveCallback !== null) {
        this.isReady = true;
        this.commandTank(commandEvent.data);
        let callback;
        let now = (new Date()).getTime();
        let dt = now - this.aiProcessingStart;
        if (dt > this.identificatorAi.loadingLimit) { 
          callback = this.aiProcessingRejectCallback;
          this.aiProcessingResolveCallback = null;
          this.aiProcessingRejectCallback = null;
          callback({
            message: "Simulation cannot be continued because " + this.tank.name + " #" + this.tank.id + " has performance issues",
            performanceIssues: true,
            tankName: this.tank.name,
            tankId: this.tank.id
          });
          return;
        }
        callback = this.aiProcessingResolveCallback;
        this.aiProcessingResolveCallback = null;
        this.aiProcessingRejectCallback = null;
        callback();
      }
    };
    this.aiProcessingStart = (new Date()).getTime();
    this.aiProcessingResolveCallback = resolve;
    this.aiProcessingRejectCallback = reject;
    this.aiWorker.postMessage(this.tank.state);
  }

  deactivate(): void {
    if (this.aiWorker) {
      this.aiWorker.terminate();
      this.aiWorker = null;
    }
  }

  simulationStep(resolve: ()=>void, reject: ()=>void): void {
    if (this.aiWorker && this.tank.health == 0) {
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

  commandTank(value: ICommandAi): void {

    let self = this;
    self.commandData.MOVE = value.MOVE;
    self.commandData.ROTATE = value.ROTATE;
    self.commandData.SHOOT = value.SHOOT;

    if(self.commandData.SHOOT) {
      self.tank.shoot();
      self.commandData.SHOOT = 0;
    }

    if(self.commandData.MOVE) {
      self.tank.moveForward();
      self.commandData.MOVE = 0;
    }

    if(self.commandData.ROTATE) {
      self.tank.rotate(self.commandData.ROTATE);
    }
    
  }

  createWorker(aiIdent: IdentificatorAi): Worker {
    return new Worker(aiIdent.getPathAi());
  }
}
