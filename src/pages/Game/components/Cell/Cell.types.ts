interface IBattleFieldCellContent {
  type: string,
  direction?: number,
  tankType?: number
}
type BattleFieldCell = Array<IBattleFieldCellContent | undefined>;

export default BattleFieldCell