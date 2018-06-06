import * as React from 'react';
import {Observer} from 'mobx-react';

import {PageTitle} from './../../components/PageTitle/PageTitle';
import {SubTitle} from './../../components/SubTitle/SubTitle';
import {InputOption} from './components/InputOption/InputOption';
import {RangeOption} from './components/RangeOption/RangeOption';

import {optionsStore} from 'stores/OptionsStore';
import {optionsValidation} from 'stores/OptionsStore';
import {isOptionValid} from 'stores/OptionsStore';

import {OptionsInterface} from 'interfaces/OptionsInterface';

import {getUniqId} from 'View/helper-functions/getUniqId';


export class Options extends React.Component {

  private handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionName = e.target.name;
    let optionValue: number | string = e.target.value;
    if ('max' in optionsValidation[optionName].range && +optionValue > optionsValidation[optionName].range.max){
      optionValue = optionsValidation[optionName].range.max
    }
    optionsStore.setOption(optionName, optionValue);
  }

  public render() {
    const options = Object.keys(optionsStore.options);
    options.sort((a, b) => {
      interface optionsPriorityInterface {
        [subj: string]: number
      }
      const optionsPriority: optionsPriorityInterface = {
        Field: 0,
        Object: 1,
        Dethzone: 2
      }
      const aPriority = optionsPriority[optionsValidation[a].subject];
      const bPriority = optionsPriority[optionsValidation[b].subject];
      return aPriority - bPriority
    });
    let prevSubj = '';
    return (
      <div className='bt-main-menu__options'>
        <PageTitle>Options</PageTitle>
        {
          options.map(option => {
            const subject = optionsValidation[option].subject;
            let subjTitle: null | JSX.Element = null;
            if (subject !== prevSubj){
              prevSubj = subject;
              subjTitle = <SubTitle>{subject}</SubTitle>
            }
            return (
              <React.Fragment key={getUniqId()}>
                {subjTitle}
                {
                  <Observer>
                    {
                      () => <InputOption
                        onChange={this.handleOptionChange}
                        name={option}
                        value={optionsStore.options[option]}
                        title={optionsValidation[option].name}
                      />
                    }
                  </Observer>
                }
              </React.Fragment>
            )
          })
        }
      </div>
    );
  }
}