import { observer } from 'mobx-react';
import * as React from 'react';
import { IBulletComponentProps } from '../propsInterfaces';
import './bulletComponent.css';

@observer
export class BulletComponent extends React.Component<IBulletComponentProps, {}> {
  public render() {
    const { bulletStore } = this.props;

    const bulletStyle = {
      width: `${bulletStore.bulletStyle.width}px`,
      height: `${bulletStore.bulletStyle.height}px`,
      top: `${bulletStore.bulletStyle.top}px`,
      left: `${bulletStore.bulletStyle.left}px`,
      transform: `rotate(${bulletStore.bulletStyle.transform}deg)`,
      transition: `${bulletStore.bulletStyle.transition}s`
    };

    return (
      <div style={bulletStyle} className="bullet" />
    );
  }
}
