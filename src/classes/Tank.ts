import {AiIdent} from './AiIdent';
import {getRandomId} from './AiIdent';
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


  /**
   * @param {AiIdent} aiIdent - identification of tank's AI Script
   * @param {Number} id - unique id of the tank
   */

  constructor(aiIdent: AiIdent, id: number) {
    this.id = id;
    this.name = aiIdent.name;
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.direction = 0;
    this.speed = 0;
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

  move(): void {
    this.lastX = this.x;
    this.lastY = this.y;
    this.x += Math.round(this.speed*Math.cos(this.direction*(Math.PI/180)));
    this.y += Math.round(this.speed*Math.sin(this.direction*(Math.PI/180)));
  }

  shoot(): void {
    let bullet: Bullet = new Bullet(this, getRandomId(), 1);
    if (this.bullets == []) {
      this.bullets = [bullet];
    } else {
      this.bullets = [...this.bullets, bullet];
    }
  }

  rotate(direction: number): void {
    this.direction = direction;
  }

}
