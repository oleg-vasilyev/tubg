import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { scaleCoef, transition } from 'stores/battlefieldStore';
import { IdentificatorAi } from '../../../../../classes/IdentificatorAi';
import { Simulation } from '../../../../../classes/Simulation';
import { Area } from '../area/area';
import { BulletComponent } from '../bulletComponent/bulletComponent';
import { IBattlefieldProps } from '../propsInterfaces';
import { TankComponent } from '../tankComponent/tankComponent';
import './battlefieldComponent.css';

@inject('bfStore')
@observer
export class BattlefieldComponent extends React.Component<IBattlefieldProps, {}> {
  private simulation: Simulation;

  public constructor(props: IBattlefieldProps) {
    super(props);

    const { bfStore, options } = props;

    const width = options.battleFieldWidth;
    const height = options.battleFieldHeight;
    const shrCoef = options.speedOfDethZone;
    const lastSide = options.dethZoneStopAreaSize;

    bfStore.setBattlefieldSize(width, height);

    this.simulation = new Simulation(options);

    this.simulation.onStepCompliteEvent.subscribe((data) => {
      bfStore.setSimulationData(data.tankList, data.bulletList, data.currentZoneShape, data.finalZoneShape);
    });
  }

  public componentDidMount() {
    const ident1 = new IdentificatorAi('Stupid-1', './AI/stupidBot.js');
    const ident2 = new IdentificatorAi('Stupid-2', './AI/stupidBot.js');
    const ident3 = new IdentificatorAi('Stupid-3', './AI/stupidBot.js');
    const ident4 = new IdentificatorAi('Stupid-4', './AI/stupidBot.js');
    const ident5 = new IdentificatorAi('Stupid-5', './AI/stupidBot.js');
    const ident6 = new IdentificatorAi('Stupid-6', './AI/stupidBot.js');
    const ident7 = new IdentificatorAi('Stupid-7', './AI/stupidBot.js');
    const ident8 = new IdentificatorAi('Stupid-8', './AI/stupidBot.js');
    const ident9 = new IdentificatorAi('Stupid-9', './AI/stupidBot.js');

    this.simulation.addTank(ident1);
    this.simulation.addTank(ident2);
    this.simulation.addTank(ident3);
    this.simulation.addTank(ident4);
    this.simulation.addTank(ident5);
    this.simulation.addTank(ident6);
    this.simulation.addTank(ident7);
    this.simulation.addTank(ident8);
    this.simulation.addTank(ident9);

    this.simulation.start();
  }

  public componentWillUnmount() {
    this.simulation.stop();
    this.props.bfStore.clearState();
  }

  public onRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.simulation.speedMultiplier = +e.target.value;
    this.props.bfStore.changeTransition(+e.target.value);
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
            min="1"
            max="20"
            defaultValue="1"
            step="1"
            onInput={this.onRangeChange}
          />
        </label>
      </div>
    );
  }
}
