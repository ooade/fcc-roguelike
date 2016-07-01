import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

const iheight = 400; //initial dungeon height
const iwidth = 500; //initial dungeon width
const heights = [ iheight, 500, 600, 700  ];
const widths = [ iwidth, 600, 700, 800 ];
const height = 500;
const width = 500;
const cw = 10, ch = 10; // cell width && cell height
const grid = [ width / cw, height / ch ];

class Dungeon extends Component {
  constructor(props) {
    super(props);

    this.state = { floor: [], player: '' };
  }

  componentWillMount() {
    this.floor = _.fill(Array(grid[0] * grid[1]), 1);
    this.setBoulders(); // Seed Boulders
    this.setPlayer();

    window.onkeydown = (event) => {
      let keyCode = event.keyCode;

      switch(keyCode) {
        case 87: case 38:
          this.floor[this.state.player] = 1;
          this.floor[this.state.player - 50] = 3;
          this.state.player -= 50;
          this.setState({ floor:  this.floor });
          return;
        //move up/w
        case 83: case 40:
          this.floor[this.state.player] = 1;
          this.floor[this.state.player + 50] = 3;
          this.state.player += 50;
          this.props.testState({ id: this.state.player, type: 2 });
          // this.setState({ floor:  this.floor });
          return;
        //move down/s
        case 65: case 37:
          this.floor[this.state.player] = 1;
          this.floor[this.state.player - 1] = 3;
          this.state.player -= 1;
          this.setState({ floor:  this.floor });;
          return;
        //move left/a
        case 68: case 39:
          this.floor[this.state.player] = 1;
          this.floor[this.state.player + 1] = 3;
          this.state.player += 1;
          this.setState({ floor:  this.floor });
          return;
        //move right/d
      }

    }
  }

  componentDidMount() {
    // console.log(this.state.player);
    this.floor[this.state.player] = 3;
    // this.setState({ floor:  this.floor });
  }

  renderFloors() {
    return this.state.floor.map((tile, key) => {
      switch (tile) {
        case 2:
          return <div className="cell boulder" key={key}></div>
        case 3:
          return <div className="cell player" key={key}></div>
      }
        return <div className="cell" key={key}></div>
    });
  }

  setPlayer() {
    // Grab the index of available spaces
    var availableSpaces = this.floor.map( (i, key) => (i === 1) ? key : undefined).filter(num => typeof(num) !== "undefined");

    var player = _.random(51, 70);
    this.setState({ player: availableSpaces[player] });
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

  generateRoom(cell) {
      let walls = [ cell, this._padSide("left", cell), this._padSide("right", cell),
                    cell + grid[0], cell + (grid[0] * 2), cell + (grid[0] * 3), cell + (grid[0] * 4),
                    this._padSide("left", cell + grid[0]), this._padSide("left", cell + (grid[0] * 2)),
                    this._padSide("left", cell + (grid[0] * 3)), this._padSide("left", cell + (grid[0] * 4)),
                    this._padSide("right", cell + grid[0]), this._padSide("right", cell + (grid[0] * 2)),
                    this._padSide("right", cell + (grid[0] * 3)), this._padSide("right", cell + (grid[0] * 4))
                    ];
      _.flatten(walls).map(wall => {
        if (wall < 0 || wall > this.floor.length || wall % 50 === 0 || wall % 50 === 49 ) {
          return ;
        }
        this.floor[wall] = 2;
      })

      this.setState({ floor:  this.floor });
  }

  _padSide(position, cell) {
    switch (position) {
      case "left":
        return [cell - 1, cell - 2, cell - 3, cell - 4];
      case "right":
        return [cell + 1, cell + 2, cell + 3, cell + 4];
    }
  }

  render() {
    console.log(this.props.game);
    return (
      <div className="dungeon">
        <div className="floors" style={{ width, height }}>
          { this.renderFloors() }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game // This is available as this.props.game
  }
}

export default connect(mapStateToProps, actions)(Dungeon);
