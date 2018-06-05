import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './MainMenu.css';
import {Index} from './pages/Index/Index';
import {Options} from './pages/Options/Options';
import {Players} from './pages/Players/Players';


export class MainMenu extends React.Component {
  public render() {
    return (
      <div className='bt-main-menu'>
        <div className='bt-main-menu__wrapper'>
          <div className='bt-main-menu__content'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/options' component={Options} />
              <Route exact path='/players' component={Players} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}