import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import radium from 'radium';
import {
  reduxForm,
  Field,
} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/Course.js';

import Input from '../../components/Form/Input.jsx';
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
    height: 80,
    margin: 10,
    textDecoration: 'none',
    backgroundColor: 'rgba(233, 233, 233, 0.71)',
    borderRadius: 6,
    borderShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    padding: '0px 15px',
  },
  formWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  inputGroup: {
    display: 'flex',
    margin: 5,
  },
};

const FORM_NAME = 'COURSE_SEARCHER';

class CourseSearcher extends Component {
  submit(d) {
    const {
      // getShopListByKeyword,
    } = this.props;

    const {
      keyword,
    } = d;

    if (keyword) {
      // getShopListByKeyword(keyword);
    }
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
                style={{ width: 300 }}
                type="text"
                placeholder="課程名稱、任課教師名稱"
                component={Input}
                label="關鍵字"
                name="keyword" />
            </div>
            <SubmitButton label="查詢" />
          </form>
        </div>
      </div>
    );
  }
}

CourseSearcher.propTypes = {
  handleSubmit: T.func.isRequired,
};


const reduxHook = connect(
  () => ({
  }),
  dispatch => bindActionCreators({
    ...courseActions,
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
