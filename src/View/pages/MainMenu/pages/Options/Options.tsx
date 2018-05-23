import * as React from 'react';
// Import components
import {PageTitle} from './../../components/PageTitle/PageTitle';
import {SubTitle} from './../../components/SubTitle/SubTitle';
import {InputOption} from './components/InputOption/InputOption';
import {getOption} from './../../../../../helper-functions/Options';
import {setOption} from './../../../../../helper-functions/Options';

interface IOptionsState {
  options: {[name: string]: string}
}

export class Options extends React.PureComponent<null, IOptionsState> {
  state: IOptionsState = {
    options: {
      fieldSize: getOption('fieldSize') || '',
      dethZoneSpeed: getOption('dethZoneSpeed') || '',
      dethZoneStopArea: getOption('dethZoneStopArea') || '',
      tankSpeed: getOption('tankSpeed') || '',
      bulletSpeed: getOption('bulletSpeed') || ''
    }
  }

  handleOptionChange = (e: any) => {
    const newOptions: any = {...this.state.options};
    newOptions[e.target.name] = e.target.value;
    setOption(e.target.name, e.target.value);
    this.setState({options: newOptions});
  }

  public render() {
    return (
      <div className='bt-main-menu__options'>
        <PageTitle>Options</PageTitle>
        <SubTitle>Field configurations</SubTitle>
        <ul className='bt-main-menu__options-option-group'>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Field size' name='fieldSize' value={this.state.options.fieldSize} onChange={this.handleOptionChange} />
          </li>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Deth zone speed' name='dethZoneSpeed' value={this.state.options.dethZoneSpeed} onChange={this.handleOptionChange} />
          </li>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Deth zone stop area' name='dethZoneStopArea' value={this.state.options.dethZoneStopArea} onChange={this.handleOptionChange} />
          </li>
        </ul>
        <SubTitle>Objects configurations</SubTitle>
        <ul className='bt-main-menu__options-option-group'>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Tank speed' name='tankSpeed' value={this.state.options.tankSpeed} onChange={this.handleOptionChange} />
          </li>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Bullet speed' name='bulletSpeed' value={this.state.options.bulletSpeed} onChange={this.handleOptionChange} />
          </li>
        </ul>
      </div>
    );
  }
}