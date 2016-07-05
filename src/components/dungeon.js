import React, { Component } from 'react';
import _ from 'lodash';

// No Redux, updated the DOM using JQuery;

let gameData = {
  width: 500,
  height: 500,
  grid: [50, 50]
};

let weapons = {
  "fist": "15",
  "sword": "30",
  "sword (shikai enabled)": "50",
  "sword (bankai enabled)": "80"
};

export default class Dungeon extends Component {
  constructor(props) {
    super(props);

    this.state = { floor: [], player: '' };
  }

  componentWillMount() {
    this.floor = _.fill(Array(gameData.grid[0] * gameData.grid[1]), 1);
    this.setState({ floor: this.floor });
    this.setBoulders(); // Seed Boulders
    this.handleKeys();
    this.music = new Audio('/public/music/turnitaround.m4a');
  }

  componentDidMount() {
    // console.log(this.state.player);
    // this.floor[this.state.player] = 3;
    // this.setState({ floor:  this.floor });
    this.enemies = [];
    this.dungeon = this.props.data.dungeon;
    this.xp = this.props.data.xp;
    this.level = this.props.data.level;
    this.weapon = this.props.data.weapon.toLowerCase();
    this.setPlayer();
    this.setEnemies();
    this.setPortions(); // Health Items
    this.setDungeon();
    this.setWeapon();
  }

  renderFloors() {
    return this.state.floor.map((tile, key) => {
      switch (tile) {
        case 2:
          return <div className="cell boulder" key={key}></div>
        case 3:
          return <div className="cell player" key={key}></div>
        case 4:
          return <div className="cell enemy" key={key}></div>
        case 5:
          return <div className="cell health" key={key}></div>
        case 6:
          return <div className="cell new-dungeon" key={key}></div>
        case 7:
          return <div className="cell weapon" key={key}></div>
      }
        return <div className="cell" key={key}></div>
    });
  }

  setPlayer() {
    // Grab the index of available spaces
    let availableSpaces = this.floor.map( (i, key) => (i === 1) ? key : undefined).filter(num => typeof(num) !== "undefined");
    let player = availableSpaces[_.random(51, 70)];
    this.floor[player] = 3;
    this.setState({ player, floor: this.floor });
  }

  setWeapon() {
    let availableSpaces = this.floor.map( (i, key) => (i === 1) ? key : undefined).filter(num => typeof(num) !== "undefined");
    let weapon = availableSpaces[_.random(1, availableSpaces.length)];

    if (this.dungeon > 0) {
      this.floor[weapon] = 7;
    }
  }

  setEnemies() {
    let availableSpaces = this.floor.map( (i, key) => (i === 1) ? key : undefined).filter(num => typeof(num) !== "undefined");

    let numberOfEnemies = () => {
      switch (this.dungeon) {
        case 0:
          return _.random(5, 8);
        case 1:
          return _.random(8, 10);
        case 2:
          return _.random(10, 12);
        case 3:
          return _.random(12, 14);
      }

      return 10;
    }

    let enemyStrength = () => {
      switch (this.dungeon) {
        case 0:
          return _.random(20, 30);
        case 1:
          return _.random(35, 45);
        case 2:
          return _.random(50, 60);
        case 3:
          return _.random(65, 70);
      }

      return 50;
    }

    for (let i = 0; i < numberOfEnemies(); i++) {
      let enemy = availableSpaces[_.random(1, availableSpaces.length)];
      this.floor[enemy] = 4;
      this.enemies.push({id: enemy, strength: enemyStrength()});
      this.setState({ enemies: enemy });
    }
  }

  setPortions() {
    let availableSpaces = this.floor.map( (i, key) => (i === 1) ? key : undefined).filter(num => typeof(num) !== "undefined");

    let num = 5;

    switch (this.dungeon) {
      case 0:
        num = 5;
      break;
      case 1:
        num = 6;
      break;
      case 2:
        num = 7;
      break;
      case 3:
        num = 8;
      break;
      default:
        num = 6;
    }

    for (let i = 0; i < num; i++) {
      let healthItem = availableSpaces[_.random(1, availableSpaces.length)];
      this.floor[healthItem] = 5;
    }
  }

  setDungeon() {
    if (this.dungeon < 3) {
      let availableSpaces = this.floor.map( (i, key) => (i === 1) ? key : undefined).filter(num => typeof(num) !== "undefined");

      let newDungeon = availableSpaces[_.random(availableSpaces.length - 500, availableSpaces.length - 200)];
      this.floor[newDungeon] = 6;
    }
  }

  setBoulders() {
    // pick the first boulder at random
    let firstBoulder = _.random(1, 150);

    // Give the first boulder a room
    this.generateRoom(firstBoulder);

    let s = firstBoulder + 350;
    let d = firstBoulder + 121;
    let f1 = 0, f2 = 1, i = 1;

    while (i < 10) {
      i = f1 + f2;
      f1 = f2;
      f2 = i;
      this.generateRoom(s * i);
      this.generateRoom(d * i);
      i++;
    }

  }

  handleKeys() {
    window.onkeydown = (event) => {
      var parseKey = this._keys();
      this.setLevel();

      if (this.dungeon === 3 && this.enemies.length === 0) {
        $('.my-modal')
        .html('<h1>Congratulations!!!</h1>'
            + '<h3>You Defeated Juha Bach and his co-horts</h3>')
        .show();
        this.music.play();
      }

      if (this.dungeon === 0) {
        $('.hint').show();
        $('.hint-text').text('More wins, more xp');
      }

      switch(event.keyCode) {
        case 87: case 38:
          parseKey.up();
          return;
        case 83: case 40:
          parseKey.down();
          return;
        case 65: case 37:
          parseKey.left();
          return;
        case 68: case 39:
          parseKey.right();
          return;
      }
    }
  }

  _keys() {
    let right = () => {
      if (this.state.player % 50 === 49) { return ; }
      // As i move, re-render react component
      // to reveal overflow'd content
      if (this.state.player % 50 >= 36) { $('.floors').addClass("right-floor").removeClass("left-floor"); }
      this.actionsInGame(1);
    }

    let left = () => {
      if (this.state.player % 50 === 0) { return ; }
      if (this.state.player % 50 < 14) { $('.floors').addClass("left-floor").removeClass("right-floor"); }
      this.actionsInGame(-1);
    }

    let up = () => {
      if (this.state.player < 50) { return ; }
      if (this.state.player < 1200) { $('.floors').addClass("up-floor").removeClass("down-floor"); }
      this.actionsInGame(-50);
    }

    let down = () => {
      if (this.state.player > 2449) { return ; }
      if (this.state.player >= 1300) { $('.floors').addClass("down-floor").removeClass("up-floor"); }
      this.actionsInGame(50);
    }

    let keys = { left, right, up, down };

    return keys;
  }

  movePlayer(player, playerNextPosition) {
    this.floor[player] = 1;
    this.floor[playerNextPosition] = 3;
    this.setState({ player: playerNextPosition });
  }

  fixHealth() {
    if (this.props.data.health < 50) {
      $('.game-health')
        .html('<div class="progress">'
            + '<div style="width:' + this.props.data.health + '%" class="progress-bar progress-bar-danger" />'
            + '</div>');
    } else {
      $('.game-health')
        .html('<div class="progress">'
            + '<div style="width:' + this.props.data.health + '%" class="progress-bar progress-bar-success" />'
            + '</div>');
    }
  }

  actionsInGame(pos) {
    let player = this.state.player;
    let playerNextPosition = player + pos;

    switch (this.state.floor[playerNextPosition]) {
      case 2:
        return ;
      case 4:
        this.enemies.map((enemy, key) => {
          if (enemy.id === playerNextPosition) {
            enemy.strength -= weapons[this.weapon] * this.level;

            if (this.enemies[key].strength < weapons[this.weapon]) {
              this.props.data.health -= 12;
            } else {
              this.props.data.health -= weapons[this.weapon];
            }

            this.fixHealth();

            if (this.props.data.health <= 0) {
              let deathText = (this.dungeon < 2) ? "You got yourself killed by Aizen Sosuke" : "Oops! Juha Bach uses Almighty on you before you could even raise your " + this.weapon;
              $('.container-fluid').hide();
              $('.my-modal')
              .html(`<h1>${deathText}</h1>`
                  + '<button class="btn restart btn-sm btn-success"> Click to Start a new game </button>')
              .show();
              $('.restart').click(function(){
                document.location.href = "";
              });
            }

            if (enemy.strength < 0) {
              // Enemy Defeated, Remove Enemy from Array, increase and show xp and Move on...
              this.enemies.splice(key, 1);
              if (this.dungeon < 2) {
                this.xp += 10;
              } else {
                this.xp += 25;
              }

              $('.game-xp').text(this.xp);
              this.movePlayer(player, playerNextPosition);
            }
          }
        });
        break;
      case 5:
        this.props.data.health += 20;
        this.fixHealth();
        this.movePlayer(player, playerNextPosition);
        break;
      case 6:
        // NEW DUNGOEON
        $('.floors').removeClass('animated zoomIn top-floor right-floor left-floor down-floor');
        this.floor = _.fill(Array(gameData.grid[0] * gameData.grid[1]), 1);
        this.setState({ floor: this.floor });
        this.setBoulders(); // Seed Boulders
        this.enemies = [];
        this.props.data.dungeon += 1;
        this.dungeon = this.props.data.dungeon;
        $('.game-dungeon').text(this.dungeon);
        this.setPlayer();
        this.setEnemies();
        this.setPortions(); // Health Items
        this.setDungeon();
        this.setWeapon();
        this.props.data.Health += 30;
        this.xp += 27;
        $('.game-xp').text(this.xp);
        $('.hint-text').text('Grab a new weapon before taking an enemy head on');
        if (this.dungeon === 2) {
          $('.hint').hide();
        }
        $('.floors').hide().show().addClass('animated zoomIn');
        break;
      case 7:
        let newWeapon = Object.keys(weapons)[this.dungeon];
        $('.game-weapon').text(newWeapon);
        this.weapon = newWeapon;
        this.movePlayer(player, playerNextPosition);
        break;
      default:
        this.movePlayer(player, playerNextPosition);
    }
  }

  setLevel() {
    if (this.xp >= 100) {
      let rem = this.xp - 100;
      this.xp = rem;
      $('.game-xp').text(rem);
      this.level += 1;
      $('.game-level').text(this.level);
    }
  }

  generateRoom(cell) {
      let walls = [ cell, this.addCellsTo("left", cell), this.addCellsTo("right", cell),
                    cell + gameData.grid[0], cell + (gameData.grid[0] * 2), cell + (gameData.grid[0] * 3), cell + (gameData.grid[0] * 4),
                    this.addCellsTo("left", cell + gameData.grid[0]), this.addCellsTo("left", cell + (gameData.grid[0] * 2)),
                    this.addCellsTo("left", cell + (gameData.grid[0] * 3)), this.addCellsTo("left", cell + (gameData.grid[0] * 4)),
                    this.addCellsTo("right", cell + gameData.grid[0]), this.addCellsTo("right", cell + (gameData.grid[0] * 2)),
                    this.addCellsTo("right", cell + (gameData.grid[0] * 3)), this.addCellsTo("right", cell + (gameData.grid[0] * 4))
                    ];
      _.flatten(walls).map(wall => {
        if (wall < 0 || wall > this.floor.length || wall % 50 === 0 || wall % 50 === 49 ) {
          return ;
        }
        this.floor[wall] = 2;
      })
  }

  addCellsTo(position, cell) {
    switch (position) {
      case "left":
        return [cell - 1, cell - 2, cell - 3, cell - 4];
      case "right":
        return [cell + 1, cell + 2, cell + 3, cell + 4];
    }
  }

  onGameRestart(event) {
    event.preventDefault();

    document.location.href="";
  }

  pausePlayAudio(event) {
    event.preventDefault();

    if (this.music.paused) {
      this.music.play();
    } else {
      this.music.pause();
    }

  }

  render() {
    return (
      <div>
        <div className="dungeon">
          <div className="floors animated zoomIn" style={{ width: gameData.width, height: gameData.height }}>
            { this.renderFloors() }
          </div>
        </div>
        <div className="control-tabs">
          <button className="btn btn-sm btn-success" accessKey="r" onClick={this.onGameRestart.bind(this)}>Restart Game</button>
          <button className="btn btn-sm btn-danger" accessKey="p" onClick={this.pausePlayAudio.bind(this)}>Pause Audio</button>
        </div>
      </div>
    );
  }
}
