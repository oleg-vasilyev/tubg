import { ZoneShape } from '../zone/zoneShape';
import { Bullet } from './Bullet';
import { Tank } from './tank';

export class RendererDataContainer {
  public tankList: Tank[];
  public bulletList: Bullet[];
  public currentZoneShape: ZoneShape;
  public finalZoneShape: ZoneShape;

  public constructor(
    tankList: Tank[],
    bulletList: Bullet[],
    currentZoneShape: ZoneShape,
    finalZoneShape: ZoneShape
  ) {
    this.tankList = tankList;
    this.bulletList = bulletList;
    this.currentZoneShape = currentZoneShape;
    this.finalZoneShape = finalZoneShape;
  }
}
