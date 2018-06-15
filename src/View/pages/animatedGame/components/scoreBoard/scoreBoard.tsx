import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IBattlefieldProps } from '../propsInterfaces';
import './scoreBoard.css';
import { bfStore } from 'stores/battlefieldStore';
import { TankStore } from 'stores/tankStore';


@inject('bfStore')
@observer
export class ScoreBoardComponent extends React.Component<IBattlefieldProps, {}> {

  public constructor(props: IBattlefieldProps) {
    super(props);
    const { bfStore } = props;
  }

  render() {
    const scoreBoard = bfStore.tankStoreList.sort((a: TankStore, b: TankStore) => { return b.score - a.score; }).map((tankStore) => {
      const row_class : string = tankStore.health !== 1 ? "tubg-scoreboard__row tubg-scoreboard__row_dead" : "tubg-scoreboard__row";
      return (
        <div className={row_class} key={tankStore.id}>
          <div className="tubg-scoreboard__cell">{tankStore.id}</div>
          <div className="tubg-scoreboard__cell">{tankStore.name}</div>
          <div className="tubg-scoreboard__cell">{tankStore.health !== 1 ? "dead" : "alive"}</div>
          <div className="tubg-scoreboard__cell">{tankStore.score}</div>
        </div>
      );
    });
    return (
      <div
        className="tubg-scoreboard"
      >
        <div
          className="tubg-scoreboard__wrap"
        >
          <div
            className="tubg-scoreboard__header"
          >
            <div className="tubg-scoreboard__cell tubg-scoreboard__cell_header">ID</div>
            <div className="tubg-scoreboard__cell tubg-scoreboard__cell_header">Name</div>
            <div className="tubg-scoreboard__cell tubg-scoreboard__cell_header">Life</div>
            <div className="tubg-scoreboard__cell tubg-scoreboard__cell_header">Score</div>
          </div>
          {scoreBoard}
        </div>
      </div>
    );
  }
}
