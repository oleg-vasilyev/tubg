import { observer } from 'mobx-react';
import * as React from 'react';
import { SCALE_COEF, TRANSITION } from 'stores/battlefieldStore';
import { IBulletComponentProps } from '../propsInterfaces';
import './bulletComponent.css';

@observer
export class BulletComponent extends React.Component<IBulletComponentProps, {}> {
  public render() {
    const { bulletStore } = this.props;

    const topVal = bulletStore.y * SCALE_COEF.get();
    const leftVal = bulletStore.x * SCALE_COEF.get();

    const bulletStyle = {
      width: `${SCALE_COEF.get()}px`,
      height: `${SCALE_COEF.get()}px`,
      top: `${topVal}px`,
      left: `${leftVal}px`,
      transform: `rotate(${bulletStore.direction}deg)`,
      transition: `${TRANSITION.get()}s`
    };

    return (
      <div style={bulletStyle} className="bullet" />
    );
  }
}
