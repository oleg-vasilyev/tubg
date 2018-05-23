import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './MainMenu.css';
import {Index} from './pages/Index/Index';
import {Options} from './pages/Options/Options';
import {Players} from './pages/Players/Players';


export class MainMenu extends React.PureComponent {
  public render() {
    return (
      <div className='bt-main-menu'>
        <div className='bt-main-menu__wrapper'>
          <div className='bt-main-menu__content'>
            <Switch>
              <Route exact={true} path='/main-menu/' component={Index} />
              <Route exact={true} path='/main-menu/options' component={Options} />
              <Route exact={true} path='/main-menu/players' component={Players} />
              <Redirect from='/main-menu/' to='/main-menu/' />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}