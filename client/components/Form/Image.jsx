// @flow

import React from 'react';
import radium from 'radium';

import DeleteButton from '../Global/DeleteButton.jsx';
import Loader from '../../containers/Global/Loader.jsx';

const styles = {
  cover: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  button: {
    top: -8,
    right: -8,
  },
};

type Props = {
  selfIndex?: Number,
  url: String,
  onChange?: Function,
};

function Image({
  url,
  selfIndex,
  onChange,
}: Props) {
  const isLoading = (typeof url !== 'undefined' && url === null) || false;

  return (
    <div
      key={`${url}-${selfIndex}`}
      style={[
        styles.cover,
        {
          backgroundImage: !isLoading ? `url(${url})` : null,
        },
      ]}>
      {isLoading ? <Loader /> : null}
      {onChange && ~selfIndex && !isLoading ? (
        <DeleteButton
          onClick={() => onChange(selfIndex)}
          style={styles.button} />
      ) : null}
    </div>
  );
}

Image.defaultProps = {
  selfIndex: null,
  onChange: null,
};

export default radium(Image);
