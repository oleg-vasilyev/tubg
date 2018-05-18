import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Game from './pages/Game';
import MainMenu from './pages/MainMenu';
import Header from './components/Header';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path='/game' component={Game} />
          <Route path='/main-menu' component={MainMenu} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App