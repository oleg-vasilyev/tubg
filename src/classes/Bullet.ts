import { CONFIG } from './Config';
import { Tank } from './Tank';


/**
 *  @class
 * `@description class Bullet
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
   * @param {Tank} owner - owner of this Bullet.
   * @param {Number} id - unique id of the tank.
   * @param {Number} power - power of bullet.
   */

  public constructor(owner: Tank, id: number) {
    this.id = id;
    this.owner = owner;
    this.direction = owner.direction;
    while (this.direction > 360) {
      this.direction -= 360;
    }
    while (this.direction < 0) {
      this.direction += 360;
    }
    this.x = owner.x;
    this.y = owner.y;
    this.speed = CONFIG.bulletSpeed;
    this.power = CONFIG.bulletPower;
    this.destroyed = false;
  }

  public getId(): number {
    return this.id;
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

  public getSpeed(): number {
    return this.speed;
  }

  public getPower(): number {
    return this.power;
  }

  public getOwner(): Tank {
    return this.owner;
  }

  public getDestroyed(): boolean {
    return this.destroyed;
  }

  public onWall(): void {
    this.destroyed = true;
  }

  /**
   * @param {Tank} enemy - enemy atacked.
   */

  public onEnemy(enemy: Tank): void {
    this.onDestroy();
    enemy.health -= this.power;
  }

  public moveForward(): void {
    this.x += Math.round(Math.cos(this.direction * (Math.PI / 180)));
    this.y += Math.round(Math.sin(this.direction * (Math.PI / 180)));
  }

  public onDestroy(): void {
    this.owner.bullets.filter((b) => {
      if (b.id !== this.id) {
        return b;
      }
    });
    this.destroyed = true;
  }
}
