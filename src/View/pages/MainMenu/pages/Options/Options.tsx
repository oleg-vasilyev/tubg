import * as React from 'react';
import {observer} from 'mobx-react';

import {PageTitle} from './../../components/PageTitle/PageTitle';
import {SubTitle} from './../../components/SubTitle/SubTitle';
import {InputOption} from './components/InputOption/InputOption';

import {optionsStore} from 'stores/OptionsStore';

import {OptionsInterface} from 'interfaces/OptionsInterface';


@observer
export class Options extends React.Component {

  private handleOptionChange = (e: any) => {
    const optionName = e.target.name;
    const optionValue = e.target.value;
    optionsStore.setOption(optionName, optionValue);
  }

  public render() {
    return (
      <div className='bt-main-menu__options'>
        <PageTitle>Options</PageTitle>
        <SubTitle>Field configurations</SubTitle>
        <ul className='bt-main-menu__options-option-group'>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Field width' name='battleFieldWidth' value={optionsStore.options.battleFieldWidth} onChange={this.handleOptionChange} />
          </li>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Field height' name='battleFieldHeight' value={optionsStore.options.battleFieldHeight} onChange={this.handleOptionChange} />
          </li>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Deth zone speed' name='speedOfDethZone' value={optionsStore.options.speedOfDethZone} onChange={this.handleOptionChange} />
          </li>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Deth zone stop area' name='dethZoneStopAreaSize' value={optionsStore.options.dethZoneStopAreaSize} onChange={this.handleOptionChange} />
          </li>
        </ul>
        <SubTitle>Objects configurations</SubTitle>
        <ul className='bt-main-menu__options-option-group'>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Tank speed' name='tankSpeed' value={optionsStore.options.tankSpeed} onChange={this.handleOptionChange} />
          </li>
          <li className='bt-main-menu__options-option'>
            <InputOption title='Bullet speed' name='bulletSpeed' value={optionsStore.options.bulletSpeed} onChange={this.handleOptionChange} />
          </li>
        </ul>
      </div>
    );
  }
}