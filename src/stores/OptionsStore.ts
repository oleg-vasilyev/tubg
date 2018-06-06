import {observable, action, autorun, toJS} from 'mobx';

import {OptionsInterface} from 'interfaces/OptionsInterface';

import {getSavedOptions} from 'helper-functions/OptionsSaving/getSavedOptions';
import {saveOptions} from 'helper-functions/OptionsSaving/saveOptions';


interface optionsValidationInterface {
  [option: string]: {
    defaultValue: number | string;
    type: 'integer' | 'float' | 'string';
    range?: {
      min?: number;
      max?: number;
    },
    subject: 'Object' | 'Dethzone' | 'Field',
    name: string
  }
}
export const optionsValidation: optionsValidationInterface = {
  battleFieldWidth: {
    defaultValue: 50,
    type: 'integer',
    range: {
      min: 0,
      max: 1000
    },
    subject: 'Field',
    name: 'Battle field width'
  },
  battleFieldHeight: {
    defaultValue: 50,
    type: 'integer',
    range: {
      min: 0,
      max: 1000
    },
    subject: 'Field',
    name: 'Battle field height'
  },
  tankSpeed: {
    defaultValue: 1,
    type: 'integer',
    range: {
      min: 0,
      max: 1000
    },
    subject: 'Object',
    name: 'Tank speed'
  },
  bulletSpeed: {
    defaultValue: 1,
    type: 'integer',
    range: {
      min: 0,
      max: 1000
    },
    subject: 'Object',
    name: 'Bullet speed'
  },
  speedOfDethZone: {
    defaultValue: 3,
    type: 'integer',
    range: {
      min: 0,
      max: 1000
    },
    subject: 'Dethzone',
    name: 'Speed of deth zone'
  },
  dethZoneStopAreaSize: {
    defaultValue: 1,
    type: 'integer',
    range: {
      min: 0,
      max: 1000
    },
    subject: 'Dethzone',
    name: 'Deth zone stop area'
  },
  dethZoneShrinkScale: {
    defaultValue: 1,
    type: 'float',
    range: {
      min: 1,
      max: 1000
    },
    subject: 'Dethzone',
    name: 'Deth zone shrink scale'
  }
}

type isOptionValid = (optionName: string, optionValue: number | string) => boolean;
export const isOptionValid: isOptionValid = (optionName, optionValue) => {
  let isValid = false;
  if (optionName in optionsValidation){
    const type = optionsValidation[optionName].type;
    if (type === 'integer' || type === 'float'){
      const min = optionsValidation[optionName].range.min;
      const max = optionsValidation[optionName].range.max;
      const minCond = min ? optionValue >= min : true;
      const maxCond = max ? optionValue <= max : true;
      isValid = minCond && maxCond;
    }
  }
  return isValid
}

type getValidatedSavedOptionsType = () => OptionsInterface;
const getValidatedSavedOptions = () => {
  const savedOptions = getSavedOptions();
  // Remove invalid options
  for (let savedOption in savedOptions){
    if (!isOptionValid(savedOption, savedOptions[savedOption])){
      delete savedOptions[savedOption];
    }
  }
  // Add default options
  for (let option in optionsValidation){
    if (!(option in savedOptions)){
      savedOptions[option] = optionsValidation[option].defaultValue;
    }
  }
  return savedOptions
}


class OptionsStore {

  @observable public options: OptionsInterface = getValidatedSavedOptions()

  @action.bound public setOption(optionName: string, optionValue: string | number) {
    if (isOptionValid(optionName, optionValue)){
      this.options[optionName] = optionValue;
    }
  }

}

export const optionsStore = new OptionsStore();

autorun(() => {
  saveOptions(toJS(optionsStore.options));
})