import {observable, action, autorun, toJS} from 'mobx';

import {OptionsInterface} from 'interfaces/OptionsInterface';

import {getSavedOptions} from 'helper-functions/OptionsSaving/getSavedOptions';
import {saveOptions} from 'helper-functions/OptionsSaving/saveOptions';


const defaultOptions: OptionsInterface = {
  battleFieldWidth: 50,
  battleFieldHeight: 50,
  speedOfDethZone: 3,
  dethZoneStopAreaSize: 0,
  tankSpeed: 1,
  bulletSpeed: 1
}

const isOptionValid = (optionName: string, optionValue: number) => {
  if (!(optionName in defaultOptions) || isNaN(optionValue)) return false;

  switch (optionName){
    case 'battleFieldWidth':
    case 'battleFieldHeight':
      if (optionValue > 10000) return false;
      break;
    case 'tankSpeed':
      if (optionValue < 1) return false;
      break;
  }

  return true
}

let options = (function (){
  let savedOptions = getSavedOptions();
  if (typeof savedOptions === 'object'){
    for (let savedOption in savedOptions){
      if (!(savedOption in defaultOptions)){
        delete savedOptions[savedOption]
      }
    }
    for (let defaultOption in defaultOptions){
      if (!isOptionValid(defaultOption, savedOptions[defaultOption])){
        savedOptions[defaultOption] = defaultOptions[defaultOption];
      }
    }
  } else {
    savedOptions = defaultOptions
  }
  return savedOptions
})();


class OptionsStore {

  @observable public options: OptionsInterface = options

  @action.bound public setOption(optionName: string, optionValueStr: string) {
    const optionValue = +optionValueStr;
    if (isOptionValid(optionName, optionValue)){
      this.options[optionName] = optionValue;
    }
  }

}

export const optionsStore = new OptionsStore();

autorun(() => {
  saveOptions(toJS(optionsStore.options));
})