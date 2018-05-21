import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Game from './View/pages/Game/Game';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Switch>
          <Route path='/game' component={Game} />
        </Switch>
      </div>
    );
  }
}

export default App