import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';
import {
  reduxForm,
  Field,
  reset,
} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/Course.js';

import {
  COURSE_TIME,
  COURSE_TYPE,
  DEPTS,
  GENERAL_COURSE_TYPE,
} from '../../helper/setting.js';

import Input from '../../components/Form/Input.jsx';
import CheckBoxGroup from '../../components/Form/CheckboxGroup.jsx';
import Selector from '../../components/Form/Selector.jsx';
import SubmitButton from '../../components/Form/SubmitButton.jsx';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    margin: 10,
    textDecoration: 'none',
    backgroundColor: 'rgba(233, 233, 233, 0.71)',
    borderRadius: 6,
    borderShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    padding: '0px 15px',
  },
  formWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 20,
  },
  inputGroup: {
    display: 'flex',
  },
  resetButton: {
    fontSize: 14,
    border: 0,
    borderRadius: 5,
    padding: '6px 24px',
    margin: '0 8px',
    color: '#fff',
    backgroundColor: '#fd6868',
    cursor: 'pointer',
    ':hover': {
      opacity: 0.88,
    },
  },
};

const FORM_NAME = 'COURSE_SEARCHER';

class CourseSearcher extends Component {
  submit(data) {
    const {
      getCourseList,
      saveSubmitData,
    } = this.props;

    const submitData = {
      ...data,
    };
    getCourseList(submitData);
    saveSubmitData(submitData);
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <form style={styles.formWrapper} onSubmit={handleSubmit(d => this.submit(d))}>
            <div style={styles.inputGroup}>
              <Field
                style={{
                  width: 300,
                }}
                type="text"
                placeholder="課程名稱"
                component={Input}
                label="課程名稱"
                name="course_name_ch" />
              <Field
                style={{
                  width: 150,
                }}
                type="text"
                placeholder="任課教師"
                component={Input}
                label="任課教師"
                name="teacher" />
            </div>
            <div style={styles.inputGroup}>
              <Field
                component={Selector}
                nullable
                options={DEPTS}
                label="開課單位："
                name="department" />
              <Field
                component={Selector}
                nullable
                options={GENERAL_COURSE_TYPE}
                label="通識類別："
                name="general_type" />
            </div>
            <div style={styles.inputGroup}>
              <Field
                component={CheckBoxGroup}
                options={COURSE_TIME}
                label="開課時間："
                name="weekday" />
            </div>
            <div style={styles.inputGroup}>
              <Field
                component={CheckBoxGroup}
                options={COURSE_TYPE}
                label="課程類別："
                name="course_type" />
            </div>
            <div style={styles.inputGroup}>
              <SubmitButton label="查詢" />
              <button
                style={styles.resetButton}
                onClick={() => {
                  this.props.reset();
                }}>重設選項</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CourseSearcher.propTypes = {
  handleSubmit: T.func.isRequired,
  getCourseList: T.func.isRequired,
  saveSubmitData: T.func.isRequired,
  reset: T.func.isRequired,
};

CourseSearcher.defaultProps = {
};

const reduxHook = connect(
  () => ({
  }),
  dispatch => bindActionCreators({
    ...courseActions,
    ...reset(FORM_NAME),
  }, dispatch)
);

const reduxFormHook = reduxForm({
  form: FORM_NAME,
});

export default reduxHook(
  reduxFormHook(
    radium(CourseSearcher)
  )
);
