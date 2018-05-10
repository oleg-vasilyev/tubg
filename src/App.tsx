import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import GamePage from './pages/Game/Game';
import MainMenuPage from './pages/MainMenu/MainMenu';

class App extends React.Component {
  public render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact={true} from='/' to='/main-menu' />
            <Route path='/main-menu' component={MainMenuPage} />
            <Route path='/game' component={GamePage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App