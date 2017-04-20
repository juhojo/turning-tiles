require("!style-loader!css-loader!sass-loader!../styles/main.scss");
import React from 'react';
import PropTypes from 'prop-types';

class TurningTiles extends React.Component {
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
    return (
      <div className="tile-container">
        {this.renderChildren()}
      </div>
    );
  }
}

TurningTiles.defaultProps = {
  tileTexts: [],
  textOrientation: {
    x: 'center',
    y: 'center'
  },
  size: {
    x: 6,
    y: 5
  },
  backgroundColor: {
    primaryColor: '#F00'
  },
  textColor: {
    primaryColor: '#000'
  },
  rotationType: 'syncronous',
  lifecycle: 3000,
  rotationDirection: 'right',
  rotationLength: 300
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
