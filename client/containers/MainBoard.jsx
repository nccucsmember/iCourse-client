import React, {
  Component as ReactComponent,
} from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router';
import { connect } from 'react-redux';

// Main
import SiteHeader from './SiteHeader.jsx';

// Routes
import CourseRoute from '../routes/Course.jsx';

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
                <Route path="/" component={CourseRoute} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainBoard;
