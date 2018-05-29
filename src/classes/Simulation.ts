import { AiConnection } from './AiConnection';
import { Battlefield } from './Battlefield';
import { Bullet } from './Bullet';
import { CollisionSolution } from './CollisionSolution';
import { CONFIG } from './Config';
import { EventStore } from './EventStore';
import { IdentificatorAi } from './IdentificatorAi';
import { Tank } from './Tank';

export class Simulation {

    public aiList: AiConnection[];
    public allTankList: Tank[];
    public tankList: Tank[];
    public bulletList: Bullet[];
    public explodedTankList: Tank[];
    public explodedBulletList: Bullet[];
    public battlefield: Battlefield;
    public isRunning: boolean;
    public simulationTimeout: number | null;
    public simulationStepDuration: number;
    public collisionSolution: CollisionSolution;
    public onSimulationStepCallback: Array<(() => void)>;
    public onFinishCallback: Array<(() => void)>;
    public onErrorCallback: Array<(() => void)>;
    public onStartCallback: Array<(() => void)>;
    public timeEnd: number;
    public timeLimit: number;
    public madeMoveCount: number;
    public eventStore: EventStore;
    public callStackLimit: number;
    public callStackCount: number;
    public speedMultiplier: number;
    public bulletId: number;
    public tankId: number;

  public constructor(width: number, height: number) {
    this.aiList = [];
    this.allTankList = [];
    this.tankList = [];
    this.bulletList = [];
    this.explodedTankList = [];
    this.explodedBulletList = [];
    this.battlefield = new Battlefield(width, height);
    this.simulationTimeout = null;
    this.simulationStepDuration = CONFIG.simulationStepDuration;
    this.isRunning = false;
    this.collisionSolution = new CollisionSolution(this.battlefield);
    this.onSimulationStepCallback = [];
    this.onFinishCallback = [];
    this.onErrorCallback = [];
    this.onStartCallback = [];
    this.timeEnd = 0;
    this.timeLimit = CONFIG.simulationTimeLimit;
    this.eventStore = new EventStore();
    this.speedMultiplier = CONFIG.speedMultiplier;
    this.callStackLimit = Number.MAX_VALUE;
    this.callStackCount = 0;
    this.bulletId = 1;
    this.tankId = 1;
  }

  public init(width: number, height: number): void {
    this.battlefield.setSize(width, height);
  }

  public getTankList(): Tank[] {
    return this.allTankList;
  }

  public getBattlefield(): Battlefield {
    return this.battlefield;
  }

  public getTimeEnd(): number {
    return this.timeEnd;
  }

  public getTimeLimit(): number {
    return this.timeLimit;
  }

  public setTimeLimit(t: number): void {
    this.timeLimit = t;
  }

  public start(): void {
    this.isRunning = true;
    this.activateAi(
      () => {
        if (this.simulationTimeout) {
          clearTimeout(this.simulationTimeout);
        }
        for (const item of this.onStartCallback) {
          item();
        }
        this.simulationStep();
      }
    );
  }

  public run(): void {
    this.isRunning = true;
    this.activateAi(
      () => {
        if (this.simulationTimeout) {
          clearTimeout(this.simulationTimeout);
        }
        this.simulationStep();
      }
    );
  }

  public simulationStep(): void {
    for (const item of this.tankList) {
      item.madeMove = false;
    }
    const startTime: number = (new Date()).getTime();
    const self = this;
    this.updateModel();
    this.updateAi(
      () => {
        if (self.simulationTimeout) {
          clearTimeout(self.simulationTimeout);
          self.simulationTimeout = null;
        }
        if (self.timeEnd >= self.timeLimit) {
          self.stop();
          for (const item of self.onFinishCallback) {
            item();
          }
        }
        for (const item of self.tankList) {
          if (item.madeMove === true) {
            self.madeMoveCount++;
          }
        }
        if (self.isRunning && self.madeMoveCount === self.tankList.length) {
          const processingTime = (new Date()).getTime() - startTime;
          let dt = self.simulationStepDuration - processingTime;
          dt = dt / self.speedMultiplier;
          dt = Math.round(dt);
          for (const item of self.onSimulationStepCallback) {
            item();
          }
          self.timeEnd = Math.min(self.timeEnd + self.simulationStepDuration, self.timeLimit);
          if (dt > 0) {
            self.callStackCount = 0; //
            self.simulationTimeout = setTimeout(self.simulationStep.bind(self), dt);
          } else if (self.callStackCount >= self.callStackLimit) {
            self.simulationTimeout = setTimeout(self.simulationStep.bind(self), 1);
          } else {
            self.callStackCount++;
            self.simulationStep();
          }
        }
      }
    );
  }

  public addTank(identificatorAi: IdentificatorAi): AiConnection {
    const minX = this.battlefield.startX;
    const maxX = this.battlefield.finishX;
    const minY = this.battlefield.startY;
    const maxY = this.battlefield.finishY;
    const tank = this.createTank(identificatorAi);
    tank.setRandomDirection();
    tank.setRandomPos(minX, maxX, minY, maxY);
    this.tankList.push(tank);
    this.allTankList.push(tank);
    if (this.allTankList.length > 2) {
      this.timeLimit += 2000;
    }

    const ai = this.createAiConnection(tank, identificatorAi);
    this.aiList.push(ai);

    return ai;
  }

  public setSpeed(v: number): void {
    this.speedMultiplier = Math.max(0.01, Number(v));
  }

  public stop(): void {
    this.isRunning = false;
    if (this.simulationTimeout) {
      clearTimeout(this.simulationTimeout);
      this.simulationTimeout = null;
    }
    for (const item of this.aiList) {
      item.deactivate();
    }
  }

  public pause(): void {
    this.isRunning = false;
    if (this.simulationTimeout) {
      clearTimeout(this.simulationTimeout);
      this.simulationTimeout = null;
    }
  }

  public onStep(callback: () => void): void {
    this.onSimulationStepCallback.push(callback);
  }

  public onStart(callback: () => void): void {
    this.onStartCallback.push(callback);
  }

  public onFinish(callback: () => void): void {
    this.onFinishCallback.push(callback);
  }

  public onError(callback: () => void): void {
    this.onErrorCallback.push(callback);
  }

  public activateAi(done: () => void, error?: () => void): void {
    this.runInSequence(done, error);
  }

  public updateAi(done: () => void, error?: () => void): void {
    this.runInSequence(done, error);
  }

  public createAiConnection(tank: Tank, identificatorAi: IdentificatorAi): AiConnection {
    return new AiConnection(tank, identificatorAi);
  }

  public createTank(identificatorAi: IdentificatorAi): Tank {
    const tank = new Tank(identificatorAi, this.tankId++);

    return tank;
  }

  public createBullet(owner: Tank): Bullet {
    const bul = new Bullet(owner, this.bulletId++);
    this.eventStore.add('tank_' + owner.id, {
      type: 'shoot',
      tank: owner,
      bullet: bul
    });

    return bul;
  }

  public runInSequence(done: () => void, error?: () => void): void {
    if (this.aiList.length === 0) {
      return;
    }

    for (const item of this.aiList) {
      let c: (d: () => void, e: () => void) => void;
      if (item.status === 'activate') {
        // if (this.aiList[aiList.length - 1].aiWorker !== null) {
        //   c = this.aiList[aiList.length - 1].activate;
        // } else {
        //   c = this.aiList[aiList.length - 1].activateXHR;
        // }
        c = item.activate;
      } else if (item.status === 'simulationStep') {
        // if (this.aiList[aiList.length - 1].aiWorker !== null) {
        //   c = this.aiList[aiList.length - 1].simulationStep;
        // } else {
        //   c = this.aiList[aiList.length - 1].simulationStepXHR;
        // }
        c = item.simulationStep;
      } else {
        continue;
      }
      c.call(item, done, error);
    }

  }

  public moveTank(tank: Tank): void {
    for (let i = 0; i < tank.speed; i++) {
      tank.moveForward();
      const hitWallTest: boolean = this.collisionSolution.hitWallTestTank(tank);
      const hitEnemyTest: boolean = this.collisionSolution.hitEnemyTestTank(tank);
      const hitBulletTest: boolean = this.collisionSolution.hitBulletTestTank(tank);
      const hitDeathTankTest: boolean = this.collisionSolution.hitDeathTankTestTank(tank);
      if (hitWallTest) {
        tank.health -= 1;
        tank.wallCollision = true;
      } else if (hitEnemyTest) {
        tank.onEnemyHit();
        tank.enemyCollision = true;
      } else if (hitBulletTest) {
        tank.health = tank.health - CONFIG.bulletPower;
        tank.bulletCollision = true;
      } else if (hitDeathTankTest) {
        tank.x = tank.lastX;
        tank.deathCollision = true;
      }
    }
  }

  public rotateTank(tank: Tank): void {
    tank.direction = tank.historyCommand[tank.historyCommand.length - 1].rotate;
  }

  public moveBullet(bullet: Bullet): void {
    bullet.moveForward();
    for (let i = 1; i < bullet.speed; i++) {
      const hitWallTest: boolean = this.collisionSolution.hitWallTestBullet(bullet);
      const hitEnemyTest: boolean = this.collisionSolution.hitEnemyTestBullet(bullet);
      if (hitWallTest) {
        bullet.onDestroy();
        this.explodedBulletList.push(bullet);
        this.collisionSolution.removeBullet(bullet);
        this.eventStore.add('bullet_' + bullet.id, {
          type: 'explode',
          bull: bullet
        });
      } else if (hitEnemyTest) {
        bullet.onDestroy();
        this.collisionSolution.removeBullet(bullet);
        this.eventStore.add('bullet_' + bullet.id, {
          type: 'explode',
          bull: bullet
        });
      }
    }
  }

  public moveBullets(): void {
    for (const item of this.bulletList) {
      this.moveBullet(item);
    }
  }

  public updateModel(): void {
    if (this.tankList.length <= 1) {
      this.stop();
      for (const item of this.onFinishCallback) {
        item();
      }

      return;
    }
    for (const item of this.tankList) {
     if (item.historyCommand[item.historyCommand.length - 1].move === true) {
        this.moveTank(item);
     } else if (item.historyCommand[item.historyCommand.length - 1].shoot === true) {
        this.bulletList.push(this.createBullet(item));
     } else {
        this.rotateTank(item);
     }
    }
    this.moveBullets();

    let killCount: number = 0;
    for (const item of this.tankList) {
      if (item.health <= 0) {
        killCount++;
        this.tankList = this.tankList.filter((itemB: Tank) => {
          return itemB.health > 0;
        });
        this.explodedTankList.push(item);
        this.collisionSolution.removeTank(item);
        this.eventStore.add('tank_' + item.id, {
          type: 'destroy',
          tank: item
        });
      }
    }
    for (const item of this.aiList) {
      if (item.tank.health <= 0) {
        this.aiList = this.aiList.filter((aiDestroy: AiConnection) => {
          return aiDestroy.tank.id !== item.tank.id;
        });
        item.deactivate();
        continue;
      }
    }

    for (const item of this.tankList) {
      for (let i = 0; i < killCount; i++) {
        item.surviveScore();
      }
    }

    this.collisionSolution.tankList = this.tankList;
    this.collisionSolution.bulletList = this.bulletList;

    for (const item of this.tankList) {
      item.genState();
    }
  }
}
