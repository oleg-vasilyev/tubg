import { observer } from 'mobx-react';
import * as React from 'react';
import { ITankComponentProps } from '../propsInterfaces';
import './tankComponent.css';

@observer
export class TankComponent extends React.Component<ITankComponentProps, {}> {
  public render() {
    const { tankStore } = this.props;

    const tankDeadClassName: string = (tankStore.health <= 0) ? ' tank_dead' : '';

    const tankStyle = {
      width: `${tankStore.tankStyle.width}px`,
      height: `${tankStore.tankStyle.height}px`,
      top: `${tankStore.tankStyle.top}px`,
      left: `${tankStore.tankStyle.left}px`,
      transform: `rotate(${tankStore.tankStyle.transform}deg)`,
      transition: `${tankStore.tankStyle.transition}s`
    };

    return (
      <div style={tankStyle} className={'tank' + tankDeadClassName} />
    );
  }
}
