import { Point } from './point';
import { ShrinkSteps } from './shrinkSteps';
import { ZoneFilling } from './zoneFilling';
import { ZoneShape } from './zoneShape';

/*
  Note:
  There are some parameters, marked as "any" type.
  They'll be removed in next pull request.
  Also I'll change "location" array in parameters to "battlefield" object,
  when Battlefield class will be ready.
*/

/**
 * @class
 * @description Represents shrinking zone in the game location
 */
export class Zone {
  //#region Class fields

  private _isFirstStage: boolean;
  private _isNewStage: boolean;
  private _finalZoneShape: ZoneShape;
  private _currentZoneShape: ZoneShape;
  private _verticalDistancesRatio: number;
  private _horizontalDistancesRatio: number;
  private _topDistance: number;
  private _bottomDistance: number;
  private _leftDistance: number;
  private _rightDistance: number;
  private _verticalStepCount: number;
  private _horizontalStepCount: number;
  private _shrinkCoefficient: number;
  private _lastZoneSide: number;

  //#endregion

  //#region Constructor

  /**
   * @constructor
   * @param {number} shrinkCoefficient Coefficient of zone shrinking
   * @param {number} lastZoneSide Value of the last zone side
   * @this {Zone}
   * @description Constructor of the Zone class
   */
  public constructor(shrinkCoefficient: number, lastZoneSide: number) {
    this._isFirstStage = true;
    this._isNewStage = true;
    this._finalZoneShape = new ZoneShape(new Point(0, 0), new Point(0, 0));
    this._currentZoneShape = new ZoneShape(new Point(0, 0), new Point(0, 0));
    this._verticalDistancesRatio = 0;
    this._horizontalDistancesRatio = 0;
    this._topDistance = 0;
    this._bottomDistance = 0;
    this._leftDistance = 0;
    this._rightDistance = 0;
    this._verticalStepCount = 0;
    this._horizontalStepCount = 0;
    this.shrinkCoefficient = shrinkCoefficient;
    this.lastZoneSide = lastZoneSide;
  }

  //#endregion

  //#region Accessor functions

  /**
   * Getter
   * @description Parameters of the final zone shape:
   * upper left point, lower right point
   */
  public get finalZoneShape(): ZoneShape {
    const zoneShape = new ZoneShape(
      this._finalZoneShape.upperLeftPoint,
      this._finalZoneShape.lowerRightPoint
    );

    return zoneShape;
  }

  /**
   * Getter
   * @description Parameters of the current zone shape:
   * upper left point, lower right point
   */
  public get currentZoneShape(): ZoneShape {
    const zoneShape = new ZoneShape(
      this._currentZoneShape.upperLeftPoint,
      this._currentZoneShape.lowerRightPoint
    );

    return zoneShape;
  }

  /**
   * Accessor
   * @description Coefficient of zone shrinking
   */
  public get shrinkCoefficient(): number {
    return this._shrinkCoefficient;
  }
  public set shrinkCoefficient(value: number) {
    if (value <= 0) {
      throw new Error('Invalid shrinking coefficient. The value should be greater then 0.');
    } else {
      this._shrinkCoefficient = value;
    }
  }

  /**
   * Accessor
   * @description Value of the last zone side
   */
  public get lastZoneSide(): number {
    return this._lastZoneSide;
  }
  public set lastZoneSide(value: number) {
    if (value < 0) {
      throw new Error('Invalid last zone side value. The value should be not less than 0.');
    } else {
      this._lastZoneSide = Math.floor(value);
    }
  }

  //#endregion

  //#region Class functions

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {*} borderFillingObject Object to fill a border of the zone
   * @param {*} cleanerObject Object to clean the border of the zone
   * @description Main function of the zone algorithm
   */
  public shrink(
    location: Array<any>,
    fillingObject: any,
    borderFillingObject: any,
    cleanerObject: any
  ): void {
    // verification of the first stage
    if (this._isFirstStage) {
      this.initializeFirstStage(location);
    }

    // verification of the beginning of the new stage

    if (this._isNewStage) {
      this.beginNewStage(location, borderFillingObject, cleanerObject);
    }

    // continuation of the current stage

    this.continueCurrentStage(location, fillingObject);
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @description Sets game location shape as current zone shape
   */
  private initializeFirstStage(location: Array<any>): void {
    const upperLeftPoint = new Point(0, 0);
    const lowerRightPoint = new Point(location.length - 1, location[0].length - 1);

    this._currentZoneShape.defineShape(upperLeftPoint, lowerRightPoint);

    this._isFirstStage = false;
    this._isNewStage = true;
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} borderFillingObject Object to fill a border of the zone
   * @param {*} cleanerObject Object to clean the border of the zone
   * @description Finds new final zone shape
   */
  private beginNewStage(
    location: Array<any>,
    borderFillingObject: any,
    cleanerObject: any
  ): void {
    this.clearBorder(location, cleanerObject);
    this.calculateFinalZoneShape();
    this.calculateDistances();
    this.calculateVerticalDistancesRatio();
    this.calculateHorizontalDistancesRatio();
    this.drawZoneBorderline(location, borderFillingObject);

    this._verticalStepCount = 0;
    this._horizontalStepCount = 0;

    this._isNewStage = false;
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} cleanerObject Object to clean the border of the zone
   * @description Removes the drawn border of the final zone
   */
  private clearBorder(location: Array<any>, cleanerObject: any): void {
    for (let i = this._finalZoneShape.upperLeftPoint.x; i <= this._finalZoneShape.lowerRightPoint.x; i++) {
      location[i][this._finalZoneShape.upperLeftPoint.y] = cleanerObject;
      location[i][this._finalZoneShape.lowerRightPoint.y] = cleanerObject;
    }
    for (let i = this._finalZoneShape.upperLeftPoint.y; i <= this._finalZoneShape.lowerRightPoint.y; i++) {
      location[this._finalZoneShape.upperLeftPoint.x][i] = cleanerObject;
      location[this._finalZoneShape.lowerRightPoint.x][i] = cleanerObject;
    }
  }

  /**
   * @method
   * @description Calculate parameters of the final zone
   */
  private calculateFinalZoneShape(): void {
    const currentMinimalSide = this._currentZoneShape.getMinimalSide();

    let finalZoneSide = currentMinimalSide / this._shrinkCoefficient;
    const finalZoneSideRounded = Math.round(finalZoneSide);
    finalZoneSide = finalZoneSideRounded <= this._lastZoneSide ? this._lastZoneSide : finalZoneSideRounded;

    const minBoundX = this._currentZoneShape.upperLeftPoint.x;
    const maxBoundX = this._currentZoneShape.lowerRightPoint.x - finalZoneSide + 2;
    const minBoundY = this._currentZoneShape.upperLeftPoint.y;
    const maxBoundY = this._currentZoneShape.lowerRightPoint.y - finalZoneSide + 2;

    const finalZoneX1 = Math.floor(Math.random() * (maxBoundX - minBoundX) + minBoundX);
    const finalZoneY1 = Math.floor(Math.random() * (maxBoundY - minBoundY) + minBoundY);

    const upperLeftPoint = new Point(finalZoneX1, finalZoneY1);
    const lowerRightPoint = new Point(
      finalZoneX1 + finalZoneSide - 1,
      finalZoneY1 + finalZoneSide - 1
    );

    this._finalZoneShape.defineShape(upperLeftPoint, lowerRightPoint);
  }

  /**
   * @method
   * @description Calculates distances between zones
   */
  private calculateDistances(): void {
    this._topDistance = Math.abs(this._finalZoneShape.upperLeftPoint.y - this._currentZoneShape.upperLeftPoint.y);
    this._bottomDistance = Math.abs(this._currentZoneShape.lowerRightPoint.y - this._finalZoneShape.lowerRightPoint.y);
    this._leftDistance = Math.abs(this._finalZoneShape.upperLeftPoint.x - this._currentZoneShape.upperLeftPoint.x);
    this._rightDistance = Math.abs(this._currentZoneShape.lowerRightPoint.x - this._finalZoneShape.lowerRightPoint.x);
  }

  /**
   * @method
   * @description Calculates the ratio between the vertical distances of zones
   */
  private calculateVerticalDistancesRatio(): void {
    if (this._topDistance <= 0 || this._bottomDistance <= 0) {
      this._verticalDistancesRatio = 0;
    } else {
      const max = Math.max(this._topDistance, this._bottomDistance);
      const min = Math.min(this._topDistance, this._bottomDistance);
      this._verticalDistancesRatio = Math.floor(max / min);
    }
  }

  /**
   * @method
   * @description Calculates the ratio between the horizontal distances of zones
   */
  private calculateHorizontalDistancesRatio(): void {
    if (this._leftDistance <= 0 || this._rightDistance <= 0) {
      this._horizontalDistancesRatio = 0;
    } else {
      const max = Math.max(this._leftDistance, this._rightDistance);
      const min = Math.min(this._leftDistance, this._rightDistance);
      this._horizontalDistancesRatio = Math.floor(max / min);
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} borderFillingObject Object to fill a border of the zone
   * @description Fills border cells of the final zone with given object
   */
  private drawZoneBorderline(location: Array<any>, borderFillingObject: any): void {
    for (let i = this._finalZoneShape.upperLeftPoint.x; i <= this._finalZoneShape.lowerRightPoint.x; i++) {
      location[i][this._finalZoneShape.upperLeftPoint.y] = borderFillingObject;
      location[i][this._finalZoneShape.lowerRightPoint.y] = borderFillingObject;
    }
    for (let i = this._finalZoneShape.upperLeftPoint.y; i <= this._finalZoneShape.lowerRightPoint.y; i++) {
      location[this._finalZoneShape.upperLeftPoint.x][i] = borderFillingObject;
      location[this._finalZoneShape.lowerRightPoint.x][i] = borderFillingObject;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @description Fill an area outside the current zone
   */
  private continueCurrentStage(location: Array<any>, fillingObject: any): void {
    const shrinkSteps = {
      topStep: 0,
      bottomStep: 0,
      leftStep: 0,
      rightStep: 0
    };

    // vertical

    this.shrinkVertically(location, fillingObject, shrinkSteps);

    // horizontal

    this.shrinkHorizontally(location, fillingObject, shrinkSteps);

    // shrink single size zone

    this.shrinkSingleSizeZone(location, fillingObject);

    // update currentZoneShape

    this.calculateCurrentZoneShape(shrinkSteps);

    // check if current zone reaches final zone

    this.checkIsFinalZoneReached();
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Shrinks location vertically
   */
  private shrinkVertically(location: Array<any>, fillingObject: any, shrinkSteps: ShrinkSteps): void {
    const isTopSideReached = (this._currentZoneShape.upperLeftPoint.y === this._finalZoneShape.upperLeftPoint.y);
    const isBottomSideReached = (this._currentZoneShape.lowerRightPoint.y === this._finalZoneShape.lowerRightPoint.y);

    const upperX = this._currentZoneShape.upperLeftPoint.x;
    const upperY = this._currentZoneShape.upperLeftPoint.y;
    const lowerX = this._currentZoneShape.lowerRightPoint.x;
    const lowerY = this._currentZoneShape.lowerRightPoint.y;

    if (!isTopSideReached && !isBottomSideReached) {
      this._verticalStepCount++;

      const isCommonStep = (this._verticalStepCount === this._verticalDistancesRatio);

      if (this._topDistance > this._bottomDistance) {
        shrinkSteps.topStep++;

        ZoneFilling.unequalDistancesVerticalLoop(location, fillingObject, upperX, lowerX, upperY, lowerY, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.bottomStep++;
          this._verticalStepCount = 0;
        }
      } else if (this._topDistance < this._bottomDistance) {
        shrinkSteps.bottomStep++;

        ZoneFilling.unequalDistancesVerticalLoop(location, fillingObject, upperX, lowerX, lowerY, upperY, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.topStep++;
          this._verticalStepCount = 0;
        }
      } else {
        ZoneFilling.equalDistancesVerticalLoop(location, fillingObject, upperX, lowerX, upperY, lowerY);

        shrinkSteps.topStep++;
        shrinkSteps.bottomStep++;
        this._verticalStepCount = 0;
      }
    } else if (isTopSideReached && !isBottomSideReached) {
      ZoneFilling.zeroDistanceVerticalLoop(location, fillingObject, upperX, lowerX, lowerY);

      shrinkSteps.bottomStep++;
    } else if (!isTopSideReached && isBottomSideReached) {
      ZoneFilling.zeroDistanceVerticalLoop(location, fillingObject, upperX, lowerX, upperY);

      shrinkSteps.topStep++;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Shrinks location horizontally
   */
  private shrinkHorizontally(location: Array<any>, fillingObject: any, shrinkSteps: ShrinkSteps): void {
    const isLeftSideReached = (this._currentZoneShape.upperLeftPoint.x === this._finalZoneShape.upperLeftPoint.x);
    const isRightSideReached = (this._currentZoneShape.lowerRightPoint.x === this._finalZoneShape.lowerRightPoint.x);

    const upperX = this._currentZoneShape.upperLeftPoint.x;
    const upperY = this._currentZoneShape.upperLeftPoint.y;
    const lowerX = this._currentZoneShape.lowerRightPoint.x;
    const lowerY = this._currentZoneShape.lowerRightPoint.y;

    if (!isLeftSideReached && !isRightSideReached) {
      this._horizontalStepCount++;

      const isCommonStep = (this._horizontalStepCount === this._horizontalDistancesRatio);

      if (this._leftDistance > this._rightDistance) {
        shrinkSteps.leftStep++;

        ZoneFilling.unequalDistancesHorizontalLoop(location, fillingObject, upperY, lowerY, upperX, lowerX, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.rightStep++;
          this._horizontalStepCount = 0;
        }
      } else if (this._leftDistance < this._rightDistance) {
        shrinkSteps.rightStep++;

        ZoneFilling.unequalDistancesHorizontalLoop(location, fillingObject, upperY, lowerY, lowerX, upperX, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.leftStep++;
          this._horizontalStepCount = 0;
        }
      } else {
        ZoneFilling.equalDistancesHorizontalLoop(location, fillingObject, upperY, lowerY, upperX, lowerX);

        shrinkSteps.leftStep++;
        shrinkSteps.rightStep++;
        this._horizontalStepCount = 0;
      }
    } else if (isLeftSideReached && !isRightSideReached) {
      ZoneFilling.zeroDistanceHorizontalLoop(location, fillingObject, upperY, lowerY, lowerX);

      shrinkSteps.rightStep++;
    } else if (!isLeftSideReached && isRightSideReached) {
      ZoneFilling.zeroDistanceHorizontalLoop(location, fillingObject, upperY, lowerY, upperX);

      shrinkSteps.leftStep++;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @description Shrinks zone when its size equals one
   */
  private shrinkSingleSizeZone(location: Array<any>, fillingObject: any): void {
    if (
      this._currentZoneShape.getWidth() === 1 &&
      this._currentZoneShape.getHeight() === 1 &&
      this._lastZoneSide < 1
    ) {
      location
      [this.currentZoneShape.upperLeftPoint.x]
      [this._currentZoneShape.upperLeftPoint.y]
      = fillingObject;
    }
  }

  /**
   * @method
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Calculate parameters of the current zone
   */
  private calculateCurrentZoneShape(shrinkSteps: ShrinkSteps): void {
    const upperLeftPoint = new Point(
      this._currentZoneShape.upperLeftPoint.x + shrinkSteps.leftStep,
      this._currentZoneShape.upperLeftPoint.y + shrinkSteps.topStep
    );

    const lowerRightPoint = new Point(
      this._currentZoneShape.lowerRightPoint.x - shrinkSteps.rightStep,
      this._currentZoneShape.lowerRightPoint.y - shrinkSteps.bottomStep
    );

    this._currentZoneShape.defineShape(upperLeftPoint, lowerRightPoint);
  }

  /**
   * @method
   * @description Check if the current zone reaches the final zone
   */
  private checkIsFinalZoneReached(): void {
    if (
      this._currentZoneShape.upperLeftPoint.x === this._finalZoneShape.upperLeftPoint.x
      && this._currentZoneShape.upperLeftPoint.y === this._finalZoneShape.upperLeftPoint.y
      && this._currentZoneShape.lowerRightPoint.x === this._finalZoneShape.lowerRightPoint.x
      && this._currentZoneShape.lowerRightPoint.y === this._finalZoneShape.lowerRightPoint.y
    ) {
      this._isNewStage = true;
    }
  }

  //#endregion
}
