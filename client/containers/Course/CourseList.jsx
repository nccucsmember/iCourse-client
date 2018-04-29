import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// components


// Style


const styles = {
};


class CourseList extends Component {
  componentWillMount() {
  }

  componentWillReceiveProps() {
  }

  render() {
    return (
      <h1>CourseList</h1>
    );
  }
}


const reduxHook = connect(
  state => ({
  }),
  dispatch => bindActionCreators({
  }, dispatch)
);


CourseList.propTypes = {
  // redux
};

CourseList.defaultProps = {
  courses: [],
};

export default reduxHook(
  radium(CourseList)
);
