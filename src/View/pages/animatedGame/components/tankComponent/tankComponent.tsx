import { observer } from 'mobx-react';
import * as React from 'react';
import { scaleCoef, transition } from 'stores/battlefieldStore';
import { ITankComponentProps } from '../propsInterfaces';
import './tankComponent.css';

@observer
export class TankComponent extends React.Component<ITankComponentProps, {}> {
  public render() {
    const { tankStore } = this.props;

    const topVal = tankStore.y * scaleCoef.get();
    const leftVal = tankStore.x * scaleCoef.get();
    const angleVal = tankStore.health <= 0 ? 0 : tankStore.direction;

    const tankStyle = {
      width: `${scaleCoef.get()}px`,
      height: `${scaleCoef.get()}px`,
      top: `${topVal}px`,
      left: `${leftVal}px`,
      transform: `rotate(${angleVal}deg)`,
      transition: `${transition.get()}s`
    };

    const tankDeadClassName: string = (tankStore.health <= 0) ? ' tank_dead' : '';

    return (
      <div style={tankStyle} className={'tank' + tankDeadClassName} />
    );
  }
}
