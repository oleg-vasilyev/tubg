import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import {MainMenu} from 'View/pages/MainMenu/MainMenu';
import {Game} from 'View/pages/Game/Game';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route path='/main-menu' component={MainMenu} />
          <Route exact path='/game' component={Game} />
        </Switch>
      </div>
    );
  }
}