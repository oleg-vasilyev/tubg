import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IBattlefieldProps } from '../propsInterfaces';
import './finalArea.css';

@inject('bfStore')
@observer
export class FinalArea extends React.Component<IBattlefieldProps, {}> {
  public render() {
    const { bfStore } = this.props;

    const finalAreaStyle = (bfStore.finalAreaStyle != null) ?
      {
        width: `${bfStore.finalAreaStyle.width}px`,
        height: `${bfStore.finalAreaStyle.height}px`,
        top: `${bfStore.finalAreaStyle.top}px`,
        left: `${bfStore.finalAreaStyle.left}px`,
        transition: `${bfStore.finalAreaStyle.transition}s`
      } :
      {
        display: 'none'
      };

    return (
      <div className="final-area" style={finalAreaStyle} />
    );
  }
}
