import * as React from 'react';
import {Link} from 'react-router-dom';
import './Index.css';


class Index extends React.Component {
  public render() {
    return (
      <div className='bt-main-menu__index-wrapper'>
        <h1 className='bt-main-menu__index-title'>Battle Tanks</h1>
        <ul className='bt-main-menu__index-options'>
          <li className='bt-main-menu__index-option-item'>
            <Link to='/game' className='bt-main-menu__index-options-link'>Start Game</Link>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <Link to='/main-menu/players' className='bt-main-menu__index-options-link'>Set Players</Link>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <Link to='/main-menu/options' className='bt-main-menu__index-options-link'>Options</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Index