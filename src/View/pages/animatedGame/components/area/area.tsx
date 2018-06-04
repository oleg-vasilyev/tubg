import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IAreaProps } from '../propsInterfaces';
import './area.css';

@inject('bfStore')
@observer
export class Area extends React.Component<IAreaProps, {}> {
  public render() {
    const { bfStore, type } = this.props;

    let style = {};

    if (type === 'living') {
      style = {
        width: `${bfStore.livingAreaStyle.width}px`,
        height: `${bfStore.livingAreaStyle.height}px`,
        top: `${bfStore.livingAreaStyle.top}px`,
        left: `${bfStore.livingAreaStyle.left}px`,
        backgroundPosition: `-${bfStore.livingAreaStyle.left}px -${bfStore.livingAreaStyle.top}px`,
        transition: `${bfStore.livingAreaStyle.transition}s`
      };
    } else if (type === 'final') {
      style = (bfStore.finalAreaStyle != null) ?
      {
        width: `${bfStore.finalAreaStyle.width}px`,
        height: `${bfStore.finalAreaStyle.height}px`,
        top: `${bfStore.finalAreaStyle.top}px`,
        left: `${bfStore.finalAreaStyle.left}px`
      } :
      {
        display: 'none'
      };
    }

    return (
      <div className={type + '-area'} style={style} />
    );
  }
}
