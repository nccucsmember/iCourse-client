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
    top: 300,
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
              <h2 style={styles.title}>課程評價</h2>
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
