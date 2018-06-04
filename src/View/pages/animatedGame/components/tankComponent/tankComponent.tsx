import { observer } from 'mobx-react';
import * as React from 'react';
import { SCALE_COEF, TRANSITION } from 'stores/battlefieldStore';
import { ITankComponentProps } from '../propsInterfaces';
import './tankComponent.css';

@observer
export class TankComponent extends React.Component<ITankComponentProps, {}> {
  public render() {
    const { tankStore } = this.props;

    const topVal = tankStore.y * SCALE_COEF.get();
    const leftVal = tankStore.x * SCALE_COEF.get();
    const angleVal = tankStore.health <= 0 ? 0 : tankStore.direction;

    const tankStyle = {
      width: `${SCALE_COEF.get()}px`,
      height: `${SCALE_COEF.get()}px`,
      top: `${topVal}px`,
      left: `${leftVal}px`,
      transform: `rotate(${angleVal}deg)`,
      transition: `${TRANSITION.get()}s`
    };

    const tankDeadClassName: string = (tankStore.health <= 0) ? ' tank_dead' : '';

    return (
      <div style={tankStyle} className={'tank' + tankDeadClassName} />
    );
  }
}
