// @flow

import React from 'react';
import radium from 'radium';

import Theme from '../../styles/Theme.js';

const styles = {
  selectGroup: {
    display: 'flex',
    alignItems: 'center',
    padding: 8,
  },
  groupFlex: {
    flex: 1,
  },
  innerWrap: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  columnWrapper: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    color: Theme.DEFAULT_COLOR,
    padding: '0 5px 0 0',
    letterSpacing: 2,
  },
  formLabel: {
    width: 95,
    padding: '0 10px 5px 5px',
  },
  selectSvgWrap: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 16,
    height: 16,
    pointerEvents: 'none',
    borderRadius: '0 1px 1px 0',
  },
  selector: {
    width: 'auto',
    minWidth: 120,
    border: 'none',
    backgroundColor: 'rgb(234, 234, 234)',
    appearance: 'none',
    WebkitAppearance: 'none',
    borderRadius: 2,
    padding: '8px 35px 8px 14px',
    fontSize: 14,
    color: Theme.DEFAULT_COLOR,
    cursor: 'pointer',
    outline: 'none',
  },
  selectorTrangle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '6px 6px 0 6px',
    borderColor: `${Theme.DEFAULT_COLOR} transparent transparent transparent`,
  },
  error: {
    border: `1px solid ${Theme.WARN_TEXT}`,
  },
  disabled: {
    cursor: 'default',
  },
};

type Props = {
  options: Array,
  input: {
    name: String,
    value: String | Number,
    onChange: Function,
  },
  label?: String,
  placeholder?: String,
  nullable?: Boolean,
  isForm?: Boolean,
  disabled?: Boolean,
  meta: {
    error: String,
  },
};

function Selector({
  label,
  options,
  input: {
    name,
    value,
    onChange,
  },
  nullable,
  placeholder,
  isForm,
  disabled,
  meta: {
    error,
  },
}: Props) {
  return (
    <div
      style={[
        styles.selectGroup,
      ]}>
      <div style={styles.innerWrap}>
        {error && <span style={{ display: 'block', color: Theme.WARN_TEXT }}> ! </span>}
        {label ? (
          <span style={[styles.label, isForm && styles.formLabel]}>
            {label}
          </span>
        ) : null}
        <div style={styles.innerWrap}>
          <select
            name={name}
            disabled={disabled}
            style={[styles.selector, disabled && styles.disabled, error && styles.error]}
            value={value}
            onChange={e => onChange(e.target.value)}>
            {nullable ? <option key="-1" value="-1">{placeholder}</option> : null}
            {options ? options.map(t => (
              <option
                key={t.id}
                value={t.id}>
                {t.name}
              </option>
            )) : null}
          </select>
          {!disabled ? (
            <div style={styles.selectSvgWrap}>
              <div style={styles.selectorTrangle} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

Selector.defaultProps = {
  nullable: false,
  placeholder: '請選擇',
  label: null,
  isForm: false,
  disabled: false,
};

export default radium(Selector);
