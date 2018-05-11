import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';


// Style
const styles = {

};


class Pagination extends Component {
  componentWillMount() {
    this.state = {
      from: 1,
      to: 10,
      current: 1,
    };
  }

  componentWillReceiveProps() {
  }

  render() {
    const {
      forward,
      backward,
      disableBackward,
      disableForward,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        {disableBackward ? null : <button onClick={() => backward()}>backward</button>}
        {disableForward ? null : <button onClick={() => forward()}>forward</button> }
      </div>
    );
  }
}

Pagination.propTypes = {
  disableForward: T.bool.isRequired,
  disableBackward: T.bool.isRequired,
  forward: T.func.isRequired,
  backward: T.func.isRequired,
};

Pagination.defaultProps = {
};

export default radium(Pagination);
