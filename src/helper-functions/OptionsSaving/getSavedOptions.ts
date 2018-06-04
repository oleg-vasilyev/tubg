import {OptionsInterface} from 'interfaces/OptionsInterface';


export const getSavedOptions = () => {
  const optionsStr = localStorage.options;
  let options: OptionsInterface;

  try {
    options = JSON.parse(optionsStr);
  } catch {
    options = undefined
  }

  return options
}