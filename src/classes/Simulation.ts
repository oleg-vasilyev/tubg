
import { Tank } from "./Tank";
import { Bullet } from "./Bullet";
import { Battlefield } from "./Battlefield";
import { EventStore } from "./EventStore";
import { CollisionSolution } from "./CollisionSolution";
import { AiConnection } from "./AiConnection";
import { MonitorPerfomance } from "./MonitorPerfomance";
import { Renderer } from "react-dom";
import { IdentificatorAi } from "./IdentificatorAi";


export class Simulation {

    private aiList: Array<AiConnection>;
    private allTankList: Array<Tank>;
    private tankList: Array<Tank>;
    private bulletList: Array<Bullet>;
    private explodedTankList: Array<Tank>;
    private explodedBulletList: Array<Bullet>;
    private battlefield: Battlefield;
    private simulationTimeout: number | null;
    private renderInterval: any;
    private simulationStepDuration: number;
    private renderStepDuration: number;
    private renderer: Renderer;
    private isRunning: boolean;
    private collsionSolution: CollisionSolution;
    private speedMultiplier: number;
    private onSimulationStepCallback: any;
    private onRenderStepCallback: any;
    private onFinishCallback: any;
    private onErrorCallback: any;
    private onStartCallback: any;
    private timeEnd: number;
    private timeLimit: number
    private eventStore: EventStore;
    private nextTankId: number
    private nextBulletId: number
    private rendererQuality: string | number;
    private perfMon: MonitorPerfomance;
    private callStackLimit: number;
    private callStackCount: number;

  constructor(renderer: Renderer, width: number, height: number) {
    this.aiList = [];
    this.allTankList = [];
    this.tankList = [];
    this.bulletList = [];
    this.explodedTankList = [];
    this.explodedBulletList = [];
    this.battlefield = new Battlefield(width, height);
    this.simulationTimeout = null;
    this.renderInterval = null;
    this.simulationStepDuration = 17;
    this.renderStepDuration = 30;
    this.renderer = renderer;
    this.isRunning = false;
    this.collsionSolution = new CollisionSolution(this.battlefield);
    this.speedMultiplier = 1;
    this.onSimulationStepCallback = [];
    this.onRenderStepCallback = [];
    this.onFinishCallback = [];
    this.onErrorCallback = [];
    this.onStartCallback = [];
    this.timeEnd = 0;
    this.timeLimit = 30000;
    this.eventStore = new EventStore();
    this.nextTankId = 1;
    this.nextBulletId = 1;
    this.rendererQuality = 'auto';
    this.perfMon = new MonitorPerfomance();
    this.perfMon.setSimulationStepDuration(this.simulationStepDuration/this.speedMultiplier);
    this.callStackLimit = Number.MAX_VALUE;
    this.callStackCount = 0;
  }

  init(width: number, height: number): void {
    this.battlefield.setSize(width, height);
    this.collsionSolution.updateBattlefield(this.battlefield);
  }

  getTankList(): Array<Tank> {
    return this.allTankList;
  }

  getRenderer(): Renderer {
    return this.renderer;
  }

  getBattlefield(): Battlefield {
    return this.battlefield;
  }

  getTimeEnd(): number {
    return this.timeEnd;
  }

  getTimeLimit(): number {
    return this.timeLimit;
  }

  setTimeLimit(t: number): void {
    this.timeLimit = t;
  }

  start(): void {
    this.isRunning = true;
    let i;
    let self = this;

    if(this.renderInterval) {
      clearInterval(this.renderInterval);
      this.renderInterval = null;
    }

    this.activateAi(
      () => {
        self.renderInterval = setInterval(() => {
          self.updateView();
        }, self.renderStepDuration);

        if(self.simulationTimeout) {
          clearTimeout(self.simulationTimeout);
        }
        self.perfMon.start();
        for (i=0; i < self.onStartCallback.length; i++) self.onStartCallback[i]();
        self.simulationStep();
      }
    );
  }

  simulationStep(): void {
    this.perfMon.onSimulationStep();
    let startTime = (new Date()).getTime();
    let self = this;
    let i;
    this.updateModel();
    this.updateAi(
      () => {
        if(self.simulationTimeout) {
          clearTimeout(self.simulationTimeout);
          self.simulationTimeout = null;
        }
        if(self.timeEnd == self.timeLimit) {
          self.stop();
          self.updateModel();
          self.updateView();
          for(let i=0; i < self.onFinishCallback.length; i++) self.onFinishCallback[i]();
        }
        if(self.isRunning) {
          let processingTime = (new Date()).getTime() - startTime;
          let dt = self.simulationStepDuration - processingTime;
          dt /= self.speedMultiplier;
          dt = Math.round(dt);
          for (let i=0; i < self.onSimulationStepCallback.length; i++) self.onSimulationStepCallback[i]();
          self.timeEnd = Math.min(self.timeEnd + self.simulationStepDuration, self.timeLimit);
          if(dt > 0) {
            self.callStackCount = 0;
            self.simulationTimeout = setTimeout(self.simulationStep.bind(self), dt);
          } else if(self.callStackCount >= self.callStackLimit) {
            self.simulationTimeout = setTimeout(self.simulationStep.bind(self), 1);
          } else {
            self.callStackCount++;
            self.simulationStep();
          }
        }
      }
    );
  }

  addTank(identificatorAi: IdentificatorAi): AiConnection {
    if(!this.battlefield) {
      throw "Simulation not initialized";
    }
    let minX = this.battlefield.startX;
    let maxX = this.battlefield.finishX;
    let minY = this.battlefield.startY;
    let maxY = this.battlefield.finishY;
   
    let tank = this.createTank(identificatorAi);
    tank.setRandomDirection();
    tank.setRandomPos(minX, maxX, minY, maxY);
    this.tankList.push(tank);
    this.allTankList.push(tank);
    if(this.allTankList.length > 2) {
      this.timeLimit += 2000;
    }

    let ai = this.createAiConnection(tank, identificatorAi);
    this.aiList.push(ai);
    return ai;
  }

  setSpeed(v: number): void {
    this.speedMultiplier = Math.max(0.01, Number(v));
    this.perfMon.setSimulationStepDuration(this.simulationStepDuration/this.speedMultiplier);
    // this.renderer.setSpeed(v);
  }

  setRendererQuality(v: number | string): void {
    if(v != 0) return;
    if(v = 0) {
      v = Math.min(1, Math.max(0, 10));
    }
    this.rendererQuality = v;
  }

  stop(): void {
    this.isRunning = false;
    this.perfMon.stop();
    // this.renderer.stop();
    if(this.simulationTimeout) {
      clearTimeout(this.simulationTimeout);
      this.simulationTimeout = null;
    }
    if(this.renderInterval) {
      clearInterval(this.renderInterval);
      this.renderInterval = null;
    }
    let ai, i;
    for(let i=0; i < this.aiList.length; i++) {
      ai = this.aiList[i];
      if(!ai) continue;
      ai.deactivate();
    }
    this.aiList = [];
  }

  onStep(callback: ()=>void): void {
    this.onSimulationStepCallback.push(callback);
  }

  onRender(callback: () => void): void {
    this.onRenderStepCallback.push(callback);
  }

  onStart(callback: () => void): void {
    this.onStartCallback.push(callback);
  }

  onFinish(callback: () => void): void{
    this.onFinishCallback.push(callback);
  }

  onError(callback: () => void): void {
    this.onErrorCallback.push(callback);
  }

  activateAi(done: any): void {
    this.runInSequence();
  }

  updateAi(done: any) {
    this.runInSequence();
  }

  createAiConnection(tank: Tank, identificatorAi: IdentificatorAi): AiConnection {
    return new AiConnection(tank, identificatorAi);
  }

  createTank(identificatorAi: IdentificatorAi): Tank {
    let tank = new Tank(identificatorAi, this.nextTankId++);
    return tank;
  }

  createBullet(owner: Tank, power: number) {
    let bullet = new Bullet(owner, this.nextBulletId++, power);
    return bullet;
  }

  runInSequence() {
    
  }

  updateView() {

  }

  updateModel(): void {
    
  }

}

