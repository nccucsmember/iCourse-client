// @flow

import React, { Component } from 'react';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes as T } from 'prop-types';

import * as detailActions from '../../actions/Detail.js';

import { COMMENTS_ORDER_TYPES } from '../../helper/setting.js';

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
    margin: '0px 0px',
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
    flexDirection: 'column',
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
  commentHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyConent: 'flex-start',
  },
  orderType: {
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: 300,
    cursor: 'pointer',
    outline: 'none',
    margin: 5,
    padding: 3,
  },
  activeType: {
    borderBottom: '1.5px solid #333',
    fontWeight: '500',
    color: '#333',
  },
};

class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderType: 'descent',
    };
  }

  componentWillMount() {
    const {
      courseId,
      getCourseDetail,
      getComments,
      getAverageScore,
      checkThumbUp,
    } = this.props;
    const {
      orderType,
    } = this.state;
    getCourseDetail(courseId);
    getComments(courseId, orderType);
    getAverageScore(courseId);
    checkThumbUp(courseId);
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
      courseId,
      userThumbupList,
      clickThumUp,
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
              <table border="1" style={styles.table}>
                <tbody>
                  <tr style={styles.tr}><td style={styles.tableTitle}>課程代號：</td><td colSpan="3" style={styles.tableContent}>{course.subject_id}</td></tr>
                  <tr style={styles.tr}><td style={styles.tableTitle}>課程中文名稱：</td><td colSpan="3" style={styles.tableContent}>{course.course_name_ch}</td></tr>
                  <tr style={styles.tr}><td style={styles.tableTitle}>課程英文名稱：</td><td colSpan="3" style={styles.tableContent}>{course.course_name_en}</td></tr>
                  <tr style={styles.tr}><td style={styles.tableTitle}>開課學期：</td><td style={styles.tableContent}>{course.semester}</td>
                    <td style={styles.tableTitle}>課程修別：</td><td style={styles.tableContent}>{course.course_type}修</td></tr>
                  <tr style={styles.tr}><td style={styles.tableTitle}>學分數：</td>
                    <td style={styles.tableContent}>{course.credits}學分</td>
                    <td style={styles.tableTitle}>上課期數：</td><td style={styles.tableContent}>{course.num_semesters}學期</td></tr>
                  <tr style={styles.tr}><td style={styles.tableTitle}>授課教師：</td><td style={styles.tableContent}>{course.teacher}</td>
                    <td style={styles.tableTitle}>開課單位：</td><td style={styles.tableContent}>{course.department}</td></tr>
                  <tr style={styles.tr}><td style={styles.tableTitle}>上課時間：</td><td style={styles.tableContent}>{`${course.weekday || ''} ${course.begin_time && course.begin_time.match(/T(\d+:\d+)/i)[1]} - ${course.end_time && course.end_time.match(/T(\d+:\d+)/i)[1]}`}</td>
                    <td style={styles.tableTitle}>上課地點：</td><td style={styles.tableContent}>{course.location}</td></tr>
                </tbody>
              </table>
              <div style={styles.commentHeaderWrapper}>
                <h2 style={styles.title}>課程評價 (平均：{averageScore || '尚未評分'})</h2>
                {COMMENTS_ORDER_TYPES.map(item => (
                  <button
                    style={[styles.orderType, item.id === this.state.orderType ? styles.activeType : { borderBottom: 'none' }]}
                    key={item.id}
                    onClick={() => {
                      this.setState({
                        orderType: item.id,
                      }, () => {
                        this.props.getComments(courseId, this.state.orderType);
                      });
                    }}>{item.name}</button>
                ))}
              </div>
              <div style={styles.commentsWrapper}>
                <ul style={styles.listItemWrapper}>
                  {comments[0] ? comments.map(comment => (
                    <li key={comment.id} style={styles.listItem}>
                      {comment.content || ''}
                      <button
                        disabled={!localStorage.authorization}
                        onClick={() => {
                          if (userThumbupList.find(item => item === comment.id)) {
                            clickThumUp(comment.id, 'DELETE');
                          } else {
                            clickThumUp(comment.id, 'PUT');
                          }
                        }}
                        style={[styles.thumbup, !localStorage.authorization && { cursor: 'auto' }]}>
                        {
                          userThumbupList.find(item => item === comment.id) ?
                            <span style={{ color: '#5b5bff' }}><i className="fa fa-thumbs-up" />{comment.good}</span> :
                            <span><i className="fa fa-thumbs-up" />{comment.good}</span>
                        }
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
  userThumbupList: [],
};

CourseDetail.propTypes = {
  // redux
  getCourseDetail: T.func.isRequired,
  getComments: T.func.isRequired,
  clearState: T.func.isRequired,
  getAverageScore: T.func.isRequired,
  checkThumbUp: T.func.isRequired,
  clickThumUp: T.func.isRequired,
  course: T.shape({}),
  comments: T.arrayOf(T.shape({})),
  averageScore: T.number,
  userThumbupList: T.arrayOf(T.number),
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
    userThumbupList: state.Detail.commentsWithClickedThumbup,
  }),
  dispatch => bindActionCreators({
    ...detailActions,
  }, dispatch),
);

export default reduxHook(radium(CourseDetail));
