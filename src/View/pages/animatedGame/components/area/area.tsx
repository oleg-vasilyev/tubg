import { observer } from 'mobx-react';
import * as React from 'react';
import { ZoneShape } from 'src/zone/zoneShape';
import { SCALE_COEF, TRANSITION } from 'stores/battlefieldStore';
import { IAreaProps } from '../propsInterfaces';
import './area.css';

@observer
export class Area extends React.Component<IAreaProps, {}> {
  public getZoneWidth(zone: ZoneShape): number {
    const width = zone.lowerRightPoint.x - zone.upperLeftPoint.x + 1;

    return width;
  }

  public getZoneHeight(zone: ZoneShape): number {
    const height = zone.lowerRightPoint.y - zone.upperLeftPoint.y + 1;

    return height;
  }

  public render() {
    const { zone, type } = this.props;

    let style = {};

    if (zone) {
      const widthVal = this.getZoneWidth(zone) * SCALE_COEF.get();
      const heightVal = this.getZoneHeight(zone) * SCALE_COEF.get();
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
