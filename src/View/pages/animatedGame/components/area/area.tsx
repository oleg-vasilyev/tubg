import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { SCALE_COEF, TRANSITION } from 'stores/battlefieldStore';
import { IAreaProps } from '../propsInterfaces';
import './area.css';

@inject('bfStore')
@observer
export class Area extends React.Component<IAreaProps, {}> {
  public render() {
    const { bfStore, zone, type } = this.props;

    let style = {};

    if (zone) {
      const widthVal = bfStore.getZoneWidth(zone);
      const heightVal = bfStore.getZoneHeight(zone);
      const topVal = zone.upperLeftPoint.y * SCALE_COEF.get();
      const leftVal = zone.upperLeftPoint.x * SCALE_COEF.get();

      if (type === 'living') {
        style = {
          width: `${widthVal}px`,
          height: `${heightVal}px`,
          top: `${topVal}px`,
          left: `${leftVal}px`,
          backgroundPosition: `-${leftVal}px -${topVal}px`,
          transition: `${TRANSITION.get()}s`
        };
      } else if (type === 'final') {
        style = {
          width: `${widthVal}px`,
          height: `${heightVal}px`,
          top: `${topVal}px`,
          left: `${leftVal}px`
        };
      }
    } else {
      style = {
        display: 'none'
      };
    }

    return (
      <div className={type + '-area'} style={style} />
    );
  }
}
