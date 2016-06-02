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
const floor = [];

class Dungeon extends Component {
  componentWillMount() {
    seedFloor();
    this.generateTiles();
  }

  renderFloors() {
    return _.map(floor, i => {
      return <div className="floor cell" id={i} key={i} style={{ width: cw, height: ch }}></div>
    });
  }

  generateTiles() {
    console.log(floor[floor.length - 1]);
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
  for (let i = 0; i < (width / cw) * (height / ch); i++) {
    floor.push(i);
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Dungeon);
