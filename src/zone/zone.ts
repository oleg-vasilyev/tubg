import { Point } from "./point";
import { ZoneShape } from "./zoneShape";

/*
Надо обмозговать:
  -Все еще пересмотреть способ сжатия единичной зоны, мб что-то можно сделать лучше
*/

/**
 * @class
 * @description Represents shrinking zone in the game location
 */
export class Zone {
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

  //#region Constructor

  /** @constructor
   * @this {Zone}
   * @description Constructor of the Zone class */
  public constructor() {
    this._isFirstStage = true;
    this._isNewStage = true;
    this._finalZoneShape = new ZoneShape(new Point(0, 0), 0, new Point(0, 0));
    this._currentZoneShape = new ZoneShape(new Point(0, 0), 0, new Point(0, 0));
    this._verticalDistancesRatio = 0;
    this._horizontalDistancesRatio = 0;
    this._topDistance = 0;
    this._bottomDistance = 0;
    this._leftDistance = 0;
    this._rightDistance = 0;
    this._verticalStepCount = 0;
    this._horizontalStepCount = 0;
  }

  //#endregion

  //#region Accessor functions declaration

  /**
   * Accessor
   * @description Is that a first stage of shrinking?
   */
  public get isFirstStage(): boolean {
    return this._isFirstStage;
  }
  public set isFirstStage(value: boolean) {
    this._isFirstStage = value;
  }

  /**
   * Accessor
   * @description Is that a new stage of shrinking
   */
  public get isNewStage(): boolean {
    return this._isNewStage;
  }
  public set isNewStage(value: boolean) {
    this._isNewStage = value;
  }

  /**
   * Accessor
   * @description Parameters of the final zone shape:
   * upper left point, lower right point, side
   */
  public get finalZoneShape(): ZoneShape {
    return this._finalZoneShape;
  }
  public set finalZoneShape(value: ZoneShape) {
    this._finalZoneShape = value;
  }

  /**
   * Accessor
   * @description Parameters of the current zone shape:
   * upper left point, lower right point, side
   */
  public get currentZoneShape(): ZoneShape {
    return this._currentZoneShape;
  }
  public set currentZoneShape(value: ZoneShape) {
    this._currentZoneShape = value;
  }

  /**
   * Accessor
   * @description The ratio of the distances between the zones vertically
   */
  public get verticalDistancesRatio(): number {
    return this._verticalDistancesRatio;
  }
  public set verticalDistancesRatio(value: number) {
    this._verticalDistancesRatio = value;
  }

  /**
   * Accessor
   * @description The ratio of the distances between the zones horizontally
   */
  public get horizontalDistancesRatio(): number {
    return this._horizontalDistancesRatio;
  }
  public set horizontalDistancesRatio(value: number) {
    this._horizontalDistancesRatio = value;
  }

  /**
   * Accessor
   * @description Value of the top distance between zones
   */
  public get topDistance(): number {
    return this._topDistance;
  }
  public set topDistance(value: number) {
    this._topDistance = value;
  }

  /**
   * Accessor
   * @description Value of the bottom distance between zones
   */
  public get bottomDistance(): number {
    return this._bottomDistance;
  }
  public set bottomDistance(value: number) {
    this._bottomDistance = value;
  }

  /**
   * Accessor
   * @description Value of the left distance between zones
   */
  public get leftDistance(): number {
    return this._leftDistance;
  }
  public set leftDistance(value: number) {
    this._leftDistance = value;
  }

  /**
   * Accessor
   * @description Value of the right distance between zones
   */
  public get rightDistance(): number {
    return this._rightDistance;
  }
  public set rightDistance(value: number) {
    this._rightDistance = value;
  }

  /**
   * Accessor
   * @description Value of the vertical shrinking steps
   */
  public get verticalStepCount(): number {
    return this._verticalStepCount;
  }
  public set verticalStepCount(value: number) {
    this._verticalStepCount = value;
  }

  /**
   * Accessor
   * @description Value of the horizontal shrinking steps
   */
  public get horizontalStepCount(): number {
    return this._horizontalStepCount;
  }
  public set horizontalStepCount(value: number) {
    this._horizontalStepCount = value;
  }

  //#endregion

  //#region Class functions

  /**
   * @function
   * @param {array} location Game location for processing
   * @param {number} shrinkCoefficient Coefficient of zone shrinking
   * @param {number} lastZoneSide Value of the last zone side
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {*} borderFillingObject Object to fill a border of the zone
   * @param {*} cleanerObject Object to clean the border of the zone
   * @description Main function of the zone algorithm
   */
  public shrink(location: Array<any>, shrinkCoefficient: number, lastZoneSide: number, fillingObject: any, borderFillingObject: any, cleanerObject: any): void {
    // Verification of the first stage
    if (this._isFirstStage) {
      this.initializeFirstStage(location);
    }

    // Verification of the beginning of the new stage

    if (this._isNewStage) {
      this.beginNewStage(location, shrinkCoefficient, lastZoneSide, borderFillingObject, cleanerObject);
    }

    // Continuation of the current stage

    this.continueCurrentStage(location, fillingObject, lastZoneSide);
  }

  /**
   * @function
   * @param {array} location Game location for processing
   * @description Sets game location shape as current zone shape
   */
  private initializeFirstStage(location: Array<any>): void {
    this._currentZoneShape.upperLeftPoint.x = 0;
    this._currentZoneShape.upperLeftPoint.y = 0;
    this._currentZoneShape.lowerRightPoint.x = location.length - 1;
    this._currentZoneShape.lowerRightPoint.y = location[0].length - 1;

    /* Appropriate getters of the battlefield object will be used to define side of the zone */
    const horizontalSide = this._currentZoneShape.getHorizontalSide();
    const verticalSide = this._currentZoneShape.getVerticalSide();
    this._currentZoneShape.side = Math.min(horizontalSide, verticalSide);

    this._isFirstStage = false;
    this._isNewStage = true;
  }

  /**
   * @function
   * @param {array} location Game location for processing
   * @param {number} shrinkCoefficient Coefficient of zone shrinking
   * @param {number} lastZoneSide Value of the last zone side
   * @param {*} borderFillingObject Object to fill a border of the zone
   * @param {*} cleanerObject Object to clean the border of the zone
   * @description Finds new final zone shape
   */
  private beginNewStage(location: Array<any>, shrinkCoefficient: number, lastZoneSide: number, borderFillingObject: any, cleanerObject: any): void {
    this.clearBorder(location, cleanerObject);
    this.calculateFinalZoneShape(shrinkCoefficient, lastZoneSide);
    this.calculateDistances();
    this.calculateVerticalDistancesRatio();
    this.calculateHorizontalDistancesRatio();
    this.drawZoneBorderline(location, borderFillingObject);

    this._verticalStepCount = 0;
    this._horizontalStepCount = 0;

    this._isNewStage = false;
  }

  /**
   * @function
   * @param {number} shrinkCoefficient Coefficient of zone shrinking
   * @param {number} lastZoneSide Value of the last zone side
   * @description Calculate parameters of the final zone
   */
  private calculateFinalZoneShape(shrinkCoefficient: number, lastZoneSide: number): void {
    let finalZoneSide = this._currentZoneShape.side / shrinkCoefficient;
    const finalZoneSideRounded = Math.round(finalZoneSide);
    finalZoneSide = finalZoneSideRounded <= lastZoneSide ? lastZoneSide : finalZoneSideRounded;

    // Для случая если нужна центральная точка
    // finalZoneSide = finalZoneSideRounded <= lastZoneSide
    // ? lastZoneSide : finalZoneSideRounded % 2 !== 0
    // ? finalZoneSideRounded : finalZoneSideRounded - 1;

    const minBoundX = this._currentZoneShape.upperLeftPoint.x;
    const maxBoundX = this._currentZoneShape.lowerRightPoint.x - finalZoneSide + 2;
    const minBoundY = this._currentZoneShape.upperLeftPoint.y;
    const maxBoundY = this._currentZoneShape.lowerRightPoint.y - finalZoneSide + 2;

    const finalZoneX1 = Math.floor(Math.random() * (maxBoundX - minBoundX) + minBoundX);
    const finalZoneY1 = Math.floor(Math.random() * (maxBoundY - minBoundY) + minBoundY);

    this._finalZoneShape.upperLeftPoint.x = finalZoneX1;
    this._finalZoneShape.upperLeftPoint.y = finalZoneY1;
    this._finalZoneShape.side = finalZoneSide;
    this._finalZoneShape.calculateLowerRightPoint();
  }

  /**
   * @function
   * @description Calculates distances between zones
   */
  private calculateDistances(): void {
    this._topDistance = Math.abs(this._finalZoneShape.upperLeftPoint.y - this._currentZoneShape.upperLeftPoint.y);
    this._bottomDistance = Math.abs(this._currentZoneShape.lowerRightPoint.y - this._finalZoneShape.lowerRightPoint.y);
    this._leftDistance = Math.abs(this._finalZoneShape.upperLeftPoint.x - this._currentZoneShape.upperLeftPoint.x);
    this._rightDistance = Math.abs(this._currentZoneShape.lowerRightPoint.x - this._finalZoneShape.lowerRightPoint.x);
  }

  /**
   * @function
   * @description Calculates the ratio between the vertical distances of zones
   */
  private calculateVerticalDistancesRatio(): void {
    if (this._topDistance <= 0 || this._bottomDistance <= 0) {
      this._verticalDistancesRatio = 0;
    }
    else {
      const max = Math.max(this._topDistance, this._bottomDistance);
      const min = Math.min(this._topDistance, this._bottomDistance);
      this._verticalDistancesRatio = Math.floor(max / min);
    }
  }

  /**
   * @function
   * @description Calculates the ratio between the horizontal distances of zones
   */
  private calculateHorizontalDistancesRatio(): void {
    if (this._leftDistance <= 0 || this._rightDistance <= 0) {
      this._horizontalDistancesRatio = 0;
    }
    else {
      const max = Math.max(this._leftDistance, this._rightDistance);
      const min = Math.min(this._leftDistance, this._rightDistance);
      this._horizontalDistancesRatio = Math.floor(max / min);
    }
  }

  /**
   * @function
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} lastZoneSide Value of the last zone side
   * @description Fill an area outside the current zone
   */
  private continueCurrentStage(location: Array<any>, fillingObject: any, lastZoneSide: number): void {
    const shrinkSteps = {
      topStep: 0,
      bottomStep: 0,
      leftStep: 0,
      rightStep: 0
    };

    // Vertical

    this.shrinkVertically(location, fillingObject, shrinkSteps);

    // Horizontal

    this.shrinkHorizontally(location, fillingObject, shrinkSteps);

    // Shrink single size zone

    this.shrinkSingleSizeZone(location, fillingObject, lastZoneSide);

    // Update currentZoneShape

    this.calculateCurrentZoneShape(shrinkSteps);

    // Check if current zone reaches final zone

    this.checkIsFinalZoneReached();
  }

  /**
   * @function
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Shrinks location vertically
   */
  private shrinkVertically(location: Array<any>, fillingObject: any, shrinkSteps: any): void {
    const isTopSideReached = (this._currentZoneShape.upperLeftPoint.y === this._finalZoneShape.upperLeftPoint.y);
    const isBottomSideReached = (this._currentZoneShape.lowerRightPoint.y === this._finalZoneShape.lowerRightPoint.y);
    const isCommonStep = (this._verticalStepCount === this._verticalDistancesRatio);

    const upperX = this._currentZoneShape.upperLeftPoint.x;
    const upperY = this._currentZoneShape.upperLeftPoint.y;
    const lowerX = this._currentZoneShape.lowerRightPoint.x;
    const lowerY = this._currentZoneShape.lowerRightPoint.y;

    if (!isTopSideReached && !isBottomSideReached) {
      this._verticalStepCount++;

      if (this._topDistance > this._bottomDistance) {
        shrinkSteps.topStep++;

        for (let i = upperX; i <= lowerX; i++) {
          location[i][upperY] = fillingObject;

          if (isCommonStep) {
            location[i][lowerY] = fillingObject;
          }
        }

        if (isCommonStep) {
          shrinkSteps.bottomStep++;
          this._verticalStepCount = 0;
        }
      }
      else if (this._topDistance < this._bottomDistance) {
        shrinkSteps.bottomStep++;

        for (let i = upperX; i <= lowerX; i++) {
          location[i][lowerY] = fillingObject;

          if (isCommonStep) {
            location[i][upperY] = fillingObject;
          }
        }

        if (isCommonStep) {
          shrinkSteps.topStep++;
          this._verticalStepCount = 0;
        }
      }
      else {
        for (let i = upperX; i <= lowerX; i++) {
          location[i][upperY] = fillingObject;
          location[i][lowerY] = fillingObject;
        }

        shrinkSteps.topStep++;
        shrinkSteps.bottomStep++;
        this._verticalStepCount = 0;
      }
    }
    else if (isTopSideReached && !isBottomSideReached) {
      for (let i = upperX; i <= lowerX; i++) {
        location[i][lowerY] = fillingObject;
      }

      shrinkSteps.bottomStep++;
    }
    else if (!isTopSideReached && isBottomSideReached) {
      for (let i = upperX; i <= lowerX; i++) {
        location[i][upperY] = fillingObject;
      }

      shrinkSteps.topStep++;
    }
  }

  /**
   * @function
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Shrinks location horizontally
   */
  private shrinkHorizontally(location: Array<any>, fillingObject: any, shrinkSteps: any): void {
    const isLeftSideReached = (this._currentZoneShape.upperLeftPoint.x === this._finalZoneShape.upperLeftPoint.x);
    const isRightSideReached = (this._currentZoneShape.lowerRightPoint.x === this._finalZoneShape.lowerRightPoint.x);
    const isCommonStep = (this._horizontalStepCount === this._horizontalDistancesRatio);

    const upperX = this._currentZoneShape.upperLeftPoint.x;
    const upperY = this._currentZoneShape.upperLeftPoint.y;
    const lowerX = this._currentZoneShape.lowerRightPoint.x;
    const lowerY = this._currentZoneShape.lowerRightPoint.y;

    if (!isLeftSideReached && !isRightSideReached) {
      this._horizontalStepCount++;

      if (this._leftDistance > this._rightDistance) {
        shrinkSteps.leftStep++;

        for (let i = upperY; i <= lowerY; i++) {
          location[upperX][i] = fillingObject;

          if (isCommonStep) {
            location[lowerX][i] = fillingObject;
          }
        }

        if (isCommonStep) {
          shrinkSteps.rightStep++;
          this._horizontalStepCount = 0;
        }
      }
      else if (this._leftDistance < this._rightDistance) {
        shrinkSteps.rightStep++;

        for (let i = upperY; i <= lowerY; i++) {
          location[lowerX][i] = fillingObject;

          if (isCommonStep) {
            location[upperX][i] = fillingObject;
          }
        }

        if (isCommonStep) {
          shrinkSteps.leftStep++;
          this._horizontalStepCount = 0;
        }
      }
      else {
        for (let i = upperY; i <= lowerY; i++) {
          location[upperX][i] = fillingObject;
          location[lowerX][i] = fillingObject;
        }

        shrinkSteps.leftStep++;
        shrinkSteps.rightStep++;
        this._horizontalStepCount = 0;
      }
    }
    else if (isLeftSideReached && !isRightSideReached) {
      for (let i = upperY; i <= lowerY; i++) {
        location[lowerX][i] = fillingObject;
      }

      shrinkSteps.rightStep++;
    }
    else if (!isLeftSideReached && isRightSideReached) {
      for (let i = upperY; i <= lowerY; i++) {
        location[upperX][i] = fillingObject;
      }

      shrinkSteps.leftStep++;
    }
  }

  /**
   * @function
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} lastZoneSide Value of the last zone side
   * @description Shrinks zone when its size equals one
   */
  private shrinkSingleSizeZone(location: Array<any>, fillingObject: any, lastZoneSide: number): void {
    if (this._currentZoneShape.side === 1 && lastZoneSide < 1) {
      location[this.currentZoneShape.upperLeftPoint.x][this._currentZoneShape.upperLeftPoint.y] = fillingObject;
    }
  }

  /**
   * @function
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Calculate parameters of the current zone
   */
  private calculateCurrentZoneShape(shrinkSteps: any): void {
    this._currentZoneShape.upperLeftPoint.x += shrinkSteps.leftStep;
    this._currentZoneShape.upperLeftPoint.y += shrinkSteps.topStep;
    this._currentZoneShape.lowerRightPoint.x -= shrinkSteps.rightStep;
    this._currentZoneShape.lowerRightPoint.y -= shrinkSteps.bottomStep;
    this._currentZoneShape.calculateSide();
  }

  /**
   * @function
   * @description Check if the current zone reaches the final zone
   */
  private checkIsFinalZoneReached(): void {
    if (
      this._currentZoneShape.upperLeftPoint.x === this._finalZoneShape.upperLeftPoint.x
      && this._currentZoneShape.upperLeftPoint.y === this._finalZoneShape.upperLeftPoint.y
      && this._currentZoneShape.side === this._finalZoneShape.side
      && this._currentZoneShape.lowerRightPoint.x === this._finalZoneShape.lowerRightPoint.x
      && this._currentZoneShape.lowerRightPoint.y === this._finalZoneShape.lowerRightPoint.y
    ) {
      this._isNewStage = true;
    }
  }

  /**
   * @function
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
   * @function
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

  //#endregion

  //#region Garbage

  // /**
  //  * private static field
  //  *
  //  * Value of the current zone radius
  //  */
  // _zoneRadius: 0,

  // /**
  //  * private static field
  //  *
  //  * Coordinates of the zone center
  //  */
  // _zoneCenterPoint: {
  // 	x: 0,
  // 	y: 0
  // }

  // /**
  //  * private static field
  //  *
  //  * Coordinates of the first point inside the zone
  //  */
  // _zoneUpperLeftPoint: {
  // 	x: 0,
  // 	y:0
  // }

  // /**
  //  * private static field
  //  *
  //  * Value of the current zone radius
  //  */
  // get zoneRadius() {
  // 	return this._zoneRadius;
  // }
  // set zoneRadius(value) {
  // 	unlockObjectField(this, "_zoneRadius");

  // 	this._zoneRadius = value;

  // 	lockObjectField(this, "_zoneRadius");
  // }

  // /**
  //  * private static field
  //  *
  //  * Coordinates of the zone center
  //  */
  // get zoneCenterPoint() {
  // 	return this._zoneCenterPoint;
  // }
  // set zoneCenterPoint(value) {
  // 	unlockObjectField(this, "_zoneCenterPoint");

  // 	this._zoneCenterPoint = value;

  // 	lockObjectField(this, "_zoneCenterPoint");
  // }

  // /**
  //  * private static field
  //  *
  //  * Coordinates of the first point inside the zone
  //  */
  // get zoneUpperLeftPoint() {
  // 	return this._zoneUpperLeftPoint;
  // }
  // set zoneUpperLeftPoint(value) {
  // 	unlockObjectField(this, "_zoneUpperLeftPoint");

  // 	this._zoneUpperLeftPoint = value;

  // 	lockObjectField(this, "_zoneUpperLeftPoint");
  // }

  //#endregion
};