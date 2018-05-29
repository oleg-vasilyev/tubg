import { Point } from './point';

/**
 * @class
 * @description Represents rectangular shape of zone
 */
export class ZoneShape {
  //#region Class fields

  private _upperLeftPoint: Point;
  private _lowerRightPoint: Point;

  //#endregion

  //#region Constructor

  /**
   * @constructor
   * @param {Point} upperLeftPoint Upper left point of zone shape
   * @param {Point} lowerRightPoint Lower right point of zone shape
   * @this {ZoneShape}
   * @description Constructor of the ZoneShape class
   */
  public constructor(
    upperLeftPoint: Point = new Point(0, 0),
    lowerRightPoint: Point = new Point(0, 0)
  ) {
    this._upperLeftPoint = new Point(
      upperLeftPoint.x,
      upperLeftPoint.y
    );

    this._lowerRightPoint = new Point(
      lowerRightPoint.x,
      lowerRightPoint.y
    );
  }

  //#endregion

  //#region Accessor functions

  /**
   * Getter
   * @description Upper left point of zone shape
   */
  public get upperLeftPoint(): Point {
    const point = new Point(
      this._upperLeftPoint.x,
      this._upperLeftPoint.y
    );

    return point;
  }

  /**
   * Getter
   * @description Lower right point of zone shape
   */
  public get lowerRightPoint(): Point {
    const point = new Point(
      this._lowerRightPoint.x,
      this._lowerRightPoint.y
    );

    return point;
  }

  //#endregion

  //#region Class functions

  /**
   * @method
   * @param {Point} upperLeftPoint Upper left point of zone shape
   * @param {Point} lowerRightPoint Lower right point of zone shape
   * @description Defines new shape of zone by setting new points
   */
  public defineShape(upperLeftPoint: Point, lowerRightPoint: Point): void {
    this._upperLeftPoint.x = upperLeftPoint.x;
    this._upperLeftPoint.y = upperLeftPoint.y;

    this._lowerRightPoint.x = lowerRightPoint.x;
    this._lowerRightPoint.y = lowerRightPoint.y;
  }

  /**
   * @method
   * @description Returns width, which is calculated using upper left and lower right points
   */
  public getWidth(): number {
    const width = this._lowerRightPoint.x - this._upperLeftPoint.x + 1;

    return width;
  }

  /**
   * @method
   * @description Returns height, which is calculated using upper left and lower right points
   */
  public getHeight(): number {
    const height = this._lowerRightPoint.y - this._upperLeftPoint.y + 1;

    return height;
  }

  /**
   * @method
   * @description Returns value of the minimal side
   */
  public getMinimalSide(): number {
    const width = this.getWidth();
    const height = this.getHeight();

    return Math.min(width, height);
  }

  /**
   * @method
   * @description Returns value of the maximal side
   */
  public getMaximalSide(): number {
    const width = this.getWidth();
    const height = this.getHeight();

    return Math.max(width, height);
  }

  //#endregion
}
