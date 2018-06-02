import { IdentificatorAi, getRandomId } from './IdentificatorAi';
import { Bullet } from './Bullet';
import { IState, ICommandAi, ITankTrack, IBulletTrack } from '../interfaces/interfaces';
import { CONFIG } from './Config';

/**
 *  @class
 * `@description Class of Battle Tank
 * 
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
  public bullets: Array<Bullet>;
  public historyState: Array<IState>;
  public historyCommand: Array<ICommand>;
  public enemyTracks: Array<ITankTrack>;
  public bulletTracks: Array<IBulletTrack>;
  public wall: Array<number>;

  /**
   * @param {identificatorAi} identificatorAi - identification of tank's AI Script
   * @param {Number} id - unique id of the tank
   */
  constructor(identificatorAi: IdentificatorAi, id: number) {
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
    this.bullets = [];
    this.historyState = [];
    this.historyCommand = [];
    this.enemyTracks = [];
    this.bulletTracks = [];
    this.wall = [];
    this.genState();
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getState(): IState {
    return this.state;
  }

  genState(): void {
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

  getScore(): number {
    return this.score;
  }

  killsScore(): void {
    this.score += CONFIG.killsScore; 
  }

  surviveScore(): void {
    this.score += CONFIG.surviveScore; 
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getDirection(): number {
    return this.direction;
  }

  onWall(): void {
    this.wallCollision = true;
  }

  onEnemy(): void {
    this.enemyCollision = true;
  }

  getEnemy(enemy: Tank): void {
    let enemyTrack = {
      id: enemy.id,
      x: enemy.x,
      y: enemy.y,
      direction: enemy.direction,
      health: enemy.health
    }
    this.enemyTracks.push(enemyTrack);
  }

  getBullet(bullet: Bullet): void {
    let bulletTrack = {
      id: bullet.id,
      x: bullet.x,
      y: bullet.y,
      direction: bullet.direction
    }
    this.bulletTracks.push(bulletTrack);
  }

  onEnemyHit(): void {
    this.health -= 1;
  }

  onEnemyKillScore(): void {
    this.score += CONFIG.onEnemykillScore;
  }

  moveForward(): void {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x += Math.round(this.speed*Math.cos(this.direction*(Math.PI/180)));
    this.y += Math.round(this.speed*Math.sin(this.direction*(Math.PI/180)));
  }

  shoot(): void {
    let bullet: Bullet = new Bullet(this, getRandomId());
    if (this.bullets.length == 0) {
      this.bullets = [bullet];
    } else {
      this.bullets.push(bullet);
    }
  }

  rotate(direction: number): void {
    this.direction = direction;
  }

  setRandomDirection(): void {
    let dirArray: Array<number> = [0, 90, 180, 270];
    let dirKey: number = Math.floor(Math.random() * (dirArray.length - 0)) + 0;
    this.direction = dirArray[dirKey];
  }

  setRandomPos(minX: number, maxX: number, minY: number, maxY: number): void {
    this.x = Math.floor(Math.random() * (maxX + 1 - minX)) + minX;
    this.y = Math.floor(Math.random() * (maxY + 1 - minY)) + minY;
  }

}
