require("!style-loader!css-loader!sass-loader!../styles/main.scss");
import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile.js';

class TurningTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileIndex: 0,
      intervalId: '',
    };
    this.tiles = [];
    this.tileColors;
    this.transition;

    this.canvas;
    this.ctx;
    this.height;
    this.width;

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
    this.setCanvas();
    this.drawCanvas();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  // Canvas

  setCanvas() {
    this.canvas = document.getElementById("turning-tiles-canvas");
    this.height = this.canvas.height = this.canvas.getBoundingClientRect().height;
    this.width = this.canvas.width = this.canvas.getBoundingClientRect().width;
    this.ctx = this.canvas.getContext("2d");
  }

  drawCanvas() {
    const { size, images } = this.props;
    const { tileIndex } = this.props;
    const tileWidth = this.width / size.x;
    const tileHeight = this.height / size.y;

    for (let y = 0; y <= size.y; y++) {
      let posy = y * tileHeight;
      for (let x = 0; x <= size.x; x++) {
        let posx = x * tileWidth;
        this.ctx.moveTo(posx, posy);
        this.ctx.fillStyle = this.colorTile(y, x);
        this.ctx.fillRect(posx, posy, tileWidth, tileHeight);
      }
    }
    images && this.drawImage(images[tileIndex]);
    this.ctx.stroke();
  }

  colorTile(y, x) {
    const {
      backgroundColor: {
        primaryColor,
        tileColors
      }
    } = this.props;

    if (tileColors && tileColors[y] && tileColors[y][x]) {
      return tileColors[y][x];
    }
    return primaryColor;
  }

  drawImage() {

  }

  // Old

  performTilesChange() {
    this.tileIndexIncrementer();
    this.initTransition();
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
        if (tileColors && tileColors[i] && tileColors[i][j]) {
          this.tileColors[i][j] = tileColors[i][j];
        } else {
          this.tileColors[i][j] = primaryColor;
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

  tileIndexIncrementer() {
    const { tileTexts } = this.props;
    const { tileIndex } = this.state;

    if (tileIndex < tileTexts.length - 1) {
      this.setState({ tileIndex: tileIndex + 1 });
    } else {
      this.setState({ tileIndex: 0 });
    }
  }

  initTransition() {
    console.log('init');
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


    // {/* <div className="tile-container"> */}
    //   {/* {this.renderChildren()}
    //   { tileTexts[tileIndex] } */}
    //   <canvas id="turning-tiles-canvas"></canvas>
    // {/* </div> */}

  render() {
    const { tileTexts } = this.props;
    const { tileIndex } = this.state;
    return (
      <div className="tile-container">
        <canvas id="turning-tiles-canvas" style={{ height: '100%', width: '100%' }}></canvas>
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
    tileColors: [
      ['red', 'blue'],
      ['green']
    ]
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
