import { Tank } from "./Tank";

/**
 * 
 * `Class of Bullet
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

  constructor(owner: Tank, id: number, power: number) {
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

  onEnemy(enemy): void {
    this.destroyed = true;
    enemy.health -= this.power;
  }

  nextStep(): void {
    this.x += Math.round(this.speed*Math.cos(this.direction*(Math.PI/180)));
    this.y += Math.round(this.speed*Math.sin(this.direction*(Math.PI/180)));
  }

  onDestroy(): void {
    this.owner.bullets.filter((b) => {
      if (b.id == this.id) {
        return false;  //This code could be incorrect
      }
    });
    this.destroyed = true;
  }
}
