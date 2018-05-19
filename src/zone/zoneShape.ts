import { Point } from "./point";

/**
 * @class
 * @description Represents square shape of zone
 */
export class ZoneShape {
  //#region Class fields

  private _upperLeftPoint: Point;
  private _side: number;
  private _lowerRightPoint: Point;

  //#endregion

  //#region Constructor

  /** @constructor
   * @param {Point} upperLeftPoint Upper left point of zone shape
   * @param {number} side Side value
   * @param {Point} lowerRightPoint Lower right point of zone shape
   * @this {ZoneShape}
   * @description Constructor of the ZoneShape class */
  public constructor(upperLeftPoint: Point, side: number, lowerRightPoint: Point) {
    this._upperLeftPoint = upperLeftPoint;
    this._side = side;
    this._lowerRightPoint = lowerRightPoint;
  }

  //#endregion

  //#region Accessor functions

  /**
   * Accessor
   * @description Upper left point of zone shape
   */
  public get upperLeftPoint(): Point {
    return this._upperLeftPoint;
  }
  public set upperLeftPoint(value: Point) {
    this._upperLeftPoint = value;
  }

  /**
   * Accessor
   * @description Side value
   */
  public get side(): number {
    return this._side;
  }
  public set side(value: number) {
    this._side = value;
  }

  /**
   * Accessor
   * @description Lower right point of zone shape
   */
  public get lowerRightPoint(): Point {
    return this._lowerRightPoint;
  }
  public set lowerRightPoint(value: Point) {
    this._lowerRightPoint = value;
  }

  //#endregion

  //#region Class functions

  /**
   * @function
   * @description Calculates upper left point coordinates
   */
  public calculateUpperLeftPoint(): void {
    this._upperLeftPoint.x = this._lowerRightPoint.x - this._side + 1;
    this._upperLeftPoint.y = this._lowerRightPoint.y - this._side + 1;
  }

  /**
   * @function
   * @description Calculates lower right point coordinates
   */
  public calculateLowerRightPoint(): void {
    this._lowerRightPoint.x = this._upperLeftPoint.x + this._side - 1;
    this._lowerRightPoint.y = this._upperLeftPoint.y + this._side - 1;
  }

  /**
   * @function
   * @description Calculates side using upper left and lower right points
   */
  public calculateSide(): void {
    this._side = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
  }

  /* This 2 methods will be removed, because width and height of the battlefield
     can be obtained using appropriate getters of the battlefield object */

  public getVerticalSide(): number {
    const verticalSide = this._lowerRightPoint.y - this._upperLeftPoint.y + 1;
    return verticalSide;
  }

  public getHorizontalSide(): number {
    const horizontalSide = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
    return horizontalSide;
  }

  //#endregion
};