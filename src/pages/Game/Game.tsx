import * as React from 'react';
import {Link} from 'react-router-dom';
import BattleField from './components/BattleField';
import './Game.css';


// Test Field Generator Function
const blankField = (size: [number, number]) => {
  const field: any[][] = [];
  for (let i = 0; i < size[0]; i++){
    field[i] = [];
    for (let j = 0; j < size[1]; j++){
      field[i][j] = [];
    }
  }
  field[3][4] = [{
    direction: 2,
    tankType: 5,
    type: 'tank'
  }];
  field[4][8] = [{
    direction: 0,
    type: 'bullet'
  }];
  field[6][3] = [{
    type: 'deth'
  }];
  return field;
}

class GamePage extends React.Component {
  public render() {
    return (
      <div className='bt-game'>
        <div className='bt-game__content'>
          <BattleField field={blankField([30, 40])} />
          <Link to='/' className='bt-game__content-mm-link'>Go to Main Menu</Link>
        </div>
      </div>
    );
  }
}

export default GamePage