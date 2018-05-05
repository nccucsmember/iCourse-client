import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CourseActions from '../../actions/Course.js';

import Theme from '../../styles/Theme.js';

// components


// Style
const styles = {
  wrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  h1Wrapper: {
    width: '100%',
  },
  h1: {
    color: Theme.TITLE_COLOR,
  },
  coursesWraper: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  courseWrapper: {
    display: 'flex',
    width: '100%',
  },
  course: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 80,
    margin: 8,
    textDecoration: 'none',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 6,
    borderShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    padding: '0px 15px',
  },
  courseRowEven: {
    borderBottom: '1px solid rgb(240, 240, 240)',
    borderTop: '1px solid rgb(240, 240, 240)',
    backgroundColor: 'rgb(248, 248, 248)',
  },
  text: {
    margin: 5,
    minWidth: 50,
    fontSize: 13,
    fontWeight: 300,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 80,
    margin: 8,
    textDecoration: 'none',
    backgroundColor: 'rgba(53, 53, 53, 0.8)',
    borderRadius: 6,
    borderShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    padding: '0px 15px',
  },
  header: {
    margin: 5,
    minWidth: 50,
    fontSize: 15,
    fontWeight: 500,
    color: '#fefefe',
  },
  buttonWraper: {
    minWidth: 50,
    margin: 20,
    fontSize: 13,
    fontWeight: 500,
    color: '#fefefe',
  },
  detailButton: {
    width: 50,
    margin: 30,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 5,
    padding: '6px 24px',
    color: 'rgb(245, 166, 67)',
    border: '2px solid rgb(245, 166, 67)',
    backgroundColor: 'transparent',
    outline: '0px',
    cursor: 'pointer',
  },
  addButton: {
    width: 50,
    margin: 5,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 5,
    padding: '6px 24px',
    color: 'rgba(38, 62, 208, 0.9)',
    border: '2px solid rgba(38, 62, 208, 0.9)',
    backgroundColor: 'transparent',
    outline: '0px',
    cursor: 'pointer',
  },
  filterWraper: {
    width: '10%',
  },
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

    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.h1Wrapper}>
            <h1 style={styles.h1}>課程清單</h1>
          </div>
          {/* Searcher */}
          <div style={styles.coursesWraper}>
            <div style={[styles.headerWrapper]}>
              <span style={[styles.header]}>學期</span>
              <span style={[styles.header, { width: 105 }]}>課程名稱</span>
              <span style={[styles.header, { width: 60 }]}>任課教師</span>
              <span style={[styles.header, { width: 100 }]}>教室</span>
              <span style={[styles.header, { width: 60 }]}>開課院系</span>
              <span style={[styles.header]}>修別</span>
              <span style={[styles.header, { width: 170 }]}>上課時間</span>
              <span style={[styles.buttonWraper, { width: 120 }]}>更多資訊</span>
              <span style={[styles.buttonWraper]}>操作</span>
            </div>
            {courses[0] && courses.map((course, index) => (
              <div key={course.course_id} style={styles.courseWrapper}>
                <div style={[styles.course, index % 2 !== 0 ? styles.courseRowEven : null]}>
                  <span style={[styles.text, { flex: 0 }]}>{course.course_semester || ''}</span>
                  <span style={[styles.text, { flex: 1 }]}>{course.course_name_ch || ''}</span>
                  <span style={[styles.text, { flex: 0.5 }]}>{course.course_teacher || ''}</span>
                  <span style={[styles.text, { flex: 1 }]}>{course.location_id || ''}</span>
                  <span style={[styles.text, { flex: 0.5 }]}>{course.course_dept || ''}</span>
                  <span style={[styles.text, { flex: 0 }]}>{course.course_type || ''}</span>
                  <span style={[styles.text, { flex: 1.5 }]}>
                    {`${course.course_weekday} ${course.course_begin_time.match(/T(\d+:\d+)/i)[1]} - ${course.course_end_time.match(/T(\d+:\d+)/i)[1]}`}
                  </span>
                  <button style={[styles.detailButton, { flex: 0.5 }]}>more</button>
                  <button style={[styles.addButton, { flex: 1 }]}>加入追蹤清單</button>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.filterWraper}>
            篩選區
          </div>
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
