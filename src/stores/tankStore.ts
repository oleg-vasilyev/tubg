import { computed, observable } from 'mobx';
import { scaleCoef, transition } from './battlefieldStore';

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
}

export type TankStoreType = TankStore;
