import { BattlefieldStoreType } from 'stores/battlefieldStore';
import { BulletStoreType } from 'stores/bulletStore';
import { TankStoreType } from 'stores/tankStore';
import { ZoneShape } from './../../../../zone/zoneShape';

export interface IBattlefieldProps {
  bfStore?: BattlefieldStoreType;
}

export interface IAreaProps {
  bfStore?: BattlefieldStoreType;
  zone: ZoneShape;
  type: string;
}

export interface ITankComponentProps {
  tankStore?: TankStoreType;
}

export interface IBulletComponentProps {
  bulletStore?: BulletStoreType;
}
