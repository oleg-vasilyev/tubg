import { OptionsInterface } from 'interfaces/OptionsInterface';
import { ZoneShape } from 'src/zone/zoneShape';
import { BattlefieldStoreType } from 'stores/battlefieldStore';
import { BulletStoreType } from 'stores/bulletStore';
import { TankStoreType } from 'stores/tankStore';

export interface IBattlefieldProps {
  bfStore?: BattlefieldStoreType;
  options: OptionsInterface;
}

export interface IAreaProps {
  zone: ZoneShape;
  type: string;
}

export interface ITankComponentProps {
  tankStore?: TankStoreType;
}

export interface IBulletComponentProps {
  bulletStore?: BulletStoreType;
}
