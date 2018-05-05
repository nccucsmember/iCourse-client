// @flow

import React from 'react';

import Theme from '../../styles/Theme.js';

const styles = {
  innerBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  plus: {
    fontSize: 16,
    fontWeight: 500,
    color: Theme.ACTIVE_COLOR,
  },
  plusLabel: {
    fontSize: 16,
    color: Theme.ACTIVE_COLOR,
    padding: '4px 0',
  },
  sizeHintWrapper: {
    width: '100%',
    padding: '4px 0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintLabel: {
    fontSize: 14,
    color: Theme.ACTIVE_COLOR,
    opacity: 0.5,
  },
};

function ImageUploadHintBox() {
  return (
    <div style={styles.innerBox}>
      <span className="fa fa-plus" style={styles.plus} />
      <span style={styles.plusLabel}>上傳圖片</span>
      <div style={styles.sizeHintWrapper}>
        <span style={styles.hintLabel}>圖片建議尺寸 800 x 500</span>
      </div>
    </div>
  );
}

export default ImageUploadHintBox;
