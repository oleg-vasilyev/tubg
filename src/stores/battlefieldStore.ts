import { action, computed, observable } from 'mobx';
import { Tank } from '../classes/tank';
import { Point } from '../zone/point';
import { ZoneShape } from '../zone/zoneShape';
import { Bullet } from './../classes/bullet';
import { BulletStore } from './bulletStore';
import { TankStore } from './tankStore';


const MIN_SCALE = 20;
const MAX_SCALE = 40;

export let SCALE_COEF = observable.box(MIN_SCALE);
export let TRANSITION = observable.box(1);

class BattlefieldStore {
  @observable
  public tankStoreList: TankStore[] = [];
  @observable
  public bulletStoreList: BulletStore[] = [];
  @observable
  public livingZone: ZoneShape;
  @observable
  public finalZone: ZoneShape;
  @observable
  public bfWidth: number;
  @observable
  public bfHeight: number;
  @observable
  public bfTop: number = 0;
  @observable
  public bfLeft: number = 0;

  @observable
  private isDraggable: boolean = false;

  private offset = [0, 0];
  private mousePosition = {x: 0, y: 0};

  @action
  public onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.isDraggable = true;
    this.offset = [
      e.currentTarget.offsetLeft - e.clientX,
      e.currentTarget.offsetTop - e.clientY
    ];
  }

  @action
  public onMouseUp = () => {
    this.isDraggable = false;
  }

  @action
  public onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.isDraggable) {

      this.mousePosition = {
        x: e.clientX,
        y: e.clientY
      };

      if (document.documentElement.clientWidth < (this.bfWidth * SCALE_COEF.get())) {
        const leftVal = (this.mousePosition.x + this.offset[0]);

        this.bfLeft = leftVal <=
          0 ?
          leftVal >=
          (document.documentElement.clientWidth - this.bfWidth * SCALE_COEF.get()) ?
          leftVal :
          (document.documentElement.clientWidth - this.bfWidth * SCALE_COEF.get()) :
          0;
      } else {
        this.bfLeft = 0;
      }

      if (document.documentElement.clientHeight < (this.bfHeight * SCALE_COEF.get())) {
        const topVal = (this.mousePosition.y + this.offset[1]);

        this.bfTop = topVal <=
          0 ?
          topVal >=
          (document.documentElement.clientHeight - this.bfHeight * SCALE_COEF.get()) ?
          topVal :
          (document.documentElement.clientHeight - this.bfHeight * SCALE_COEF.get()) :
          0;
      } else {
        this.bfTop = 0;
      }
    }
  }

  @action
  public onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    TRANSITION.set(0);
    if (e.deltaY < 0 && (SCALE_COEF.get() < MAX_SCALE)) {
      SCALE_COEF.set(SCALE_COEF.get() + 1);
    } else if (e.deltaY > 0 && (SCALE_COEF.get() > MIN_SCALE)) {
      SCALE_COEF.set(SCALE_COEF.get() - 1);
    }
  }

  @action
  public setBattlefieldSize(width: number, height: number): void {
    this.bfWidth = width;
    this.bfHeight = height;

    this.livingZone = new ZoneShape(
      new Point(0, 0),
      new Point(width - 1, height - 1)
    );
  }

  @action
  public setSimulationData(
    tankList: Tank[],
    bulletList: Bullet[],
    livingZone?: ZoneShape,
    finalZone?: ZoneShape
  ): void {
    TRANSITION.set(1);
    parseTanks(tankList, this.tankStoreList);
    parseBullets(bulletList, this.bulletStoreList);

    this.livingZone = livingZone;
    this.finalZone = finalZone;
  }
}

const parseTanks = (tankList: Tank[], tankStoreList: TankStore[]) => {
  if (tankStoreList.length === 0) {
    for (let i = 0; i < tankList.length; i++) {
      tankStoreList.push(new TankStore(
        tankList[i].id,
        tankList[i].x,
        tankList[i].y,
        tankList[i].health,
        tankList[i].direction
      ));
    }
  } else {
    for (let i = 0; i < tankList.length; i++) {
      tankStoreList[i].x = tankList[i].x;
      tankStoreList[i].y = tankList[i].y;
      tankStoreList[i].health = tankList[i].health;
      tankStoreList[i].direction = tankList[i].direction;
    }
  }
};

const parseBullets = (bulletList: Bullet[], bulletStoreList: BulletStore[]) => {
  bulletStoreList.length = 0;

  for (let i = 0; i < bulletList.length; i++) {
    bulletStoreList.push(new BulletStore(
      bulletList[i].id,
      bulletList[i].x,
      bulletList[i].y,
      bulletList[i].direction
    ));
  }
};

export const bfStore = new BattlefieldStore();
export type BattlefieldStoreType = BattlefieldStore;
