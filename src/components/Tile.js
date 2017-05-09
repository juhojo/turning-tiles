import React from 'react';

export default class Tile extends React.Component {
  constructor(backgroundColor, row, col) {
    super();
    this.backgroundColor = backgroundColor;
    this.row = row;
    this.col = col;
  }
  draw() {
    return (
      <div
        key={this.col}
        style={{ backgroundColor: this.backgroundColor }}
        className={`tile-cell y-${this.col}`}>
      </div>
    );
  }
}
