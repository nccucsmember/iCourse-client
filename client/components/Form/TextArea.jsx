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
  textarea: {
    flex: 1,
    height: 160,
    fontSize: 14,
    lineHeight: 1.5,
    padding: 16,
    color: Theme.DEFAULT_COLOR,
    border: '1px solid rgba(140, 143, 147, 0.5)',
    borderRadius: 2,
    backgroundColor: '#fff',
    outline: 0,
    overflowY: 'auto',
    resize: 'none',
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
  errorTextArea: {
    border: `1px solid ${Theme.WARN_TEXT}`,
  },
  disableText: {
    color: 'rgba(0, 0, 0, 0.38)',
    cursor: 'default',
  },
  iconWrap: {
    position: 'absolute',
    right: 2,
    top: 0,
    pointerEvents: 'none',
  },
  icon: {
    width: 20,
    height: 20,
  },
};

type Props = {
  input: {
    value: String,
    onChange: Function,
    name: String,
  },
  style?: Object,
  wrapperStyle?: Object,
  placeholder?: String,
  label?: String,
  meta: {
    error: String,
  },
  disabled?: Boolean,
};

function TextArea({
  input: {
    value,
    onChange,
    name,
  },
  placeholder,
  label,
  style,
  wrapperStyle,
  disabled,
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
        <label htmlFor={name} style={styles.label}>
          {error && <span style={{ display: 'block', color: Theme.WARN_TEXT }}> ! </span>}
          <span style={styles.labelText}>{label || null}</span>
          <textarea
            id={name}
            key="input"
            value={value}
            onChange={e => onChange(e)}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            style={[
              styles.textarea,
              error && styles.errorTextArea,
              disabled && styles.disableText,
              ...customStyles,
            ]} />
        </label>
      </div>
    </div>
  );
}

TextArea.defaultProps = {
  style: {},
  wrapperStyle: {},
  placeholder: '',
  label: null,
  disabled: false,
};

export default radium(TextArea);
