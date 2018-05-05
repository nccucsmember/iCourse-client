// @flow

import React from 'react';

import FormStyles from '../../styles/Form.js';

const styles = {
  ...FormStyles,
};

type Props = {
  text: String,
};

function Error({
  text,
}: Props) {
  return (
    <div style={styles.errorWrapper}>
      <span style={styles.error}>{text || null}</span>
    </div>
  );
}

export default Error;
