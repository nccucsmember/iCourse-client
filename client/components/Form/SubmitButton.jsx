// @flow

import React from 'react';
import radium from 'radium';

import Theme from '../../styles/Theme.js';

const styles = {
  button: {
    fontSize: 14,
    border: 0,
    borderRadius: 5,
    padding: '6px 24px',
    margin: '0 8px',
    color: '#fff',
    backgroundColor: Theme.ACTIVE_COLOR,
    cursor: 'pointer',
    ':hover': {
      opacity: 0.88,
    },
  },
  hollow: {
    color: Theme.ACTIVE_COLOR,
    backgroundColor: 'transparent',
  },
};

type Props = {
  label?: String,
  style?: Object,
  hollow?: Boolean,
};

function SubmitButton({
  label,
  style,
  hollow,
}: Props) {
  return (
    <button
      type="submit"
      style={[
        styles.button,
        hollow && styles.hollow,
        style,
      ]}>
      {label}
    </button>
  );
}

SubmitButton.defaultProps = {
  label: '送出',
  style: {},
  hollow: false,
};

export default radium(SubmitButton);
