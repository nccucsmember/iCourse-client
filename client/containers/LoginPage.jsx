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

import * as authActions from '../actions/Auth.js';

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

class LoginPage extends Component {
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
      history,
      haveAccessToken,
    } = this.props;
    if (nextProp.haveAccessToken !== haveAccessToken && nextProp.haveAccessToken) {
      history.goBack();
    }
  }

  submit(data) {
    const {
      login,
    } = this.props;

    if (!data.email) {
      throw new SubmissionError({ email: '未填寫' });
    }
    if (!data.password) {
      throw new SubmissionError({ password: '未填寫' });
    }

    return login(data, (errorMessage) => {
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
                <h1 style={styles.h1}>登入</h1>
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
                  type="text"
                  component={Input}
                  name="password"
                  label="密碼：" />
                <SubmitButton label="登入" />
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

LoginPage.propTypes = {
  // reduxForm
  handleSubmit: T.func.isRequired,
  // redux
  login: T.func.isRequired,
  haveAccessToken: T.bool.isRequired,
  // router
  history: T.shape({}).isRequired,
};

LoginPage.defaultProp = {

};

const reduxHook = connect(
  state => ({
    haveAccessToken: state.Auth.accessToken !== null,
  }), dispatch => bindActionCreators({
    ...authActions,
  }, dispatch)
);

const reduxFormHook = reduxForm({
  form: FORM_NAME,
});

export default reduxFormHook(
  reduxHook(
    radium(LoginPage)
  )
);
