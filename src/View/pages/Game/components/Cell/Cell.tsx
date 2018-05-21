import * as React from 'react';
import {getUniqId} from './../../../../helper-functions/getUniqId';
import {BattleFieldCell} from './Cell.types';
import './Cell.css';

const getCellClass = (type: string) => {
  const cellClass = `bt-battle-field__cell-content bt-battle-field__cell-content_${type}`;
  return cellClass
}

const getCellRotateStyle = (direction: number) => {
  const angle = direction;
  const rotateStyle = {
    transform: `rotate(${angle}deg)`
  }
  return rotateStyle;
}

export const Cell = (props: {children: BattleFieldCell}) => {
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

        return (
          <div style={rotateStyle} className={getCellClass(content.type)} key={getUniqId()} />
        )
      })}
    </div>
  )
}