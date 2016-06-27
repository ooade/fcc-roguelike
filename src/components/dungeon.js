import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const iheight = 400; //initial dungeon height
const iwidth = 500; //initial dungeon width
const heights = [ iheight, 500, 600, 700  ];
const widths = [ iwidth, 600, 700, 800 ];
const height = heights[_.random(0, 3)];
const width = widths[_.random(0, 3)];
const cw = 10, ch = 10; // cell width && cell height
const grid = [ width / cw, height / ch ];
let floor = [], maze = [], rooms = 0;

class Dungeon extends Component {
  componentWillMount() {
    seedFloor();
    this.generateTiles();
  }

  renderFloors() {
    return _.map(floor, i => {
      return <div className={ i.type + " cell" } id={i.n} key={i.n} style={{ width: cw, height: ch }}></div>
    });
  }

  renderMaze() {
    _.map(maze, i => {
      floor = _.uniqBy(_.concat(floor, [{ n: i, type: "maze"}]), 'n');
      floor[i - 1] = { n: i, type: "maze"};
    });
    rooms++;
  }

  generateTiles() {
    // Pick a cell, mark it as part of the maze.
    let cell = _.random(50, 100);
    maze.push(cell);
    this.generateWalls(cell);
    // while (rooms < 30) {
    //   cell = cell + _.random(40, 60);
    //   maze.push(cell);
    //   this.generateWalls(cell);
    // }
  }

  generateWalls(cell) {
    // if the cell is at the right/left edge of the maze or around
    if ((cell % grid[0]) + 6 >= grid[0]) {
      //generateWalls to the leftside of the cell
      let walls = [ cell, cell - 1, cell - 2, cell - 3, cell - 4, cell - 5, cell - 6];
      maze = _.uniq(maze.concat(walls));
    }
    else if ((cell % grid[0]) < 6) {
      //generateWalls to the rightside of the cell
      let walls = [ cell, cell + 1, cell + 2, cell + 3, cell + 4, cell + 5, cell + 6];
      maze = _.uniq(maze.concat(walls));
    }
    else {
      //generateWalls both sides of the cell
      let walls = [ cell, cell - 1, cell + 1, cell - 2, cell + 2, cell - 3, cell + 3];
      maze = _.uniq(maze.concat(walls));
    }

    // console.log("cell alts", walls);
    if (cell > 0 && cell < grid[0] * 3) {
      //generateWalls below current cell
      let walls = [ cell, cell + grid[0], cell + (grid[0] * 2), cell + (grid[0] * 3), cell + (grid[0] * 4) ];
      maze = _.uniq(maze.concat(walls));
    }
    else if (grid[0] * 4 && cell < grid[0] * grid[1]) {
      //generateWalls above current cell
      let walls = [ cell, cell - grid[0], cell - (grid[0] * 2), cell - (grid[0] * 3), cell - (grid[0] * 4) ];
      maze = _.uniq(maze.concat(walls));
    }
    else {
      let walls = [ cell, cell - grid[0], cell + grid[0], cell - (grid[0] * 2), cell + (grid[0] * 2) ];
      maze = _.uniq(maze.concat(walls));
    }

    this.renderMaze();
  }

  render() {
    return (
      <div className="dungeon">
        <div className="floors" style={{ width, height }}>
          { this.renderFloors() }
        </div>
      </div>
    );
  }
}

function seedFloor() {
  /* Push exact number of cells to floor i.e fill the floor */
  for (let i = 1; i <= (width / cw) * (height / ch); i++) {
    floor.push({ n: i, type: "floor" });
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Dungeon);
