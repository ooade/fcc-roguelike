FreeCodeCamp React Project - Roguelike Game

__Algorithm__

1. Start with a grid full of walls
2. Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
3. While there are walls in the list:
  a. Pick a random wall from the list. We now have two cases: either there exists exactly one unvisited cell on one of the two sides of the chosen wall, or there does not. If it is the former:
    i. Make the wall a passage and mark the unvisited cell as part of the maze.
    ii. Add the neighboring walls of the cell to the wall list.
  2. Remove the wall from the list.
