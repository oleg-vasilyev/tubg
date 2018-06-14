import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IBattlefieldProps } from '../propsInterfaces';
import './scoreBoard.css';
import { bfStore } from 'stores/battlefieldStore';


@inject('bfStore')
@observer
export class ScoreBoardComponent extends React.Component<IBattlefieldProps, {}> {

  public constructor(props: IBattlefieldProps) {
    super(props);
    const { bfStore } = props;
  }

  render() {
    const scoreBoard = bfStore.tankStoreList.map((tankStore) => {
      return (
        <tr key={tankStore.id}>
          <td>{tankStore.id}</td>
          <td>{tankStore.name}</td>
          <td>{tankStore.health == 0 ? "dead" : "alive"}</td>
          <td>{tankStore.score}</td>
        </tr>
      );
    });

    return (
      <table
        className="scoreboard"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Life</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreBoard}
        </tbody>
      </table>
    );
  }
}
