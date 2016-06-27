import React from 'react';

class Dungeon extends React.Component {
  constructor( h, w, rooms, roomSize ) {
    super( h, w, rooms, roomSize );

    this.maze = [];

    this.h = h;
    this.w = w;
    this.rooms = [];
    this.roomSize = roomSize;

    this._lastRoomId = 2;

    this._createEmpty();

    for (var i = 0; i < rooms; i++) {
      var newRoom = this._createRoom();
      if (newRoom) {
        // log('>> Created', newRoom);
        this._appendRoom(newRoom);
        this.rooms.push(newRoom);
      }
    }

    // log('Total rooms created: ' + this.rooms.length);

    this._connectRooms();
    this._restoreMaze();
  }

  setSpawn() {
    this.spawn = {};
    this.spawn.room = this.rooms[Math.floor(this.rooms.length * Math.random())];
    this.spawn.x = this.spawn.room.cx;
    this.spawn.y = this.spawn.room.cy;
  }

  _restoreMaze() {
    for (var i = 0; i < this.rooms.length; i++) {
      this._appendRoom(this.rooms[i]);
    }
  }

  _connectRooms() {
    var findNearest = (room, except) => {

      var inearest = -1;
      var imin = this.h * this.w;

      for (var i = 0; i < this.rooms.length; i++) {

        if (except.indexOf(this.rooms[i]) !== -1) {
          continue;
        }

        var dist = Math.sqrt((room.cx - this.rooms[i].cx) * (room.cx - this.rooms[i].cx) +
          (room.cy - this.rooms[i].cy) * (room.cy - this.rooms[i].cy));

        if (dist < imin) {
          inearest = i;
          imin = dist;
        }
      }

      return this.rooms[inearest];
    };

    var createLink = (roomA, roomB) => {

      var dx = roomA.cx > roomB.cx ? -1 : 1;
      var dy = roomA.cy > roomB.cy ? -1 : 1;

      for (var x = roomA.cx, y = roomA.cy;;) {
        if (this.maze[y][x] == roomB.id) {
          break;
        }

        if (y != roomB.cy) {
          y += dy;
        } else if (x != roomB.cx) {
          x += dx;
        } else {
          break;
        }

        this.maze[y][x] = 1;
      }
    };

    var except = [];
    for (var i = 0; i < this.rooms.length; i++) {
      except.push(this.rooms[i]);
      var nearest = findNearest(this.rooms[i], except);
      if (nearest) {
        createLink(this.rooms[i], nearest);
      }
    }
  }

  _createRoom() {
    var room = {
      id: this._lastRoomId,
      h: Math.floor(Math.random() * this.roomSize / 2.0 + this.roomSize / 2.0),
      w: Math.floor(Math.random() * this.roomSize / 2.0 + this.roomSize / 2.0),
      x: 0,
      y: 0,
      cx: 0,
      cy: 0,
    };

    while (this._isColliding(room)) {
      room.x += Math.floor(Math.random() * 3);
      if (room.x + room.w >= this.w) {
        room.x = 0;
        room.y++;
        if (room.y + room.h >= this.h) {
          return null;
        }
      }
    }

    room.cx = Math.floor(room.x + room.w / 2.0);
    room.cy = Math.floor(room.y + room.h / 2.0);

    this._lastRoomId++;
    return room;
  }

  _appendRoom(room) {
    for (var i = room.y; i < room.y + room.h; i++) {
      for (var j = room.x; j < room.x + room.w; j++) {
        this.maze[i][j] = room.id;
      }
    }
  }

  _isColliding(room) {
    for (var i = Math.max(0, room.y - 1); i < Math.min(this.h, room.y + room.h + 1); i++) {
      for (var j = Math.max(0, room.x - 1); j < Math.min(this.w, room.x + room.w + 1); j++) {
        if (this.maze[i][j] != 0) {
          return true;
        }
      }
    }

    return false;
  }

  _createEmpty() {
    for (var i = 0; i < this.h; i++) {
      this.maze[i] = [];
      for (var j = 0; j < this.w; j++) {
        this.maze[i][j] = 0;
      }
    }
  }

  render() {
    return (
      <div>  </div>
    )
  }
};

export default Dungeon;
