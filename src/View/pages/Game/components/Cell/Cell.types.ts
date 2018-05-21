interface IBattleFieldCellContent {
  type: string,
  direction?: number
}
export type BattleFieldCell = Array<IBattleFieldCellContent | undefined>;