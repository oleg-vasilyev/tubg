import { IBulletTrack, ICommandAi, IState, ITankTrack  } from '../interfaces/interfaces';
import { Bullet } from './Bullet';
import { CONFIG } from './Config';
import { IdentificatorAi } from './IdentificatorAi';

/**
 *  @class
 * `@description Class of Battle Tank
 */
export class Tank {
  public id: number;
  public name: string;
  public x: number;
  public y: number;
  public lastX: number;
  public lastY: number;
  public health: number;
  public direction: number;
  public speed: number;
  public score: number;
  public state: IState;
  public wallCollision: boolean;
  public enemyCollision: boolean;
  public bulletCollision: boolean;
  public deathCollision: boolean;
  public bullets: Bullet[];
  public historyState: IState[];
  public historyCommand: ICommandAi[];
  public enemyTracks: ITankTrack[];
  public bulletTracks: IBulletTrack[];
  public wall: number[] | null[];
  public isShooting: boolean;
  public isMoving: boolean;
  public isRotating: boolean;
  /**
   * @param {identificatorAi} identificatorAi - identification of tank's AI Script
   * @param {Number} id - unique id of the tank
   */
  public constructor(identificatorAi: IdentificatorAi, id: number) {
    this.id = id;
    this.name = identificatorAi.name;
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.direction = 0;
    this.speed = CONFIG.tankSpeed;
    this.score = 0;
    this.health = CONFIG.tankHealth;
    this.wallCollision = false;
    this.enemyCollision = false;
    this.bulletCollision = false;
    this.deathCollision = false;
    this.bullets = [];
    this.historyState = [];
    this.historyCommand = [];
    this.enemyTracks = [];
    this.bulletTracks = [];
    this.wall = [];
    this.genState();
    this.isShooting = false;
    this.isMoving = false;
    this.isRotating = true;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getState(): IState {
    return this.state;
  }

  public genState(): void {
    this.state = {
      x: this.x,
      y: this.y,
      direction: this.direction,
      health: this.health,
      collisions: {
        enemy: this.enemyCollision,
        wall: this.wallCollision,
        bullet: this.bulletCollision
      },
      vision: {
        enemies: this.enemyTracks,
        bullets: this.bulletTracks,
        walls: this.wall
      }
    };
  }

  public getScore(): number {
    return this.score;
  }

  public killsScore(): void {
    this.score += CONFIG.killsScore;
  }

  public surviveScore(): void {
    this.score += CONFIG.surviveScore;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getDirection(): number {
    return this.direction;
  }

  public onWall(): void {
    this.wallCollision = true;
  }

  public onEnemy(): void {
    this.enemyCollision = true;
  }

  public getEnemy(enemy: Tank): void {
    const enemyTrack: ITankTrack = {
      id: enemy.id,
      x: enemy.x,
      y: enemy.y,
      direction: enemy.direction,
      health: enemy.health
    };
    this.enemyTracks.push(enemyTrack);
  }

  public getBullet(bullet: Bullet): void {
    const bulletTrack: IBulletTrack = {
      id: bullet.id,
      x: bullet.x,
      y: bullet.y,
      direction: bullet.direction
    };
    this.bulletTracks.push(bulletTrack);
  }

  public onEnemyHit(): void {
    this.health -= 1;
  }

  public onEnemyKillScore(): void {
    this.score += CONFIG.onEnemykillScore;
  }

  public moveForward(): void {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x += Math.round(Math.cos(this.direction * (Math.PI / 180)));
    this.y += Math.round(Math.sin(this.direction * (Math.PI / 180)));
  }

  public shoot(): void {
    this.isShooting = true;
  }

  public rotate(direction: number): void {
    this.direction = direction;
  }

  public setRandomDirection(): void {
    const dirArray: number[] = [0, 90, 180, 270];
    const dirKey: number = Math.floor(Math.random() * (dirArray.length - 0)) + 0;
    this.direction = dirArray[dirKey];
  }

  public setRandomPos(minX: number, maxX: number, minY: number, maxY: number): void {
    this.x = Math.floor(Math.random() * (maxX + 1 - minX)) + minX;
    this.y = Math.floor(Math.random() * (maxY + 1 - minY)) + minY;
  }

  public simulationStep(): void {
    const command: ICommandAi = this.historyCommand[this.historyCommand.length - 1];
    if (command.shoot) {
      this.shoot();
    } else if (command.rotate) {
      this.direction = command.rotate;
    }
  }

}
