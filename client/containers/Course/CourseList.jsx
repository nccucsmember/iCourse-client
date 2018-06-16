import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CourseActions from '../../actions/Course.js';

import Theme from '../../styles/Theme.js';
import CourseSearcher from './CourseSearcher.jsx';

// components
import CourseDetail from '../Lightbox/CourseDetail.jsx';
import Pagination from '../../components/Pagination.jsx';


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
    width: '100%',
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
    minHeight: 80,
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
  empty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 80,
    margin: 8,
    textDecoration: 'none',
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 6,
    borderShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    padding: '0px 15px',
    fontSize: 16,
  },
};


const LIST_LIMITS = 10;

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLightbox: false,
      courseId: '',
      cursor: 0,
    };
  }
  componentWillMount() {
    const {
      getCourseList,
    } = this.props;

    getCourseList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tempQuery !== this.props.tempQuery) {
      this.setState({
        cursor: 0,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  render() {
    const {
      courses,
      getCourseList,
      tempQuery,
      count,
      haveAccessToken,
      addToTrackList,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.h1Wrapper}>
            <h1 style={styles.h1}>課程清單</h1>
          </div>
          <CourseSearcher />
          <div style={styles.coursesWraper}>
            <div style={[styles.headerWrapper]}>
              <span style={[styles.header, { flex: '1 1 50px' }]}>學期</span>
              <span style={[styles.header, { flex: '2 2 100px' }]}>課程名稱</span>
              <span style={[styles.header, { flex: '2 2 100px' }]}>任課教師</span>
              <span style={[styles.header, { flex: '2 2 100px' }]}>教室</span>
              <span style={[styles.header, { flex: '1.2 1.2 60px' }]}>開課院系</span>
              <span style={[styles.header, { flex: '1 1 50px' }]}>修別</span>
              <span style={[styles.header, { flex: '4 4 200px' }]}>上課時間</span>
              <span style={[styles.buttonWraper, { flex: '2 2 100px' }]}>更多資訊</span>
              <span style={[styles.buttonWraper, { flex: '2 2 100px' }]}>操作</span>
            </div>
            {courses[0] ? courses.map((course, index) => (
              <div key={course.course_id} style={styles.courseWrapper}>
                <div style={[styles.course, index % 2 !== 0 ? styles.courseRowEven : null]}>
                  <span style={[styles.text, { flex: '1 1 50px' }]}>{course.semester || ''}</span>
                  <span style={[styles.text, { flex: '2 2 100px' }]}>{course.course_name_ch || ''}</span>
                  <span style={[styles.text, { flex: '2 2 100px' }]}>{course.teacher || ''}</span>
                  <span style={[styles.text, { flex: '2 2 100px' }]}>{course.location || ''}</span>
                  <span style={[styles.text, { flex: '1.2 1.2 60px' }]}>{course.department || ''}</span>
                  <span style={[styles.text, { flex: '1 1 50px' }]}>{course.course_type || ''}</span>
                  <span style={[styles.text, { flex: '4 4 200px' }]}>
                    {`${course.weekday || ''} ${course.begin_time && course.begin_time.match(/T(\d+:\d+)/i)[1]} - ${course.end_time && course.end_time.match(/T(\d+:\d+)/i)[1]}`}
                  </span>
                  <button
                    onClick={() => {
                      this.setState({
                        courseId: course.subject_id,
                        showLightbox: true,
                      });
                    }}
                    style={[styles.detailButton, { flex: '2 2 100px' }]}>
                    more
                  </button>
                  <button
                    style={[styles.addButton, { flex: '2 2 140px' }]}
                    onClick={() => {
                      if (!haveAccessToken) {
                        const {
                          history,
                        } = this.props;
                        if (window.confirm('尚未登入, 是否前往登入?')) {
                          return history.replace('/login');
                        }
                        return null;
                      }
                      if (window.confirm('是否加入追蹤清單？')) {
                        addToTrackList(course.subject_id, (msg) => {
                          window.alert(`${course.course_name_ch}(${course.subject_id}):\n${msg}`);
                        });
                      }
                      return null;
                    }}>加入追蹤清單</button>
                </div>
              </div>
            )) : <div style={styles.empty}>查無資料</div>}
          </div>
          <Pagination
            total={count}
            limit={LIST_LIMITS}
            jumpToPage={(p) => {
              this.setState({
                cursor: (p - 1) * LIST_LIMITS,
              }, () => {
                getCourseList(tempQuery, {
                  limit: 10,
                  offset: this.state.cursor,
                });
              });
            }}
            currentCursor={this.state.cursor}
            disableForward={this.state.cursor > this.props.count || this.props.count < LIST_LIMITS}
            disableBackward={this.state.cursor <= 0 || this.props.count < LIST_LIMITS}
            forward={() => {
              this.setState({
                cursor: this.state.cursor + LIST_LIMITS,
              }, () => {
                getCourseList(tempQuery, {
                  limit: 10,
                  offset: this.state.cursor,
                });
              });
            }}
            backward={() => {
              this.setState({
                cursor: this.state.cursor - LIST_LIMITS,
              }, () => getCourseList(tempQuery, {
                limit: 10,
                offset: this.state.cursor,
              }));
            }} />
        </div>
        {
          this.state.showLightbox &&
          <CourseDetail
            courseId={this.state.courseId}
            eventHandler={{
              onClick: () => {
                this.setState({
                  showLightbox: false,
                });
              },
            }} />
        }
      </div>
    );
  }
}


const reduxHook = connect(
  state => ({
    courses: state.Course.courseList,
    count: state.Course.count,
    tempQuery: state.Course.submittedData,
    haveAccessToken: state.Auth.accessToken !== null,
  }),
  dispatch => bindActionCreators({
    ...CourseActions,
  }, dispatch)
);


CourseList.propTypes = {
  // redux
  getCourseList: T.func.isRequired,
  clearState: T.func.isRequired,
  addToTrackList: T.func.isRequired,
  courses: T.arrayOf(T.shape({})),
  count: T.number,
  tempQuery: T.shape({}),
  haveAccessToken: T.bool.isRequired,
  // Router
  history: T.shape({}).isRequired,
};

CourseList.defaultProps = {
  courses: [],
  count: 0,
  tempQuery: null,
};

export default reduxHook(
  radium(CourseList)
);
