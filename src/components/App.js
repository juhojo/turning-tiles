import React, { Component } from 'react';
import TurningTiles from './TurningTiles';

export default class App extends Component {
  render() {
    return (
      <div id="root" style={{height: '400px', width: '520px'}}>
        <TurningTiles />
      </div>
    );
  }
}
