import { Tank } from "./Tank";
import { AiIdent } from "./AiIdent";

interface ICommandData {
  MOVE: number;
  ROTATE: number;
  SHOOT: number;
}
/**
 * 
 * `class of Tank and AI connection
 * 
 */
export class AiConnection {
  
  public tank: Tank;
  public aiIdent: AiIdent;
  public aiProcessingStart: number;
  public aiProcessingLimit: number;
  public isReady: boolean;
  public commandData: ICommandData;
  public aiWorker: Worker | null;

  constructor(tank: Tank, aiIdent: AiIdent) {
    this.tank = tank;
    this.aiProcessingStart = 0;
    this.aiProcessingLimit = 3000; //from config
    this.aiIdent = aiIdent;
    this.isReady = false;
    this.commandData = {
      MOVE: 0,
      ROTATE: tank.direction,
      SHOOT: 0
    };
    this.aiWorker = null;
  }

  setProcessingLimit(t: number): void {
    this.aiProcessingLimit = t;
  }

  getTank(): Tank {
    return this.tank;
  }

  getWorker(): Worker | null {
    return this.aiWorker;
  }

  activate(): void {
    let self = this;
    self.aiWorker = self.createWorker(this.aiIdent);
    self.aiWorker.onmessage = (commandEvent) => {
      let value = commandEvent.data;
      if (value.type == 'init') {
        self.isReady = true;
      } else {
        self.commandTank(value);
      }
    };
  }

  deactivate(): void {
    if (this.aiWorker) {
      this.aiWorker.terminate();
      this.aiWorker = null;
    }
  }

  simulationStep() {
    let self = this;
    self.aiProcessingStart = (new Date()).getTime();
    if (self.aiWorker) {
      self.aiWorker.postMessage({
        command: 'update',
        state: self.tank.state,
        control: self.commandData
      });
    }
  }

  commandTank(value: ICommandData): void {

    let self = this;
    self.commandData.MOVE = value.MOVE;
    self.commandData.ROTATE = value.ROTATE;
    self.commandData.SHOOT = value.SHOOT;

    if(self.commandData.SHOOT) {
      self.tank.shoot();
      self.commandData.SHOOT = 0;
    }

    if(self.commandData.MOVE) {
      self.tank.move();
      self.commandData.MOVE = 0;
    }

    if(self.commandData.ROTATE) {
      self.tank.rotate(self.commandData.ROTATE);
    }
    
  }

  createWorker(aiIdent: AiIdent): Worker {
    return new Worker(aiIdent.getPathAi());
  }
}
