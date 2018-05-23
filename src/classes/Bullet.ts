import { Tank } from "./Tank";
import {getRandomId} from './identificatorAi';
/**
 *  @class
 * `@description class Bullet
 * 
 */
export class Bullet {
  public id: number;
  public owner: Tank;
  public direction: number;
  public x: number;
  public y: number;
  public speed: number;
  public power: number;
  public destroyed: boolean;


  /**
   * 
   * @param {Tank} owner - owner of this Bullet. 
   * @param {Number} id - unique id of the tank.
   * @param {Number} power - power of bullet.
   * 
   */
  constructor(owner: Tank, id: number, power?: number) {
    this.id = id;
    this.owner = owner;
    this.direction = owner.direction;
    while(this.direction > 360) this.direction -= 360;
    while(this.direction < 0) this.direction += 360;
    this.x = owner.x;
    this.y = owner.y;
    this.speed = 5;  //It will setted in config
    this.power = 1;  //It will setted in config. It shows how many take away health points from the enemy
    this.destroyed = false;
  }

  getId(): number {
    return this.id;
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

  getSpeed(): number {
    return this.speed;
  }

  getPower(): number {
    return this.power;
  }
  
  getOwner(): Tank {
    return this.owner;
  }

  getDestroyed(): boolean {
    return this.destroyed;
  }

  onWall(): void {
    this.destroyed = true;
  }

  /**
   * 
   * @param {Tank} enemy - enemy atacked. 
   * 
   */
  onEnemy(enemy: Tank): void {
    this.onDestroy();
    enemy.health -= this.power;
  }

  nextStep(): void {
    this.x += Math.round(this.speed*Math.cos(this.direction*(Math.PI/180)));
    this.y += Math.round(this.speed*Math.sin(this.direction*(Math.PI/180)));
  }

  onDestroy(): void {
    this.owner.bullets.filter((b) => {
      if (b.id !== this.id) {
        return b;  
      }
    });
    this.destroyed = true;
  }
}
