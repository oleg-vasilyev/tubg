import * as React from 'react';

import {optionsValidation} from 'stores/OptionsStore';

const s: {[props: string]: string} = require('./RangeOption.css');


interface RangeOptionPropsInterface {
  title: string;
  onChange: (event: any) => void;
  name: string;
  value: number | string;
}
export class RangeOption extends React.Component<RangeOptionPropsInterface> {
  public render() {
    const title = this.props.title;
    const onChange = this.props.onChange;
    const name = this.props.name;
    const value = this.props.value;
    return (
      <div className='bt-range-option'>
        <div className='bt-range-option__title'>{title}</div>
        <input onChange={onChange} value={value} min={optionsValidation[name].range.min} max={optionsValidation[name].range.max} name={name} className='bt-range-option__input' type='range' />
      </div>
    );
  }
}