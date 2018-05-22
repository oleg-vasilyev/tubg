/**
 * @class
 * @static
 * @description Fills the game location with shrinking zone
 */
export class ZoneFilling {
  /**
   * @constructor
   * @description Private constructor of static class
   */
  private constructor() {
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
  public static unequalDistancesVerticalLoop(
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
  public static equalDistancesVerticalLoop(
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
  public static zeroDistanceVerticalLoop(
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
   * @param {number} initialLoopValue Initial counter value of the loop
   * @param {number} finalLoopValue Final counter value of the loop
   * @param {number} mainXIndex X index of the main filling side
   * @param {number} commonStepXIndex X index of the opposite filling side
   * @param {boolean} isCommonStep Value for tracking the common shrinking step
   * @description Fills horizontal sides of the zone if horizontal distances are unequal
   */
  public static unequalDistancesHorizontalLoop(
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
  public static equalDistancesHorizontalLoop(
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
  public static zeroDistanceHorizontalLoop(
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
}