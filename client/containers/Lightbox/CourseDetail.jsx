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
    maxHeight: '80%',
    width: '90%',
    backgroundColor: '#eee',
    position: 'relative',
    top: 100,
    borderRadius: 5,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    border: 'transparent',
    padding: 20,
    zIndex: 2001,
    overflowY: 'scroll',
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
  thumbup: {
    border: 'none',
    margin: 5,
    outline: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  commentsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  listItemWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 0px',
    padding: 0,
  },
  listItem: {
    fontSize: 17,
    listStyleType: 'none',
    margin: '8px 0px',
    padding: '0 0.75rem',
    borderLeft: '2px solid #d2d5e4',
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
      getAverageScore,
    } = this.props;
    getCourseDetail(courseId);
    getComments(courseId);
    getAverageScore(courseId);
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
      averageScore,
    } = this.props;
    if (!course) return null;
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
              <ul>
                <li style={styles.text}>課程代號：{course.subject_id}</li>
                <li style={styles.text}>課程中文名稱：{course.course_name_ch}</li>
                <li style={styles.text}>課程英文名稱：{course.course_name_en}</li>
                <li style={styles.text}>開課學期：{course.semester}</li>
                <li style={styles.text}>課程修別：{course.course_type}修</li>
                <li style={styles.text}>學分數：{course.credits}學分</li>
                <li style={styles.text}>上課期數：{course.num_semesters}學期</li>
                <li style={styles.text}>授課教師：{course.teacher}</li>
                <li style={styles.text}>開課單位：{course.department}</li>
                <li style={styles.text}>上課時間：{`${course.weekday || ''} ${course.begin_time && course.begin_time.match(/T(\d+:\d+)/i)[1]} - ${course.end_time && course.end_time.match(/T(\d+:\d+)/i)[1]}`}</li>
                <li style={styles.text}>上課地點：{course.location}</li>
              </ul>
              <h2 style={styles.title}>課程評價 (平均：{averageScore || '尚未評分'})</h2>
              <div style={styles.commentsWrapper}>
                <ul style={styles.listItemWrapper}>
                  {comments[0] ? comments.map(comment => (
                    <li key={comment.id} style={styles.listItem}>
                      {comment.content || ''}（評分: {comment.score})
                      <button
                        style={styles.thumbup}>
                        <i className="fa fa-thumbs-up" />{comment.good}
                      </button>
                    </li>
                  )) : <div>尚無評論</div>}
                </ul>
              </div>
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
  averageScore: null,
};

CourseDetail.propTypes = {
  // redux
  getCourseDetail: T.func.isRequired,
  getComments: T.func.isRequired,
  clearState: T.func.isRequired,
  getAverageScore: T.func.isRequired,
  course: T.shape({}),
  comments: T.arrayOf(T.shape({})),
  averageScore: T.number,
  // react
  eventHandler: T.shape({
    onClick: T.func.isRequired,
  }).isRequired,
  courseId: T.string.isRequired,
};

const reduxHook = connect(
  state => ({
    course: state.Detail.courseInfo,
    averageScore: state.Detail.averageScore,
    comments: state.Detail.comments,
  }),
  dispatch => bindActionCreators({
    ...detailActions,
  }, dispatch),
);

export default reduxHook(radium(CourseDetail));
