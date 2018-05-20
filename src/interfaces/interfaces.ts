/**
 *  @interface
 *  @description interface of Tank state for AI
 */
export interface IState {
  x: number;
  y: number;
  direction: number;
  health: number;
  collisions: {
    enemy: boolean,
    wall: boolean,
    bullet: boolean
  };
  vision: {
    enemies: ITankTrack[],
    bullets: IBulletTrack[],
    walls: number[]
  };
}

/**
 *  @interface
 *  @description interface of TankTrack for AI
 */
export interface ITankTrack {
  id: number;
  x: number;
  y: number;
  direction: number;
  health: number;
}

/**
 *  @interface
 *  @description interface of BulletTrack for AI
 */
export interface IBulletTrack {
  id: number;
  x: number;
  y: number;
  direction: number;
}

/**
 *  @interface
 *  @description interface of Command AI for Tank
 */
export interface ICommandAi {
  move: boolean;
  shoot: boolean;
  rotate: number;
}

/**
 *  @interface
 *  @description interface of Command AI for Tank
 */
export interface ICallbackArg {
  message: string;
  performanceIssues: boolean;
  tankName: string;
  tankId: number;
}

/**
 *  @interface
 *  @description interface of event store item
 */
export interface IEvent {
  index: string;
  event: {};
}

