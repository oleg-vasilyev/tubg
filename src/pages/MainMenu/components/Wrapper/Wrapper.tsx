import * as React from 'react';
// Import styles
import './Wrapper.css';

class Wrapper extends React.Component {
  public render() {
    return (
			<div className='bt-main-menu__wrapper'>
				<div className='bt-main-menu__wrapper-content'>
					{this.props.children}
				</div>
			</div>
		);
  }
}

export default Wrapper