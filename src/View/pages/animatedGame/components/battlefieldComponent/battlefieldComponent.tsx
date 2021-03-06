import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { scaleCoef } from 'stores/battlefieldStore';
import { optionsStore } from 'stores/OptionsStore';
import { Area } from '../area/area';
import { BulletComponent } from '../bulletComponent/bulletComponent';
import { IBattlefieldProps } from '../propsInterfaces';
import { TankComponent } from '../tankComponent/tankComponent';
import './battlefieldComponent.css';

@inject('bfStore')
@observer
export class BattlefieldComponent extends React.Component<IBattlefieldProps, {}> {
  // leave this comments to remember, how I'll use Simulation in future
  // private simulation: Simulation;

  public constructor(props: IBattlefieldProps) {
    super(props);

    const { bfStore, options } = props;

    const width = options.battleFieldWidth;
    const height = options.battleFieldHeight;
    const shrCoef = options.speedOfDethZone;
    const lastSide = options.dethZoneStopAreaSize;

    bfStore.setBattlefieldSize(width, height);

    // this.simulation = new Simulation(width, height, shrCoef, lastSide);
  }

  public componentDidMount() {
    // this.simulation.start();
  }

  public render() {
    const { bfStore } = this.props;

    const battlefieldStyle = {
      width: `${bfStore.bfWidth * scaleCoef.get()}px`,
      height: `${bfStore.bfHeight * scaleCoef.get()}px`,
      top: `${bfStore.bfTop}px`,
      left: `${bfStore.bfLeft}px`
    };

    const tanks = bfStore.tankStoreList.map((tankStore) => {
      return <TankComponent key={tankStore.id} tankStore={tankStore} />;
    });

    const bullets = bfStore.bulletStoreList.map((bulletStore) => {
      return <BulletComponent key={bulletStore.id} bulletStore={bulletStore} />;
    });

    return (
      <div className="bf-wrapper">
        <div
          className="bf"
          style={battlefieldStyle}
          onWheel={bfStore.onWheel}
          onMouseDown={bfStore.onMouseDown}
          onMouseUp={bfStore.onMouseUp}
          onMouseMove={bfStore.onMouseMove}
        >
          <div className="dead-area" />
          <Area zone={bfStore.livingZone} type="living" />
          <Area zone={bfStore.finalZone} type="final" />
          {tanks}
          {bullets}
        </div>
        <label className="range-label">
          <p className="range-label__text">
            Change speed
          </p>
          <input
            className="slider"
            type="range"
            min="10"
            max="2000"
            defaultValue="1000"
            step="1"
          />
        </label>
      </div>
    );
  }
}
