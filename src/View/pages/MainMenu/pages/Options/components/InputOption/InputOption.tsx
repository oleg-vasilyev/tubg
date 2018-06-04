import * as React from 'react';
import './InputOption.css';

interface InputOptionProps {
  title?: string;
  onChange?: (event: any) => void;
  name: string;
  value: number;
}

export class InputOption extends React.Component<InputOptionProps> {
  public render() {
    return (
      <div className='bt-input-option'>
        <div className='bt-input-option__title'>{this.props.title}</div>
        <input onChange={this.props.onChange} value={this.props.value} name={this.props.name} className='bt-input-option__input' />
      </div>
    );
  }
}