import * as React from 'react';
import {Link} from 'react-router-dom';
import {BattleField} from './components/BattleField/BattleField';
import {IBattleFieldProps} from './components/BattleField/BattleField.types';
import './Game.css';


// Test Field Generator Function
const blankField = () => {
  const battleField: IBattleFieldProps = {
    size: [20, 30],
    tanks: [
      {
        x: 10,
        y: 15,
        direction: 90
      },
      {
        x: 11,
        y: 4,
        direction: 180
      }
    ],
    bullets: [
      {
        x: 8,
        y: 14,
        direction: 0
      }
    ],
    deth: {
      x1: 4,
      x2: 15,
      y1: 2,
      y2: 18
    }
  }

  return battleField
}

export class Game extends React.Component {
  public render() {
    return (
      <div className='bt-game'>
        <BattleField {...blankField()} />
      </div>
    );
  }
}