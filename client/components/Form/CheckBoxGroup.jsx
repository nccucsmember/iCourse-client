// @flow

import React, { Component } from 'react';
import radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  arrayRemove,
  arrayPush,
  arrayRemoveAll,
} from 'redux-form';
import includes from 'lodash/includes';

import Theme from '../../styles/Theme.js';

const styles = {
  groupWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 4px',
  },
  optionBtn: {
    width: 20,
    height: 20,
    borderRadius: 2,
    padding: 2,
    border: `1px solid ${Theme.DEFAULT_COLOR}`,
    backgroundColor: 'transparent',
    outline: 0,
    cursor: 'pointer',
    ':hover': {
      opacity: 0.88,
    },
  },
  actived: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.ACTIVE_COLOR,
  },
  label: {
    fontSize: 14,
    color: Theme.DEFAULT_COLOR,
    padding: '4px 8px',
    letterSpacing: 2,
    whiteSpace: 'nowrap',
  },
};

type Props = {
  pushId: Function,
  removeIndex: Function,
  resetArrayValues: Function,
  shouldReset?: Boolean, // Flag checking value is changing from api(no reset) or user(reset needed)
  options: Array<Object>,
  input: {
    value: Array<Number> | Array<String>, // value should not be an object
  },
};

class CheckBoxGroup extends Component {
  componentWillReceiveProps({
    options,
    resetArrayValues,
    shouldReset,
  }) {
    if (options !== this.props.options && options) {
      if (shouldReset) resetArrayValues();
    }
  }

  isActive(optionId) {
    const {
      input: {
        value,
      },
    } = this.props;

    if (!value && !Array.isArray(value)) return false;

    return includes(value.map(v => parseInt(v, 10)), parseInt(optionId, 10));
  }

  handleChange(optionId) {
    const {
      input: {
        value,
      },
      pushId,
      removeIndex,
    } = this.props;

    const isActived = this.isActive(optionId);

    if (isActived) {
      const valueIndex = value.findIndex(v => parseInt(v, 10) === parseInt(optionId, 10));

      if (~valueIndex) return removeIndex(valueIndex);

      return null;
    }

    return pushId(parseInt(optionId, 10));
  }

  props: Props

  render() {
    const {
      options,
    } = this.props;

    if (!options) return null;

    return (
      <div style={styles.groupWrapper}>
        {options[0] ? options.map(option => (
          <div key={option.id} style={styles.optionWrapper}>
            <button
              key={`${option.id}_button`}
              type="button"
              onClick={() => this.handleChange(option.id)}
              style={styles.optionBtn}>
              {this.isActive(option.id) ? (
                <div style={styles.actived} />
              ) : null}
            </button>
            <span style={styles.label}>{option.name || null}</span>
          </div>
        )) : null}
      </div>
    );
  }
}

CheckBoxGroup.defaultProps = {
  shouldReset: true,
};

export function wrapFormToCheckBoxGroup(formName, fieldName) {
  if (!formName || !fieldName) return null;

  return connect(
    () => ({}),
    dispatch => bindActionCreators({
      pushId: v => arrayPush(formName, fieldName, v),
      removeIndex: index => arrayRemove(formName, fieldName, parseInt(index, 10)),
      resetArrayValues: () => arrayRemoveAll(formName, fieldName),
    }, dispatch)
  )(radium(CheckBoxGroup));
}

export default radium(CheckBoxGroup);
