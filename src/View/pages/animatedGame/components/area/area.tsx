import { observer } from 'mobx-react';
import * as React from 'react';
import { ZoneShape } from 'src/zone/zoneShape';
import { scaleCoef, transition } from 'stores/battlefieldStore';
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
      const widthVal = this.getZoneWidth(zone) * scaleCoef.get();
      const heightVal = this.getZoneHeight(zone) * scaleCoef.get();
      const topVal = zone.upperLeftPoint.y * scaleCoef.get();
      const leftVal = zone.upperLeftPoint.x * scaleCoef.get();

      if (type === 'living') {
        style = {
          width: `${widthVal}px`,
          height: `${heightVal}px`,
          top: `${topVal}px`,
          left: `${leftVal}px`,
          backgroundPosition: `-${leftVal}px -${topVal}px`,
          transition: `${transition.get()}s`
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
