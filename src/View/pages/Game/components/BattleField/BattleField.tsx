import * as React from 'react';
import {getUniqId} from './../../../../helper-functions/getUniqId';
import './BattleField.css';
import {IBattleFieldProps, IBattleFieldState, BattleFieldType} from './BattleField.types';
import {Cell} from './../Cell/Cell';
import {BattleFieldCell} from './../Cell/Cell.types';


export class BattleField extends React.Component<IBattleFieldProps, IBattleFieldState> {
  state: IBattleFieldState = {
    battleField: []
  }

  static getDerivedStateFromProps(nextProps: IBattleFieldProps, prevState: IBattleFieldState){
    let battleField: BattleFieldType = [];
    for (let y = 0; y < nextProps.size[0]; y++){
      battleField[y] = [];
      for (let x = 0; x < nextProps.size[1]; x++){
        battleField[y][x] = []
      }
    }
    // Set tanks
    nextProps.tanks.forEach(tank => {
      const cellContent = {
        type: 'tank',
        direction: tank.direction
      }
      battleField[tank.y - 1][tank.x - 1].push(cellContent)
    });
    // Set bullets
    nextProps.bullets.forEach(bullet => {
      const cellContent = {
        type: 'bullet',
        direction: bullet.direction
      }
      battleField[bullet.y - 1][bullet.x - 1].push(cellContent)
    });
    // Set deth zone
    battleField.forEach((row, y) => {
      row.forEach((cell: any, x: number) => {
        if (
          y < nextProps.deth.y1 - 1 ||
          y > nextProps.deth.y2 - 1 ||
          x < nextProps.deth.x1 - 1 ||
          x > nextProps.deth.x2 - 1
        ){
          const cellContent = {
            type: 'deth'
          }
          battleField[y][x].push(cellContent);
        }
      })
    })
    return {battleField: battleField}
  }

  public render() {
    const battleField = this.state.battleField;
    return (
      <div className='bt-battle-field'>
        <div className='bt-battle-field__content'>
          {battleField.map(row => <div className='bt-battle-field__row' key={getUniqId()}>
            {row.map((cell: BattleFieldCell) => <Cell key={getUniqId()}>{cell}</Cell>)}
          </div>)}
        </div>
      </div>
    );
  }
}