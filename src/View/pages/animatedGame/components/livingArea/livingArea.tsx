import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IBattlefieldProps } from '../propsInterfaces';
import './livingArea.css';

@inject('bfStore')
@observer
export class LivingArea extends React.Component<IBattlefieldProps, {}> {
  public render() {
    const { bfStore } = this.props;

    const livingAreaStyle = {
      width: `${bfStore.livingAreaStyle.width}px`,
      height: `${bfStore.livingAreaStyle.height}px`,
      top: `${bfStore.livingAreaStyle.top}px`,
      left: `${bfStore.livingAreaStyle.left}px`,
      backgroundPosition: `-${bfStore.livingAreaStyle.left}px -${bfStore.livingAreaStyle.top}px`,
      transition: `${bfStore.livingAreaStyle.transition}s`
    };

    return (
      <div className="living-area" style={livingAreaStyle} />
    );
  }
}
