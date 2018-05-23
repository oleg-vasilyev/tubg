import { Tank } from "./Tank";
import { Bullet } from "./Bullet";

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

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.startX = 0;
    this.startY = 0;
    this.finishX = this.startX + width - 1;
    this.finishY = this.startY + height - 1;
  }

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

}
