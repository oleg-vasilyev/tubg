import { Point } from "./point";

/**
 * @class
 * @description Represents rectangular shape of zone
 */
export class ZoneShape {
  //#region Class fields

  private _upperLeftPoint: Point;
  private _lowerRightPoint: Point;
  private _width: number;
  private _height: number;

  //#endregion

  //#region Constructor

  /** @constructor
   * @param {Point} upperLeftPoint Upper left point of zone shape
   * @param {Point} lowerRightPoint Lower right point of zone shape
   * @param {number} width Width value
   * @param {number} height Height value
   * @this {ZoneShape}
   * @description Constructor of the ZoneShape class */
  public constructor() {
    this._upperLeftPoint = new Point(0, 0);
    this._lowerRightPoint = new Point(0, 0);
    this._width = 0;
    this._height = 0;
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
   * @description Lower right point of zone shape
   */
  public get lowerRightPoint(): Point {
    return this._lowerRightPoint;
  }
  public set lowerRightPoint(value: Point) {
    this._lowerRightPoint = value;
  }

  /**
   * Accessor
   * @description Width value
   */
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }

  /**
   * Accessor
   * @description Height value
   */
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  //#endregion

  //#region Class functions

  /**
   * @method
   * @description Calculates upper left point coordinates
   */
  public calculateUpperLeftPoint(): void {
    this._upperLeftPoint.x = this._lowerRightPoint.x - this._width + 1;
    this._upperLeftPoint.y = this._lowerRightPoint.y - this._height + 1;
  }

  /**
   * @method
   * @description Calculates lower right point coordinates
   */
  public calculateLowerRightPoint(): void {
    this._lowerRightPoint.x = this._upperLeftPoint.x + this._width - 1;
    this._lowerRightPoint.y = this._upperLeftPoint.y + this._height - 1;
  }

  /**
   * @method
   * @description Calculates width and height using upper left and lower right points
   */
  public calculateSides(): void {
    this._width = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
    this._height = this._lowerRightPoint.y - this._upperLeftPoint.y + 1;
  }

  /**
   * @method
   * @description Calculates width using upper left and lower right points
   */
  public calculateWidth(): void {
    this._width = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;
  }

  /**
   * @method
   * @description Calculates height using upper left and lower right points
   */
  public calculateHeight(): void {
    this._height = this._lowerRightPoint.y - this._upperLeftPoint.y + 1;
  }

  /**
   * @method
   * @description Returns value of the minimal side
   */
  public getMinimalSide(): number {
    return Math.min(this._width, this._height);
  }

  /**
   * @method
   * @description Returns value of the maximal side
   */
  public getMaximalSide(): number {
    return Math.max(this._width, this._height);
  }

  //#endregion
};