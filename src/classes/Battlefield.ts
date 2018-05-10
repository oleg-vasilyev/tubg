import { Tank } from "./Tank";
import { Bullet } from "./Bullet";

/**
 * 
 *  @class
 * `@description interface of field cell
 * 
 */

interface ICell {
  x: number;
  y: number;
  tank: Tank | null;
  bullet: Bullet | null;
  wall: boolean;
  collisionTank: boolean;
  collisionWall: boolean;
}


/**
 * 
 *  @class
 * `@description Battlefield
 * 
 */
export class Battlefield {

  public width: number;
  public height: number;
  public startX: number;
  public finishX: number;
  public startY: number;
  public finishY: number;
  public fieldArray: Array<ICell>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.startX = 0;
    this.startY = 0;
    this.finishX = this.startX + width - 1;
    this.finishY = this.startY + height - 1;
    this.fieldArray = [];
    this.genfieldArray();
  }

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.genfieldArray();
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  genfieldArray(): void {
    let count = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.fieldArray[count].x = j;
        this.fieldArray[count].y = i;
        this.fieldArray[count].tank = null;
        this.fieldArray[count].bullet = null;
        this.fieldArray[count].wall = false;
        this.fieldArray[count].collisionTank = false;
        this.fieldArray[count].collisionWall = false;
      }
    }
  }

  getCell (x: number, y: number): ICell {
    let key: number = y*this.width + x;
    return this.fieldArray[key];
  }
}
