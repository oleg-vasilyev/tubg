import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {GamePage} from './View/pages/Game/Game';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route path='/game' component={GamePage} />
        </Switch>
      </div>
    );
  }
}