import * as React from 'react';
import getUniqId from './../../../../helper-functions/getUniqId';
import BattleFieldCell from './Cell.types';

const getCellClass = (type: string) => {
  const cellClass = `bt-battle-field__cell-content bt-battle-field__cell-content_${type}`;
  return cellClass
}

const getCellRotateStyle = (direction: number) => {
  let angle: number;
  switch (direction){
    case 0:
      angle = 0;
      break;
    case 1:
      angle = 90;
      break;
    case 2:
      angle = 180;
      break;
    case 3:
      angle = 270;
    default:
      throw new Error('Specify correct cell content direction! (from 0 to 3)');
  }
  const rotateStyle = {
    transform: `rotate(${angle}deg)`
  }
  return rotateStyle;
}

const Cell = (props: {children: BattleFieldCell}) => {
  return (
    <div className='bt-battle-field__cell'>
      {props.children.map(content => {
        if (content === undefined) {
          return null;
        }

        let rotateStyle = {};
        if (content.direction){
          rotateStyle = getCellRotateStyle(content.direction);
        }

        let tankTypeClass = '';
        if (content.tankType){
          tankTypeClass = ` bt-battle-field__cell-content_tank-${content.tankType}`;
        }

        return (
          <div style={rotateStyle} className={getCellClass(content.type)+tankTypeClass} key={getUniqId()} />
        )
      })}
    </div>
  )
}

export default Cell