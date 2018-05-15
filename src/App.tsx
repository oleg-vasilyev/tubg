import * as React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Game from './pages/Game';
import MainMenu from './pages/MainMenu';

class App extends React.Component {
  public render() {
    return (
      <div>
        <ul>
          <li><Link to='/game'>Game</Link></li>
          <li><Link to='/main-menu'>MainMenu</Link></li>
        </ul>
        <Switch>
          <Route path='/game' component={Game} />
          <Route path='/main-menu' component={MainMenu} />
        </Switch>
      </div>
    );
  }
}

export default App