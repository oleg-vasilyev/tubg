import * as React from 'react';
import getUniqId from './../../../helper-functions/getUniqId';
import './BattleField.css';
import IBattleField from './BattleField.types';
import Cell from './Cell/Cell';


class BattleField extends React.PureComponent<IBattleField> {
  public render() {
    const field = this.props.field;
    return (
      <div className='bt-battle-field'>
        <div className='bt-battle-field__wrapper'>
          <div className='bt-battle-field__content'>
            {field.map(row => <div className='bt-battle-field__row' key={getUniqId()}>
              {row.map(cell => <Cell key={getUniqId()}>{cell}</Cell>)}
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default BattleField