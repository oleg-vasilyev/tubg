import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Game from './pages/Game';
import MainMenu from './pages/MainMenu';
import Header from './components/Header';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/game' component={Game} />
          <Route path='/main-menu' component={MainMenu} />
        </Switch>
      </div>
    );
  }
}

export default App