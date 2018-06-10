import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import radium from 'radium';
import {
  reduxForm,
  Field,
  SubmissionError,
} from 'redux-form';

import * as registerActions from '../actions/Register.js';

import SubmitButton from '../components/Form/SubmitButton.jsx';
import Input from '../components/Form/Input.jsx';

import Theme from '../styles/Theme';

import cover from '../static/img/logo.png';

const FORM_NAME = 'LOGIN_FROM';

const styles = {
  wrapper: {
    height: 800,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverWrapper: {
    display: 'flex',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    display: 'flex',
    width: '50%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    border: 'transparent',
    backgroundColor: 'rgb(255,255,255, 0.8)',
    borderRadius: '7px',
    width: '450px',
    height: '450px',
    padding: 15,
  },
  cover: {
    backgroundImage: `url(${cover})`,
    width: 600,
    height: 245,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    flex: 1,
  },
  h1: {
    margin: 0,
    color: Theme.TITLE_COLOR,
  },
  error: {
    color: 'red',
    margin: 5,
  },
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: '',
    };
  }

  componentWillMount() {
    const {
      history,
      haveAccessToken,
    } = this.props;
    if (haveAccessToken) {
      history.replace('/');
    }
  }

  componentWillReceiveProps(nextProp) {
    const {
      history: {
        replace,
        location,
      },
      haveAccessToken,
    } = this.props;
    if (nextProp.haveAccessToken !== haveAccessToken && nextProp.haveAccessToken) {
      if (location.state) {
        replace(location.state.next);
      } else {
        replace('/');
      }
    }
  }

  submit(data) {
    const {
      register,
    } = this.props;

    if (!data.schoolid) {
      throw new SubmissionError({ schoolid: '未填寫' });
    }
    if (!data.email) {
      throw new SubmissionError({ email: '未填寫' });
    }
    if (!data.password) {
      throw new SubmissionError({ password: '未填寫' });
    }
    if (!data.password_confirmation) {
      throw new SubmissionError({ password_confirmation: '未填寫' });
    }

    return register({user: ...data}, (errorMessage) => {
      this.setState({
        errorText: errorMessage,
      });
    });
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.formWrapper} >
            <div style={styles.form}>
              <form onSubmit={handleSubmit(d => this.submit(d))}>
                <h1 style={styles.h1}>註冊</h1>
                <Field
                  style={{
                    width: 300,
                  }}
                  type="text"
                  component={Input}
                  name="schoolid"
                  label="學號：" />
                <Field
                  style={{
                    width: 300,
                  }}
                  type="text"
                  component={Input}
                  name="email"
                  label="帳號：" />
                <Field
                  style={{
                    width: 300,
                  }}
                  type="password"
                  component={Input}
                  name="password"
                  label="密碼：" />
                <Field
                  style={{
                    width: 300,
                  }}
                  type="password"
                  component={Input}
                  name="password_confirmation"
                  label="確認密碼：" />
                <SubmitButton label="送出" />
              </form>
              <span style={styles.error}>{this.state.errorText}</span>
            </div>
          </div>
          <div style={styles.coverWrapper}>
            <div style={styles.cover} />
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  // reduxForm
  handleSubmit: T.func.isRequired,
  // redux
  register: T.func.isRequired,
  haveAccessToken: T.bool.isRequired,
  // router
  history: T.shape({}).isRequired,
};

SignUpPage.defaultProp = {

};

const reduxHook = connect(
  state => ({
    haveAccessToken: state.Register.accessToken !== null,
  }), dispatch => bindActionCreators({
    ...registerActions,
  }, dispatch)
);

const reduxFormHook = reduxForm({
  form: FORM_NAME,
});

export default reduxFormHook(
  reduxHook(
    radium(SignUpPage)
  )
);

