require("!style-loader!css-loader!sass-loader!../styles/main.scss");
import React from 'react';
import PropTypes from 'prop-types';

class TurningTiles extends React.Component {
  constructor() {
    super();
    this.state = {
      textIndex: 0,
      intervalId: '',
    };
    this.textIndexIncrementer = this.textIndexIncrementer.bind(this);
  }

  componentDidMount() {
    const { lifecycle } = this.props;
    const { tileTexts } = this.props;
    if (tileTexts.length > 1) {
      const intervalId = setInterval(this.textIndexIncrementer, lifecycle);
      this.setState({ intervalId });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  textIndexIncrementer() {
    const { tileTexts } = this.props;
    const { textIndex } = this.state;

    if (textIndex < tileTexts.length - 1) {
      console.log("here");
      this.setState({ textIndex: textIndex + 1 });
    } else {
      this.setState({ textIndex: 0 });
    }
  }

  renderChildren() {
    const { size } = this.props;
    const arrayX = Array.apply(null, { length: size.x }).map(Number.call, Number);
    const arrayY = Array.apply(null, { length: size.y }).map(Number.call, Number);

    return arrayX.map((x) => {
      const rows = arrayY.map((y) => {
          return <div key={y} className={`tile-row y-${y}`}>Yo</div>
      });
      return <div key={x} className={`tile-column x-${x}`}>{rows}</div>
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
    'Test text',
    'Jotain muuta',
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
    primaryColor: '#F00',
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
