import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import radium from 'radium';
import { Link as link } from 'react-router-dom';

import logo from '../static/img/NCCU-logo.png';
import { SITE_LINKS } from '../helper/setting.js';

// import * as AuthActions from '../actions/Auth.js';

const styles = {
  wrapper: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#4c7b9f',
    zIndex: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 70,
    margin: '10px 10px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  right: {

  },
  image: {
    height: 60,
    width: 60,
    margin: 10,
  },
  linkSiteButton: {
    fontSize: 15,
    lineHeight: 1.7,
    textAlign: 'left',
    color: '#fefefe',
    fontWeight: 200,
    margin: 10,
    backgroundColor: 'transparent',
    padding: '6px 20px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
  active: {
    border: '2px solid rgb(245, 166, 67)',
    borderRadius: '6px',
  },
  linkButton: {
    fontSize: 15,
    lineHeight: 1.7,
    textAlign: 'left',
    color: '#fefefe',
    fontWeight: 200,
    margin: 10,
    backgroundColor: 'transparent',
    padding: '6px 24px',
    borderRadius: '6px',
    border: '0.5px solid #fefefe',
    cursor: 'pointer',
    transition: 'all 0.12s ease-out',
    ':hover': {
      backgroundColor: '#fefefe',
      color: 'black',
      fontWeight: 300,
    },
  },
  logoutButton: {
    outline: 'none',
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#444',
  },
};

const Link = radium(link);

class SiteHeader extends Component {
  render() {
    const {
      location: {
        pathname,
      },
      hide,
      account,
      logout,
    } = this.props;

    if (hide) {
      return null;
    }

    const pathArray = pathname.split('/').filter(p => p);
    const currentPath = pathArray.length ? pathArray[0] : null;
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.left}>
            <Link to="/">
              <img style={styles.image} src={logo} alt="政治大學" />
            </Link>
            {SITE_LINKS.map(category => (
              <Link
                key={category.id}
                to={`/${category.id}`}>
                <button
                  style={[styles.linkSiteButton,
                    currentPath === category.id ? styles.active : null,
                  ]}>{category.name}</button>
              </Link>
            ))}
          </div>
          <div style={styles.right}>
            {account ?
              (<span>Hi, {account}
                <button style={styles.logoutButton} onClick={() => logout()}>(logout)</button>
              </span>)
              : [
                <Link key="login" to="/login">
                  <button style={styles.linkButton}>登入</button>
                </Link>,
                <Link key="register" to="/register">
                  <button style={styles.linkButton}>註冊</button>
                </Link>,
              ]}
          </div>
        </div>
      </div>
    );
  }
}

SiteHeader.propTypes = {
  hide: T.bool,
  account: T.string,
  logout: T.func,
  location: T.shape({
    pathname: T.string,
  }).isRequired,
};

SiteHeader.defaultProps = {
  hide: false,
  account: null,
  logout: null,

};


const reduxHook = connect(
  state => ({
    // account: state.Auth.account || null,
  }),
  dispatch => bindActionCreators({
    // ...AuthActions,
  }, dispatch)
);

export default
reduxHook(
  radium(SiteHeader)
);
