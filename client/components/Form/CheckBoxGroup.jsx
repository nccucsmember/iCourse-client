import React, {
  Component,
} from 'react';
import radium from 'radium';
import T from 'prop-types';

import Theme from '../../styles/Theme.js';
import Form from '../../styles/Form.js';

const styles = {
  groupWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 2,
    position: 'relative',
  },
  checkboxWrapper: {
    outline: 'none',
    border: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
  },
  labelWrapper: {
    margin: '0 5px',
  },
  label: {
    textAlign: 'left',
    fontSize: 14,
    color: Theme.DARK_TEXT,
  },
  boxWrapper: {
    marginRight: 5,
  },
  box: {
    border: `1px solid ${Theme.THEME_MAIN_COLOR}`,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  check: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.OBJECT_LIST_THEME,
  },
  checkboxGroupTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 300,
    margin: 5,
  },
};

class CheckboxGroup extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.meta.initial && prevProps.dependentValue !== this.props.dependentValue) {
      this.props.input.onChange([]);
    }
  }

  handleChange(d) {
    const {
      input: {
        value,
        onChange,
      },
    } = this.props;

    if (value && value.length !== 0) {
      const existIndex = value.findIndex(r => r === d);

      if (existIndex !== -1) {
        onChange([
          ...value.slice(0, existIndex),
          ...value.slice(existIndex + 1),
        ]);
      } else {
        onChange([
          ...value,
          d,
        ]);
      }
    } else {
      onChange([d]);
    }
  }

  render() {
    const {
      label,
      options,
      input: {
        value,
      },
      meta: {
        touched,
        error,
        submitFailed,
      },
    } = this.props;

    return (
      <div style={styles.groupWrapper}>
        {(touched || submitFailed) && error && <span style={Form.error}>{error}</span>}
        <div style={styles.checkboxGroupTitle}>
          <span>{label}</span>
        </div>
        {options ? (options.map(n => (
          <div key={n.id}>
            <button
              type="button"
              style={styles.checkboxWrapper}
              onClick={() => this.handleChange(n.id)} >
              <div style={styles.itemWrapper}>
                <div style={styles.boxWrapper}>
                  <div style={styles.box}>
                    {value && value.find(item => item === n.id) ? (
                      <div style={styles.check} />
                    ) : null}
                  </div>
                </div>
                <div style={styles.labelWrapper}>
                  <span style={styles.label}>
                    {n.name || null}
                  </span>
                </div>
              </div>
            </button>
          </div>
        ))) : null}
      </div>
    );
  }
}

CheckboxGroup.propTypes = {
  options: T.arrayOf(T.shape({
    id: T.oneOfType([T.number, T.string]),
    name: T.string,
  })).isRequired,
  input: T.shape({
    value: T.oneOfType([
      T.string,
      T.number,
      T.array,
    ]),
    onChange: T.func,
    name: T.string,
  }).isRequired,
  label: T.string,
  meta: T.shape({
    touched: T.bool.isRequired,
    submitFailed: T.bool.isRequired,
    error: T.string,
  }).isRequired,
  dependentValue: T.number,
};

CheckboxGroup.defaultProps = {
  dependentValue: 0,
  label: '',
  meta: {
    error: '',
  },
};

export default radium(CheckboxGroup);
