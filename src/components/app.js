import React, { Component } from 'react';
import Dungeon from './dungeon';

let game = {
  level: 1,
  weapon: "Fist",
  dungeon: 0,
  health: 100,
  xp: 10
};

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-static-top navbar-inverse">
          <div className="navbar-brand">Simple Dungeon Game</div>
        </nav>
        <div className="container-fluid">
          <div className="app-desc animated lightSpeedIn">>_ Defeat Juha Bach & his co-horts in dungeon 3</div>
          <div><code className="accessKey-info">`Alt + p` to play and pause music, `Alt + r` to restart Game</code></div>
          <aside className="col-md-4 player-info">
            <div className="stats-header">Player: Kurosaki Ichigo</div>
            <div className="stats">
                <span>Health Level </span>
                <span className="game-health">
                  <div className="progress">
                    <div style={{ width: game.health + "%"}} className="progress-bar progress-bar-success" />
                  </div>
                </span>
            </div>
            <div className="stats">
                <span>Level:</span>
                <span className="game-level">
                  {game.level}
                </span>
            </div>
            <div className="stats">
                <span>Dungeon:</span>
                <span className="game-dungeon">
                  {game.dungeon}
                </span>
            </div>
            <div className="stats">
                <span>XP:</span>
                <span className="game-xp">
                  {game.xp}
                </span>
            </div>
            <div className="stats">
                <span>Weapon:</span>
                <span className="game-weapon">{game.weapon}</span>
            </div>
          </aside>
          <Dungeon data={game}/>
        </div>
        <div className="hint">
          <span className="hint-text"></span>
          <i className="glyphicon glyphicon-info-sign"/>
        </div>
        <div className="my-modal">
        {/*You were beaten :p*/}
        </div>
      </div>
    );
  }
}
