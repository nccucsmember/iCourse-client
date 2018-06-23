// @flow

import React, { Component } from 'react';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes as T } from 'prop-types';

import * as detailActions from '../../actions/Detail.js';

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2000,
  },
  container: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainWrap: {
    width: '90%',
    backgroundColor: '#eee',
    position: 'relative',
    top: 100,
    borderRadius: 5,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    border: 'transparent',
    padding: 20,
    zIndex: 2001,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: 'rgb(10, 52, 70)',
    margin: '0px auto',
  },
  button: {
    top: 5,
    right: 5,
    fontSize: 20,
    backgroundColor: 'transparent',
    border: 'none',
    position: 'absolute',
    outline: 'none',
    cursor: 'pointer',
  },
  text: {
    margin: '15px 0px',
    minWidth: 50,
    fontSize: 20,
    fontWeight: 300,
  },
  table: {
    margin: '20px 0px',
    minWidth: 50,
    fontSize: 20,
    fontWeight: 300,
    border: '1px solid #808080',
    backgroundColor: '#eef3f7',
    borderCollapse: 'collapse',
    width: '100%',
  },
  tr: {
    padding: 8,
    border: '1px solid #ddd',
  },
  tableTitle: {
    color: '#ffffff',
    padding: 8,
    border: '1px solid #5385ac',
    backgroundColor: '#4c7a9e',
    width: '20%',
  },
  tableContent: {
    padding: 8,
    border: '1px solid #5385ac',
    backgroundColor: '#eef3f7',
    width: '30%',
  },
};

class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
    const {
      courseId,
      getCourseDetail,
      getComments,
    } = this.props;
    getCourseDetail(courseId);
    getComments(courseId);
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const {
      eventHandler,
      course,
      comments,
    } = this.props;
    if (!course) return null;
    console.log(course);
    console.log(comments);
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.mainWrap}>
            <button
              style={styles.button}
              onClick={() => { eventHandler.onClick(); }}>
              <i className="fa fa-times" />
            </button>
            <div style={styles.titleWrapper}>
              <h2 style={styles.title}>課程詳細資訊</h2>
              <table border="1" style={styles.table}>
                <tr style={styles.tr}><td style={styles.tableTitle}>課程代號：</td><td colspan="3" style={styles.tableContent}>{course.subject_id}</td></tr>
                <tr style={styles.tr}><td style={styles.tableTitle}>課程中文名稱：</td><td colspan="3" style={styles.tableContent}>{course.course_name_ch}</td></tr>
                <tr style={styles.tr}><td style={styles.tableTitle}>課程英文名稱：</td><td colspan="3" style={styles.tableContent}>{course.course_name_en}</td></tr>
                <tr style={styles.tr}><td style={styles.tableTitle}>開課學期：</td><td style={styles.tableContent}>{course.semester}</td>
                  <td style={styles.tableTitle}>課程修別：</td><td style={styles.tableContent}>{course.course_type}修</td></tr>
                <tr style={styles.tr}><td style={styles.tableTitle}>學分數：</td>
                  <td style={styles.tableContent}>{course.credits}學分</td>
                  <td style={styles.tableTitle}>上課期數：</td><td style={styles.tableContent}>{course.num_semesters}學期</td></tr>
                <tr style={styles.tr}><td style={styles.tableTitle}>授課教師：</td><td style={styles.tableContent}>{course.teacher}</td>
                  <td style={styles.tableTitle}>開課單位：</td><td style={styles.tableContent}>{course.department}</td></tr>
                <tr style={styles.tr}><td style={styles.tableTitle}>上課時間：</td><td style={styles.tableContent}>{`${course.weekday || ''} ${course.begin_time && course.begin_time.match(/T(\d+:\d+)/i)[1]} - ${course.end_time && course.end_time.match(/T(\d+:\d+)/i)[1]}`}</td>
                  <td style={styles.tableTitle}>上課地點：</td><td style={styles.tableContent}>{course.location}</td></tr>
              </table>
              <h2 style={styles.title}>課程評價</h2>
              <ul>
                {comments[0] ? comments.map(comment => (
                  <li style={styles.text}>{comment.content || ''} 得分：{comment.score}</li>
                )) : <div>尚無評論</div>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseDetail.defaultProps = {
  course: null,
  comments: [],
};

CourseDetail.propTypes = {
  // redux
  getCourseDetail: T.func.isRequired,
  getComments: T.func.isRequired,
  clearState: T.func.isRequired,
  course: T.shape({}),
  comments: T.arrayOf(T.shape({})),
  // react
  eventHandler: T.shape({
    onClick: T.func.isRequired,
  }).isRequired,
  courseId: T.string.isRequired,
};

const reduxHook = connect(
  state => ({
    course: state.Detail.courseInfo,
    comments: state.Detail.comments,
  }),
  dispatch => bindActionCreators({
    ...detailActions,
  }, dispatch),
);

export default reduxHook(radium(CourseDetail));
