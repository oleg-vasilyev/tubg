import {AiIdent} from './AiIdent';
import {Bullet} from './Bullet';

/**
 * 
 * `Class of Battle Tank
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
  public state: {};
  public wallDistance: boolean;
  public enemyDistance: boolean;
  public bullets: [Bullet];


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
    this.state = null;
    this.wallDistance = null;
  }

  getId(): number {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getState(): {} {
    return this.state;
  }

  getScore(): number {
    return this.score;
  }

  killsScore(): void {
    this.score += 1;
  }

  surviveScore(): void {
    this.score += 0.5;
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
    this.wallDistance = true;
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
    let bullet: Bullet = new Bullet(this, this.id, 1);
    if (this.bullets == []) {
      this.bullets = [bullet];
    } else {
      this.bullets[this.bullets.length] = bullet;
    }
  }

}
