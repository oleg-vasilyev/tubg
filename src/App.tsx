import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
// Import styles
import './App.css';
// Import pages
import GamePage from './pages/Game/Game';
import MainMenuPage from './pages/MainMenu/MainMenu';

class App extends React.Component {
 	public render() {
    return (
			<React.Fragment>
				<BrowserRouter>
					<Switch>
						<Redirect exact={true} from='/' to='/main-menu' />
						<Route path='/main-menu' component={MainMenuPage} />
						<Route path='/game' component={GamePage} />
					</Switch>
				</BrowserRouter>
			</React.Fragment>
		);
  }
}

export default App