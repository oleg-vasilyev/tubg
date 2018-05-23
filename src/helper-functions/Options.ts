interface IOptions {
  [name: string]: string | undefined
}

const getOptions = () => {
  let options: IOptions;
  try {
    options = JSON.parse(localStorage.options);
    if (typeof options !== 'object'){
      throw new Error('Type of options must be object!');
    }
  } catch (e){
    localStorage.options = '{}';
    options = {}
  }
  return options;
}

export const getOption = (optionName: string): string => {
  const options = getOptions();
  const option = options[optionName];
  return option;
}

export const setOption = (optionName: string, value: string): void => {
  const options = getOptions();
  options[optionName] = value;
  localStorage.options = JSON.stringify(options);
}