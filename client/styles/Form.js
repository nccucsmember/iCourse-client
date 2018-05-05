import Theme from './Theme.js';

export default {
  form: {
    padding: '24px 12px',
    borderRadius: 2,
    border: '1px solid #cacaca',
    backgroundColor: Theme.FORM_BACKGROUND,
  },
  errorWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 0',
    borderRadius: 5,
    backgroundColor: 'rgba(247, 247, 5, 0.38)',
  },
  error: {
    fontSize: 14,
    fontWeight: 500,
    color: Theme.WARN_TEXT,
    letterSpacing: 1.5,
  },
};
