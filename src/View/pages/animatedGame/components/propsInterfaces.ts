import { BattlefieldStoreType } from 'stores/battlefieldStore';
import { BulletStoreType } from 'stores/bulletStore';
import { TankStoreType } from 'stores/tankStore';

export interface IBattlefieldProps {
  bfStore?: BattlefieldStoreType;
}

export interface ITankComponentProps {
  tankStore?: TankStoreType;
}

export interface IBulletComponentProps {
  bulletStore?: BulletStoreType;
}
