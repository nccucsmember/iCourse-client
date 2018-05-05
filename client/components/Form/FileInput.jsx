// @flow

import React, { Fragment } from 'react';
import radium from 'radium';

import Image from './Image.jsx';
import { uploadFile } from '../../helper/uploader.js';
import Theme from '../../styles/Theme.js';

const styles = {
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  innerWrap: {
    display: 'flex',
    position: 'relative',
  },
  label: {
    flex: 1,
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
  input: {
    flex: 1,
    fontSize: 14,
    padding: '8px 8px 10px 10px',
    color: Theme.DEFAULT_COLOR,
    borderRadius: 2,
    outline: 0,
  },
  inputHideText: {
    color: 'transparent',
  },
  previewWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 120,
    height: 90,
    margin: '0 12px',
  },
  previewLink: {
    fontSize: 14,
  },
};

type Props = {
  style?: Object,
  wrapperStyle?: Object,
  input: {
    value: String,
    onChange: Function,
    name: String,
  },
  label?: String,
  imageOnly?: Boolean,
  preview?: Boolean,
};

function FileInput({
  input: {
    value,
    onChange,
    name,
  },
  imageOnly,
  label,
  style,
  wrapperStyle,
  preview,
}: Props) {
  const customStyles = Array.isArray(style) ? style : [style];
  const customWrapperStyles = Array.isArray(wrapperStyle) ? wrapperStyle : [wrapperStyle];

  return (
    <div
      style={[
        styles.wrapper,
        ...customWrapperStyles,
      ]}>
      <label htmlFor="fileInput" style={[styles.label]}>
        <span style={styles.labelText}>{label || null}</span>
        <input
          id="fileInput"
          key="fileInput"
          type="file"
          name={name}
          value=""
          accept={imageOnly ? 'image/*' : null}
          onChange={(e) => {
            if (e.target.files[0] && e.target.files[0].size > 2000000) {
              e.target.value = null;
              alert('建議圖片檔案不應超過2MB，請重新上傳');
              return null;
            }
            return uploadFile(e.target.files[0], f => onChange(f));
          }}
          style={[
            styles.input,
            value && styles.inputHideText,
            ...customStyles,
          ]} />
      </label>
      {value && preview ? (
        <div style={styles.previewWrapper}>
          {imageOnly ? (
            <div style={styles.imageWrapper}>
              <Image url={value} />
            </div>
          ) : (
            <a href={value} style={styles.previewLink} download>{value}</a>
          )}
        </div>
      ) : null}
    </div>
  );
}

FileInput.defaultProps = {
  style: {},
  wrapperStyle: {},
  label: null,
  imageOnly: false,
  preview: true,
};

export default radium(FileInput);
