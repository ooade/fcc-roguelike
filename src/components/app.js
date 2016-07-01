import React, { Component } from 'react';
import Dungeon from './dungeon';

let game = {
  lvl: 1,
  weapon: "None (Punch & Kick)",
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
          <div className="app-desc"><blink>>_ Defeat Aizen Sosuke in dungeon 4</blink></div>
          <aside className="col-md-3 player-info">
            <div className="stats-header">>_ Player Stats</div>
            <div className="stats">
                <span>Level:</span> {game.lvl}
            </div>
            <div className="stats">
                <span>Dungeon:</span> {game.dungeon}
            </div>
            <div className="stats">
                <span>Health:</span> {game.health}
            </div>
            <div className="stats">
                <span>XP:</span> {game.xp}
            </div>
            <div className="stats">
                <span>Weapon:</span> {game.weapon}
            </div>
          </aside>
          <Dungeon lvl={game.lvl} weapon={game.weapon} />

          <aside className="player-info cmd">
            <span> Kurosaki@Ichigo-Shinigami-101-A:~$ </span>
            <input type="text" ref="cmd" autoFocus placeholder="Hint: Type `Start` or hit key `Alt + S` to begin game"/>
          </aside>
        </div>
      </div>
    );
  }
}
