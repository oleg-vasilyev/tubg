/**
 * @class
 * @description Represents coordinate point
 */
export class Point {
  private _x: number;
  private _y: number;

  //#region Constructor

  /** @constructor
   * @param {number} x X coordinate of a point
   * @param {number} y Y coordinate of a point
   * @this {Point}
   * @description Constructor of the Point class */
  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  //#endregion

  //#region Accessor functions declaration

  /**
   * Accessor
   * @description X coordinate of a point
   */
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  /**
   * Accessor
   * @description Y coordinate of a point
   */
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }

  //#endregion
}