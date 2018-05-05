import React, {
  Component,
} from 'react';
import { PropTypes as T } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import radium from 'radium';
import { Link } from 'react-router-dom';

import logo from '../static/img/NCCU-logo.png';
import SITE_LINKS from '../helper/setting.js';

// import * as AuthActions from '../actions/Auth.js';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#4c7b9f',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 70,
    margin: '0px 10px',
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
    padding: '6px 24px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'opacity 0.12s ease-out',
  },
  active: {
    border: '0.5px solid #fefefe',
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


class SiteHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: null,
    };
  }

  render() {
    const {
      hide,
      account,
      logout,
    } = this.props;

    if (hide) {
      return null;
    }
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <div style={styles.left}>
            <Link to="/">
              <img style={styles.image} src={logo} alt="政治大學" />
            </Link>
            {SITE_LINKS.map(category => (
              <Link key={category.id} to={`/${category.id}`}>
                <button
                  onClick={() => {
                    this.setState(() => ({
                      activeCategory: category.id,
                    }));
                  }}
                  style={[styles.linkSiteButton,
                    this.state.activeCategory === category.id ? styles.active : null,
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
