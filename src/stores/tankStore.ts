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
  @observable
  public score: number;
  @observable
  public name: string;

  public constructor(id: number, x: number, y: number, health: number, direction: number, score: number, name:string) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = health;
    this.direction = direction;
    this.score = score;
    this.name = name;
  }
}

export type TankStoreType = TankStore;
