import { action, computed, observable } from 'mobx';
import { SCALE_COEF, TRANSITION } from './battlefieldStore';

export class BulletStore {
  @observable
  public id: number;
  @observable
  public x: number;
  @observable
  public y: number;
  @observable
  public direction: number;

  public constructor(id: number, x: number, y: number, direction: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

export type BulletStoreType = BulletStore;
