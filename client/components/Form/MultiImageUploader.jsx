// @flow

import React from 'react';
import radium from 'radium';

import { uploadFiles } from '../../helper/uploader.js';

type Props = {
  input: {
    name: string,
  },
  accept?: string,
  existedList?: Array<string>,
  disabled?: Boolean,
};

const styles = {
  formPhotoWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(227, 139, 47, 0.05)',
    },
  },
  formInputUploader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: 0,
  },
  disabled: {
    display: 'none',
  },
};

function MultiImageUploader(props: Props) {
  const {
    input: {
      name,
      onChange,
      value,
    },
    accept,
    existedList,
    disabled,
  } = props;

  return (
    <div style={[styles.formPhotoWrapper, disabled && styles.disabled]}>
      <input
        multiple
        type="file"
        accept={accept}
        key={`${value}-fileInput`}
        onChange={e => e.target.files.length && uploadFiles(e.target.files, onChange, existedList)}
        style={styles.formInputUploader} />
      <input
        type="hidden"
        key={name}
        name={name}
        value={value} />
    </div>
  );
}

MultiImageUploader.defaultProps = {
  accept: 'image/*',
  existedList: [],
  disabled: false,
};

export default radium(MultiImageUploader);
