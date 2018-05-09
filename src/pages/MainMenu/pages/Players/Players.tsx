import * as React from 'react';
import getUniqId from './../../../../helper-functions/getUniqId';
import PageTitle from './../../components/PageTitle/PageTitle';
import getPlayerTankType from './helper-functions/getPlayerTankType';
import getUniqPlayerName from './helper-functions/getUniqPlayerName';
import './Players.css';
import IPlayer from './Players.types';


interface IPlayers {
  players: IPlayer[]
}

class Players extends React.Component<IPlayers, IPlayers> {
  public state: IPlayers = {
    players: []
  }

  public addPlayer = () => {
    const name = getUniqPlayerName();
    const tankType = getPlayerTankType();
    const players = [...this.state.players];
    players.push({name, tankType});
    this.setState({players});
  }

  public render() {
    return (
      <React.Fragment>
        <PageTitle>Players</PageTitle>
        {
          this.state.players.length ? 
            <div className='bt-main-menu__players-options-descr'>
              <div className='bt-main-menu__players-option-descr_name bt-main-menu__players-option-descr'>Name</div>
              <div className='bt-main-menu__players-option-descr_tankType bt-main-menu__players-option-descr'>Tank Type</div>
              <div className='bt-main-menu__players-option-descr_bot bt-main-menu__players-option-descr'>Bot</div>
            </div>
             : null
        }
        {
          this.state.players.map((player: IPlayer) => {
            return (
              <div className='bt-main-menu__players-player' key={getUniqId()}>
                <input value={player.name} className='bt-main-menu__players-player-name bt-main-menu__players-player-option' />
                <label className='bt-main-menu__players-player-tankType-option bt-main-menu__players-player-option'>
                  <input value={player.tankType} className='bt-main-menu__players-player-tankType' />
                </label>
                <label className='bt-main-menu__players-player-bot-option bt-main-menu__players-player-option'>
                  <span className='bt-main-menu__players-player-bot-option-text'>Bot.name</span>
                  <input type='file' className='bt-main-menu__players-player-bot' />
                </label>
              </div>
            )
          })
        }
        <div className="bt-main-menu__players-add-btn-wrapper">
          <button onClick={this.addPlayer} className='bt-main-menu__players-add-btn'>Add Player</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Players