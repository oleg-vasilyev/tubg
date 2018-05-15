import {IdentificatorAi} from './IdentificatorAi';
import {getRandomId} from './IdentificatorAi';
import {Bullet} from './Bullet';


/**
 *  @interface
 * `@description object of state of tank
 * 
 */
interface IState {
  x: number;
  y: number;
  direction: number;
  health: number;
  collisions: { enemy: boolean | null, wall: boolean | null};
}

/**
 *  @interface
 * `@description object history of tank
 * 
 */
export interface IHistoryTank {
  bullets: Array<Bullet>;
  prevX: null | number;
  prevY: null | number;
  x: number;
  y: number;
  health: number;
}

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
  public wallCollision: boolean | null;
  public enemyCollision: boolean | null;
  public bullets: Array<Bullet>;
  public history: Array<IHistoryTank>;

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
    this.speed = 3;
    this.score = 0;
    this.health = 1;
    this.wallCollision = null;
    this.enemyCollision = null;
    this.bullets = [];
    this.state = {
      x: this.x,
      y: this.y,
      direction: this.direction,
      collisions: {
        enemy: null,
        wall: null,
      },
      health: 1
    };
    this.history = [];
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
    this.state.x = this.x;
    this.state.y = this.y;
    this.state.direction = this.direction;
    this.state.collisions.enemy = this.enemyCollision;
    this.state.collisions.wall = this.wallCollision;
    this.state.health = this.health;
  }

  getScore(): number {
    return this.score;
  }

  killsScore(): void {
    this.score += 1;  // This config param
  }

  surviveScore(): void {
    this.score += 0.5; // This config param
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getSpeed(): number {
    return this.speed;
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

  onEnemyHit(): void {
    this.health -= 1;
  }

  moveForward(): void {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x += Math.round(this.speed*Math.cos(this.direction*(Math.PI/180)));
    this.y += Math.round(this.speed*Math.sin(this.direction*(Math.PI/180)));
  }

  shoot(): void {
    let bullet: Bullet = new Bullet(this, getRandomId(), 1);
    if (this.bullets.length == 0) {
      this.bullets = [bullet];
    } else {
      this.bullets = [...this.bullets, bullet];
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
