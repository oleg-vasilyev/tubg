import * as React from 'react';
import './PageTitle.css';

class PageTitle extends React.Component {
  public render() {
    return (
      <h2 className='bt-main-menu__page-title'>{this.props.children}</h2>
    );
  }
}

export default PageTitle