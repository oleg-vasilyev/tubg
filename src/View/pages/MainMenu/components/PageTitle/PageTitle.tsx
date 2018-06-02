import * as React from 'react';
import './PageTitle.css';

export class PageTitle extends React.PureComponent {
  public render() {
    return (
      <h2 className='bt-main-menu__page-title'>{this.props.children}</h2>
    );
  }
}
