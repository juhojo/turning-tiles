require("!style-loader!css-loader!sass-loader!../styles/main.scss");
import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile.js';

class TurningTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      intervalId: '',
    };
    this.tiles = [];
    this.tileColors;
    this.transition;

    this.setTiles();
    this.setTransition();

    this.performTilesChange = this.performTilesChange.bind(this);
  }

  componentDidMount() {
    const { lifecycle } = this.props;
    const { tileTexts } = this.props;
    if (tileTexts.length > 1) {
      const intervalId = setInterval(this.performTilesChange, lifecycle);
      this.setState({ intervalId });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  performTilesChange() {
    this.textIndexIncrementer();
  }

 /**
  * [setTiles setter for this.tiles of type Array]
  */
  setTiles() {
    const {
      backgroundColor: {
        primaryColor,
        tileColors,
      },
      size,
    } = this.props;

    this.tileColors = Array(size.y).fill(Array(size.x).fill(primaryColor));

    for (let i = 0; i < size.y; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < size.x; j++) {
        if (tileColors && tileColors[i][j]) {
          this.tileColors[i][j] = tileColors[i][j];
        }
        const tile = new Tile(this.tileColors[i][j], i, j);
        this.tiles[i][j] = tile;
      }
    }
  }

  /**
   * [setTransition setter for this.transition of type Array]
   */
  setTransition() {
    const { rotationType, size } = this.props;
    let transitionMatrix;
    if (rotationType.constructor === Array) {
      transitionMatrix = rotationType;
    }
    if (rotationType === 'syncronous') {
      transitionMatrix = Array(size.y).fill(Array(size.x).fill(0));
    }
    this.transition = transitionMatrix;
  }

  textIndexIncrementer() {
    const { tileTexts } = this.props;
    const { textIndex } = this.state;

    if (textIndex < tileTexts.length - 1) {
      this.setState({ textIndex: textIndex + 1 });
    } else {
      this.setState({ textIndex: 0 });
    }
  }

  renderChildren() {
    const { size } = this.props;
    return this.tiles.map((row, index) => {
      const columns = row.map((tile) => {
        return tile.draw();
      });
      return <div key={index} className={`tile-row x-${index}`}>{columns}</div>
    });
  }

  render() {
    const { tileTexts } = this.props;
    const { textIndex } = this.state;
    return (
      <div className="tile-container">
        {this.renderChildren()}
        { tileTexts[textIndex] }
      </div>
    );
  }
}

//  TODO
//  Mahdollista rotationType arvot, joko stringeiksi tai arrayksi.
//  Eli, joko String tai 2-uloitteinen matriisi kuten rotationType: [0][0] = 300;
//  Jos syötetty arvo on String, käännä se arrayksi.
//  Esim. jos koko on x: 6 ja y: 5, syncronous-rotaatio on:
//  Array(size.x).fill(Array(size.y).fill(0));
//  =>
//  [
//  [0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0],
//  [0, 0, 0, 0, 0],
//  ];
//
//  VAIHDA tileColors: { '1;1': "#C0FFEE" } => tileColors[1][1]="#C0FFEE";
//  Rotaatio syncronous = Array(size.x).fill(Array(size.y).fill(0));
TurningTiles.defaultProps = {
  tileTexts: [
    '1',
    '2',
  ],
  textOrientation: {
    x: 'center',
    y: 'center',
  },
  size: {
    x: 6,
    y: 5,
  },
  backgroundColor: {
    primaryColor: '#FF0',
  },
  textColor: {
    primaryColor: '#000',
  },
  rotationType: 'syncronous',
  lifecycle: 3000,
  rotationDirection: 'right',
  rotationLength: 300,
};

TurningTiles.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  tileTexts: PropTypes.array,
  textOrientation: PropTypes.object,
  size: PropTypes.object,
  backgroundColor: PropTypes.object,
  textColor: PropTypes.object,
  rotationType: PropTypes.string,
  lifecycle: PropTypes.number,
  rotationDirection: PropTypes.string,
  rotationLength: PropTypes.number,
};

export default TurningTiles;
