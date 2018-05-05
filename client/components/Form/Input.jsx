// @flow

import React from 'react';
import radium from 'radium';

import Theme from '../../styles/Theme.js';

const styles = {
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerWrap: {
    width: '100%',
    display: 'flex',
    position: 'relative',
  },
  columnWrapper: {
    flexDirection: 'column',
  },
  label: {
    width: '100%',
    fontSize: 14,
    color: Theme.DEFAULT_COLOR,
    padding: '4px 8px',
    letterSpacing: 2,
    whiteSpace: 'nowrap',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  labelText: {
    width: 95,
    padding: '0 10px 5px 5px',
  },
  prefix: {
    fontSize: 14,
    color: Theme.DEFAULT_COLOR,
    padding: '0 2px 0 4px',
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: '8px 8px 10px 10px',
    color: Theme.DEFAULT_COLOR,
    border: '1px solid rgba(140, 143, 147, 0.5)',
    borderRadius: 2,
    backgroundColor: '#fff',
    outline: 0,
    '::-webkit-input-placeholder': {
      color: 'rgba(0, 0, 0, 0.28)',
    },
    ':focus': {
      border: `1px solid ${Theme.ACTIVE_COLOR}`,
    },
  },
  disable: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  errorInput: {
    border: `1px solid ${Theme.WARN_TEXT}`,
  },
  disableText: {
    color: 'rgba(0, 0, 0, 0.38)',
    cursor: 'default',
  },
};

type Props = {
  input: {
    value: String,
    name: String,
    onChange: Function,
  },
  placeholder?: String,
  label?: String,
  type?: String,
  style?: Object,
  wrapperStyle?: Object,
  disabled?: Boolean,
  prefix?: String,
  meta: {
    error: String,
  },
};

function Input({
  input: {
    value,
    onChange,
    name,
  },
  placeholder,
  label,
  type,
  style,
  wrapperStyle,
  disabled,
  prefix,
  meta: {
    error,
  },
}: Props) {
  const customStyles = Array.isArray(style) ? style : [style];
  const customWrapperStyles = Array.isArray(wrapperStyle) ? wrapperStyle : [wrapperStyle];

  return (
    <div
      style={[
        styles.wrapper,
        ...customWrapperStyles,
      ]}>
      <div style={styles.innerWrap}>
        <label htmlFor={name} style={[styles.label]}>
          {error && <span style={{ display: 'block', color: Theme.WARN_TEXT }}> ! </span>}
          {label ? <span style={styles.labelText}>{label}</span> : null}
          {prefix ? <span style={styles.prefix}>{prefix}</span> : null}
          <input
            id={name}
            key="input"
            type={type}
            value={value}
            onChange={e => onChange(e)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            style={[
              styles.input,
              error && styles.errorInput,
              disabled && styles.disableText,
              ...customStyles,
            ]} />
        </label>
      </div>
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  style: [],
  wrapperStyle: [],
  placeholder: '',
  label: null,
  disabled: false,
  prefix: null,
};

export default radium(Input);
