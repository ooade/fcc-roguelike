import React, { Component } from 'react';
import Dungeon from './dungeon';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-static-top navbar-default">
          <div className="navbar-brand">Roguelike Dungeon Crawler Game</div>
        </nav>
        <div className="container">
          <div className="">Kill the boss in dungeon 4</div>
          <Dungeon />
        </div>
      </div>
    );
  }
}
