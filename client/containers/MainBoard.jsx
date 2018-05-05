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
    backgroundColor: 'rgba(248, 248, 248, 0.95)',
    display: 'flex',
    flexDirection: 'column',
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
            <Route path="/" component={() => <SiteHeader />} />
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
