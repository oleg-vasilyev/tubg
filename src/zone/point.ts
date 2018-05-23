/**
 * @class
 * @description Represents coordinate point
 */
export class Point {
  //#region Class fields

  public x: number;
  public y: number;

  //#endregion

  //#region Constructor

  /** @constructor
   * @param {number} x X coordinate of a point
   * @param {number} y Y coordinate of a point
   * @this {Point}
   * @description Constructor of the Point class */
  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  //#endregion
}