import {OptionsInterface} from 'interfaces/OptionsInterface';


export const saveOptions = (options: OptionsInterface) => {
  localStorage.options = JSON.stringify(options);
}