import { observer } from 'mobx-react';
import * as React from 'react';
import { scaleCoef, transition } from 'stores/battlefieldStore';
import { IBulletComponentProps } from '../propsInterfaces';
import './bulletComponent.css';

@observer
export class BulletComponent extends React.Component<IBulletComponentProps, {}> {
  public render() {
    const { bulletStore } = this.props;

    const topVal = bulletStore.y * scaleCoef.get();
    const leftVal = bulletStore.x * scaleCoef.get();

    const bulletStyle = {
      width: `${scaleCoef.get()}px`,
      height: `${scaleCoef.get()}px`,
      top: `${topVal}px`,
      left: `${leftVal}px`,
      transform: `rotate(${bulletStore.direction}deg)`,
      transition: `${transition.get()}s`
    };

    return (
      <div style={bulletStyle} className="bullet" />
    );
  }
}
