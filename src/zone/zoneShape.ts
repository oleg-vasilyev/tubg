import { Point } from "./point";

/**
 * @class
 * @description Represents rectangular shape of zone
 */
export class ZoneShape {
  //#region Class fields

  public upperLeftPoint: Point;
  public lowerRightPoint: Point;

  //#endregion

  //#region Constructor

  /** @constructor
   * @this {ZoneShape}
   * @description Constructor of the ZoneShape class */
  public constructor() {
    this.upperLeftPoint = new Point(0, 0);
    this.lowerRightPoint = new Point(0, 0);
  }

  //#endregion

  //#region Class functions

  /**
   * @method
   * @description Defines new shape of zone by setting new points
   */
  public defineShape(upperLeftPoint: Point, lowerRightPoint: Point): void {
    this.upperLeftPoint.x = upperLeftPoint.x;
    this.upperLeftPoint.y = upperLeftPoint.y;

    this.lowerRightPoint.x = lowerRightPoint.x;
    this.lowerRightPoint.y = lowerRightPoint.y;
  }

  /**
   * @method
   * @description Returns width, which is calculated using upper left and lower right points
   */
  public getWidth(): number {
    const width = this.lowerRightPoint.x - this.upperLeftPoint.x + 1;
    return width;
  }

  /**
   * @method
   * @description Returns height, which is calculated using upper left and lower right points
   */
  public getHeight(): number {
    const height = this.lowerRightPoint.y - this.upperLeftPoint.y + 1;
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