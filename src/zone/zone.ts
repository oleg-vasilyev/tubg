import { ShrinkSteps } from './shrinkSteps';
import { ZoneShape } from "./zoneShape";

/*
  Note:
  There are some parameters, marked as "any" type.
  I'll change this as soon as we decided what these parameters will be.
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

  //#endregion

  //#region Constructor

  /** @constructor
   * @this {Zone}
   * @description Constructor of the Zone class */
  public constructor() {
    this._isFirstStage = true;
    this._isNewStage = true;
    this._finalZoneShape = new ZoneShape();
    this._currentZoneShape = new ZoneShape();
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

  //#region Accessor functions

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
   * @method
   * @param {array} location Game location for processing
   * @param {number} shrinkCoefficient Coefficient of zone shrinking
   * @param {number} lastZoneSide Value of the last zone side
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {*} borderFillingObject Object to fill a border of the zone
   * @param {*} cleanerObject Object to clean the border of the zone
   * @description Main function of the zone algorithm
   */
  public shrink(
    location: Array<any>,
    shrinkCoefficient: number,
    lastZoneSide: number,
    fillingObject: any,
    borderFillingObject: any,
    cleanerObject: any
  ): void {
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
   * @method
   * @param {array} location Game location for processing
   * @description Sets game location shape as current zone shape
   */
  private initializeFirstStage(location: Array<any>): void {
    this._currentZoneShape.upperLeftPoint.x = 0;
    this._currentZoneShape.upperLeftPoint.y = 0;
    this._currentZoneShape.lowerRightPoint.x = location.length - 1;
    this._currentZoneShape.lowerRightPoint.y = location[0].length - 1;

    this._currentZoneShape.calculateSides();

    this._isFirstStage = false;
    this._isNewStage = true;
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {number} shrinkCoefficient Coefficient of zone shrinking
   * @param {number} lastZoneSide Value of the last zone side
   * @param {*} borderFillingObject Object to fill a border of the zone
   * @param {*} cleanerObject Object to clean the border of the zone
   * @description Finds new final zone shape
   */
  private beginNewStage(
    location: Array<any>,
    shrinkCoefficient: number,
    lastZoneSide: number,
    borderFillingObject: any,
    cleanerObject: any
  ): void {
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
   * @param {number} shrinkCoefficient Coefficient of zone shrinking
   * @param {number} lastZoneSide Value of the last zone side
   * @description Calculate parameters of the final zone
   */
  private calculateFinalZoneShape(shrinkCoefficient: number, lastZoneSide: number): void {
    const currentMinimalSide = this._currentZoneShape.getMinimalSide();

    let finalZoneSide = currentMinimalSide / shrinkCoefficient;
    const finalZoneSideRounded = Math.round(finalZoneSide);
    finalZoneSide = finalZoneSideRounded <= lastZoneSide ? lastZoneSide : finalZoneSideRounded;

    const minBoundX = this._currentZoneShape.upperLeftPoint.x;
    const maxBoundX = this._currentZoneShape.lowerRightPoint.x - finalZoneSide + 2;
    const minBoundY = this._currentZoneShape.upperLeftPoint.y;
    const maxBoundY = this._currentZoneShape.lowerRightPoint.y - finalZoneSide + 2;

    const finalZoneX1 = Math.floor(Math.random() * (maxBoundX - minBoundX) + minBoundX);
    const finalZoneY1 = Math.floor(Math.random() * (maxBoundY - minBoundY) + minBoundY);

    this._finalZoneShape.upperLeftPoint.x = finalZoneX1;
    this._finalZoneShape.upperLeftPoint.y = finalZoneY1;
    this._finalZoneShape.width = finalZoneSide;
    this._finalZoneShape.height = finalZoneSide;
    this._finalZoneShape.calculateLowerRightPoint();
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
    }
    else {
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
    }
    else {
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
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Shrinks location vertically
   */
  private shrinkVertically(location: Array<any>, fillingObject: any, shrinkSteps: ShrinkSteps): void {
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

        this.unequalDistancesVerticalLoop(location, fillingObject, upperX, lowerX, upperY, lowerY, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.bottomStep++;
          this._verticalStepCount = 0;
        }
      }
      else if (this._topDistance < this._bottomDistance) {
        shrinkSteps.bottomStep++;

        this.unequalDistancesVerticalLoop(location, fillingObject, upperX, lowerX, lowerY, upperY, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.topStep++;
          this._verticalStepCount = 0;
        }
      }
      else {
        this.equalDistancesVerticalLoop(location, fillingObject, upperX, lowerX, upperY, lowerY);

        shrinkSteps.topStep++;
        shrinkSteps.bottomStep++;
        this._verticalStepCount = 0;
      }
    }
    else if (isTopSideReached && !isBottomSideReached) {
      this.zeroDistanceVerticalLoop(location, fillingObject, upperX, lowerX, lowerY);

      shrinkSteps.bottomStep++;
    }
    else if (!isTopSideReached && isBottomSideReached) {
      this.zeroDistanceVerticalLoop(location, fillingObject, upperX, lowerX, upperY);

      shrinkSteps.topStep++;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} mainYIndex Y index of the main filling side
   * @param {number} commonStepYIndex Y index of the opposite filling side
   * @param {boolean} isCommonStep Value for tracking the common shrinking step
   * @description Fills vertical sides of the zone if vertical distances are unequal
   */
  private unequalDistancesVerticalLoop(
    location: Array<any>,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    mainYIndex: number,
    commonStepYIndex: number,
    isCommonStep: boolean
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      location[i][mainYIndex] = fillingObject;

      if (isCommonStep) {
        location[i][commonStepYIndex] = fillingObject;
      }
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} upperYIndex Y index of the top filling side
   * @param {number} lowerYIndex Y index of the bottom filling side
   * @description Fills vertical sides of the zone if vertical distances are equal
   */
  private equalDistancesVerticalLoop(
    location: Array<any>,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    upperYIndex: number,
    lowerYIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      location[i][upperYIndex] = fillingObject;
      location[i][lowerYIndex] = fillingObject;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} sideYIndex Y index of the filling side
   * @description Fills one vertical side of the zone
   */
  private zeroDistanceVerticalLoop(
    location: Array<any>,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    sideYIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      location[i][sideYIndex] = fillingObject;
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
    const isCommonStep = (this._horizontalStepCount === this._horizontalDistancesRatio);

    const upperX = this._currentZoneShape.upperLeftPoint.x;
    const upperY = this._currentZoneShape.upperLeftPoint.y;
    const lowerX = this._currentZoneShape.lowerRightPoint.x;
    const lowerY = this._currentZoneShape.lowerRightPoint.y;

    if (!isLeftSideReached && !isRightSideReached) {
      this._horizontalStepCount++;

      if (this._leftDistance > this._rightDistance) {
        shrinkSteps.leftStep++;

        this.unequalDistancesHorizontalLoop(location, fillingObject, upperY, lowerY, upperX, lowerX, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.rightStep++;
          this._horizontalStepCount = 0;
        }
      }
      else if (this._leftDistance < this._rightDistance) {
        shrinkSteps.rightStep++;

        this.unequalDistancesHorizontalLoop(location, fillingObject, upperY, lowerY, lowerX, upperX, isCommonStep);

        if (isCommonStep) {
          shrinkSteps.leftStep++;
          this._horizontalStepCount = 0;
        }
      }
      else {
        this.equalDistancesHorizontalLoop(location, fillingObject, upperY, lowerY, upperX, lowerX);

        shrinkSteps.leftStep++;
        shrinkSteps.rightStep++;
        this._horizontalStepCount = 0;
      }
    }
    else if (isLeftSideReached && !isRightSideReached) {
      this.zeroDistanceHorizontalLoop(location, fillingObject, upperY, lowerY, lowerX);

      shrinkSteps.rightStep++;
    }
    else if (!isLeftSideReached && isRightSideReached) {
      this.zeroDistanceHorizontalLoop(location, fillingObject, upperY, lowerY, upperX);

      shrinkSteps.leftStep++;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} mainXIndex X index of the main filling side
   * @param {number} commonStepXIndex X index of the opposite filling side
   * @param {boolean} isCommonStep Value for tracking the common shrinking step
   * @description Fills horizontal sides of the zone if horizontal distances are unequal
   */
  private unequalDistancesHorizontalLoop(
    location: Array<any>,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    mainXIndex: number,
    commonStepXIndex: number,
    isCommonStep: boolean
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      location[mainXIndex][i] = fillingObject;

      if (isCommonStep) {
        location[commonStepXIndex][i] = fillingObject;
      }
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} upperXIndex X index of the left filling side
   * @param {number} lowerXIndex X index of the right filling side
   * @description Fills horizontal sides of the zone if horizontal distances are equal
   */
  private equalDistancesHorizontalLoop(
    location: Array<any>,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    upperXIndex: number,
    lowerXIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      location[upperXIndex][i] = fillingObject;
      location[lowerXIndex][i] = fillingObject;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} sideXIndex X index of the filling side
   * @description Fills one horizontal side of the zone
   */
  private zeroDistanceHorizontalLoop(
    location: Array<any>,
    fillingObject: any,
    initialLoopValue: number,
    finalLoopValue: number,
    sideXIndex: number
  ): void {
    for (let i = initialLoopValue; i <= finalLoopValue; i++) {
      location[sideXIndex][i] = fillingObject;
    }
  }

  /**
   * @method
   * @param {array} location Game location for processing
   * @param {*} fillingObject Object to fill an area outside the zone
   * @param {number} lastZoneSide Value of the last zone side
   * @description Shrinks zone when its size equals one
   */
  private shrinkSingleSizeZone(location: Array<any>, fillingObject: any, lastZoneSide: number): void {
    if (this._currentZoneShape.width === 1 && this._currentZoneShape.height === 1 && lastZoneSide < 1) {
      location[this.currentZoneShape.upperLeftPoint.x][this._currentZoneShape.upperLeftPoint.y] = fillingObject;
    }
  }

  /**
   * @method
   * @param {object} shrinkSteps Values of shrinks for each side
   * @description Calculate parameters of the current zone
   */
  private calculateCurrentZoneShape(shrinkSteps: ShrinkSteps): void {
    this._currentZoneShape.upperLeftPoint.x += shrinkSteps.leftStep;
    this._currentZoneShape.upperLeftPoint.y += shrinkSteps.topStep;
    this._currentZoneShape.lowerRightPoint.x -= shrinkSteps.rightStep;
    this._currentZoneShape.lowerRightPoint.y -= shrinkSteps.bottomStep;
    this._currentZoneShape.calculateSides();
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
      && this._currentZoneShape.width === this._finalZoneShape.width
      && this._currentZoneShape.height === this._finalZoneShape.height
    ) {
      this._isNewStage = true;
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