import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnimatedGame } from 'View/pages/animatedGame/animatedGame';
import { MainMenu } from 'View/pages/MainMenu/MainMenu';
import './App.css';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route path='/main-menu' component={MainMenu} />
          <Route exact path='/game' component={AnimatedGame} />
        </Switch>
      </div>
    );
  }
}