import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';


// Style
const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNum: {
    margin: 10,
    color: '#555',
    fontSize: '17px',
    cursor: 'pointer',
  },
  currentPage: {
    fontSize: '25px',
    color: '#111',
  },
  icon: {
    backgroundColor: 'transparent',
    fontSize: 17,
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

const MARGIN = 5;

class Pagination extends Component {
  componentWillReceiveProps() {
  }

  render() {
    const {
      total,
      limit,
      forward,
      backward,
      disableBackward,
      disableForward,
      currentCursor,
      jumpToPage,
    } = this.props;
    let strartNum = Math.floor(currentCursor / limit) - MARGIN;
    if (strartNum <= 0) strartNum = 1;
    let endNum = strartNum + (2 * MARGIN) + 2;
    if (endNum >= Math.floor(total / limit)) endNum = Math.floor(total / limit) + 1;
    const optionsNum = [];
    for (let i = strartNum; i <= endNum; i += 1) {
      optionsNum.push(i);
    }


    return (
      <div style={styles.wrapper}>
        {disableBackward ? null : (
          <button
            style={styles.icon}
            onClick={() => backward()}>
            <i className="fa fa-angle-double-left" />
          </button>
        )}
        {optionsNum.map(item => (
          <span
            style={[styles.pageNum, Math.floor(currentCursor / limit) + 1 === item && styles.currentPage]}
            onClick={() => {
              jumpToPage(item);
            }}
            key={`options-${item}`}>{item}</span>
        ))}
        {disableForward ? null : (
          <button
            style={styles.icon}
            onClick={() => forward()}>
            <i className="fa fa-angle-double-right" />
          </button>
        )}
      </div>
    );
  }
}

Pagination.propTypes = {
  disableForward: T.bool.isRequired,
  disableBackward: T.bool.isRequired,
  forward: T.func.isRequired,
  backward: T.func.isRequired,
  jumpToPage: T.func.isRequired,
  currentCursor: T.number.isRequired,
  total: T.number.isRequired,
  limit: T.number.isRequired,
};

Pagination.defaultProps = {
};

export default radium(Pagination);
