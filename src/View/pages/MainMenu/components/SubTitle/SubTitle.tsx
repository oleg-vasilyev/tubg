import * as React from 'react';
import './SubTitle.css';

export class SubTitle extends React.Component {
  public render() {
    return (
      <h3 className='bt-main-menu__subtitle'>{this.props.children}</h3>
    );
  }
}