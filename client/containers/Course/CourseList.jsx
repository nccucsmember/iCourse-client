import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CourseActions from '../../actions/Course.js';


// components


// Style


const styles = {
};


class CourseList extends Component {
  componentWillMount() {
    const {
      getCourseList,
    } = this.props;

    getCourseList();
  }

  componentWillReceiveProps() {
  }

  render() {
    const {
      courses,
    } = this.props;
    console.log(courses);

    return (
      <div styles={styles.wrapper}>
        <div styles={styles.container}>
          <h1 style={styles.h1}>CourseList</h1>
          {courses[0] && courses.map(course => (
            <p key={course.course_id}>{course.course_name_ch}</p>
          ))}
        </div>
      </div>
    );
  }
}


const reduxHook = connect(
  state => ({
    courses: state.Course.courseList,
  }),
  dispatch => bindActionCreators({
    ...CourseActions,
  }, dispatch)
);


CourseList.propTypes = {
  // redux
  getCourseList: T.func.isRequired,
  courses: T.arrayOf(T.shape({})),
};

CourseList.defaultProps = {
  courses: [],
};

export default reduxHook(
  radium(CourseList)
);
