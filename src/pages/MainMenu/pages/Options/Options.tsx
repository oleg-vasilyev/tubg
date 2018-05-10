import * as React from 'react';
// Import components
import PageTitle from './../../components/PageTitle/PageTitle';
import SubTitle from './../../components/SubTitle/SubTitle';

class Options extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <PageTitle>Options</PageTitle>
        <SubTitle>Option group</SubTitle>
        <ul className='bt-main-menu__index-options'>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Start Game</a>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Set Players</a>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Options</a>
          </li>
        </ul>
        <SubTitle>Option group</SubTitle>
        <ul className='bt-main-menu__index-options'>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Start Game</a>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Set Players</a>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Options</a>
          </li>
        </ul>
        <SubTitle>Option group</SubTitle>
        <ul className='bt-main-menu__index-options'>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Start Game</a>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Set Players</a>
          </li>
          <li className='bt-main-menu__index-option-item'>
            <a className='bt-main-menu__index-options-link'>Options</a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Options