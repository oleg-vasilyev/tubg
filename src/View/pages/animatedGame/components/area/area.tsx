import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { SCALE_COEF, TRANSITION } from 'stores/battlefieldStore';
import { IAreaProps } from '../propsInterfaces';
import './area.css';

@inject('bfStore')
@observer
export class Area extends React.Component<IAreaProps, {}> {
  public render() {
    const { bfStore, type } = this.props;

    let style = {};

    if (type === 'living') {
      const widthVal = bfStore.getZoneWidth(bfStore.livingZone);
      const heightVal = bfStore.getZoneHeight(bfStore.livingZone);
      const topVal = bfStore.livingZone.upperLeftPoint.y * SCALE_COEF.get();
      const leftVal = bfStore.livingZone.upperLeftPoint.x * SCALE_COEF.get();

      style = {
        width: `${widthVal}px`,
        height: `${heightVal}px`,
        top: `${topVal}px`,
        left: `${leftVal}px`,
        backgroundPosition: `-${leftVal}px -${topVal}px`,
        transition: `${TRANSITION.get()}s`
      };
    } else if (type === 'final') {
      if (bfStore.finalZone) {
        const widthVal = bfStore.getZoneWidth(bfStore.finalZone);
        const heightVal = bfStore.getZoneHeight(bfStore.finalZone);
        const topVal = bfStore.finalZone.upperLeftPoint.y * SCALE_COEF.get();
        const leftVal = bfStore.finalZone.upperLeftPoint.x * SCALE_COEF.get();

        style = {
          width: `${widthVal}px`,
          height: `${heightVal}px`,
          top: `${topVal}px`,
          left: `${leftVal}px`
        };
      } else {
        style = {
          display: 'none'
        };
      }
    }

    return (
      <div className={type + '-area'} style={style} />
    );
  }
}
