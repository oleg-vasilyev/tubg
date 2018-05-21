import {BattleFieldCell} from './../Cell/Cell.types';

interface IDeth {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
interface IObjectWithDirection {
  x: number;
  y: number;
  direction: number;
}
export interface IBattleFieldProps {
  size: [number, number];
  tanks: IObjectWithDirection[];
  bullets: IObjectWithDirection[];
  deth: IDeth;
}


export type BattleFieldType = Array<Array<BattleFieldCell>>
export interface IBattleFieldState {
  battleField: BattleFieldType
}