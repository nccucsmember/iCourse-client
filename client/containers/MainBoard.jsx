import React, {
  Component as ReactComponent,
} from 'react';
import { PropTypes as T } from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router';
import { connect } from 'react-redux';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';

// Main
import SiteHeader from './SiteHeader.jsx';

// Routes
import CourseRoute from '../routes/Course.jsx';
import TrackingRoute from '../routes/Tracking.jsx';
import SelectRoute from '../routes/Select.jsx';

import backgrounImage from '../static/img/star.png';

const styles = {
  wrapper: {
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    // backgroundColor: '#EBEBEB',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 100,
    backgroundImage: `url(${backgrounImage})`,
    backgroundSize: 'cover',
  },
  content: {
    flex: 1,
    width: '100%',
    minHeight: '100vh',
  },
};

function ToLoginPage({
  haveAccessToken,
}) {
  if (haveAccessToken) {
    return (
      <Switch>
        <Route path="/select" component={SelectRoute} />
        <Route path="/tracking" component={TrackingRoute} />
        <Route path="/course" component={CourseRoute} />
        <Route path="/" component={CourseRoute} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/course" component={CourseRoute} />
      <Redirect
        from="/select" to={{
          pathname: '/login',
          state: { next: '/select' },
        }} />
      <Redirect
        from="/tracking" to={{
          pathname: '/login',
          state: { next: '/tracking' },
        }} />
      <Route path="/" component={CourseRoute} />
    </Switch>
  );
}

ToLoginPage.propTypes = {
  haveAccessToken: T.bool.isRequired,
};

const reduxHook = connect(
  state => ({
    haveAccessToken: state.Auth.accessToken !== null,
  })
);

const ClientRoute = reduxHook(ToLoginPage);

class MainBoard extends ReactComponent {
  componentDidUpdate() {
    window.scrollTo(0, 0); // always scroll to top when route change
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <Switch>
            <Route path="/login" component={props => <SiteHeader hide {...props} />} />
            <Route path="/register" component={props => <SiteHeader hide {...props} />} />
            <Route path="/" component={props => <SiteHeader {...props} />} />
          </Switch>
          <div style={styles.main}>
            <div style={styles.content}>
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={SignUpPage} />
                <Route path="/" component={ClientRoute} />
              </Switch>
            </div>
            <div>
              <a href="http://creativecommons.org/licenses/by-nc-nd/3.0/tw/">
                <img
                  style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px' }}
                  alt="創用 CC 授權條款"
                  src="https://i.creativecommons.org/l/by-nc-nd/3.0/tw/88x31.png" />
              </a>
            </div>
            <div>
              <footer
                style={{
                  margin: 10,
                  textAlign: 'center' }}>
                Copyright &copy; <a href="https://github.com/nccucsmember">2018 政大資科系 iCourse</a> All rights reserved.
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainBoard;
