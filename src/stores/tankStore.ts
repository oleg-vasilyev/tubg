import { computed, observable } from 'mobx';
import { SCALE_COEF, TRANSITION } from './battlefieldStore';

export class TankStore {
  @observable
  public id: number;
  @observable
  public x: number;
  @observable
  public y: number;
  @observable
  public health: number;
  @observable
  public direction: number;

  public constructor(id: number, x: number, y: number, health: number, direction: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = health;
    this.direction = direction;
  }

  @computed
  public get tankStyle() {
    const topVal = this.y * SCALE_COEF.get();
    const leftVal = this.x * SCALE_COEF.get();
    const angleVal = this.health <= 0 ? 0 : this.direction;

    return {
      width: SCALE_COEF,
      height: SCALE_COEF,
      top: topVal,
      left: leftVal,
      transform: angleVal,
      transition: TRANSITION.get()
    };
  }
}

export type TankStoreType = TankStore;
