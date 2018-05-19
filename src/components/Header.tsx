import * as React from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.PureComponent {
  public render() {
    return (
      <div>
        <ul>
          <li><NavLink to='/game'>Game</NavLink></li>
          <li><NavLink to='/main-menu'>MainMenu</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Header