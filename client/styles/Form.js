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
export const fieldStyle = {
  fieldWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  labelStyle: {
    margin: '5px',
    fontWeight: 300,
    fontSize: 16,
  },
};

export const inputStyle = {
  textInput: {
    width: '100%',
    height: 35,
    outline: 'none',
    border: 0,
    fontSize: 14,
    backgroundImage: 'linear-gradient(#D2D2D2, #D2D2D2), linear-gradient(#2f27b0, #2f27b0)',
    backgroundColor: 'transparent',
    backgroundSize: '100% 2px, 100% 2px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom, center bottom',
    transition: 'background 0.3s ease-in-out',
    ':focus': {
      backgroundSize: '0 2px, 100% 2px',
    },
  },
  textareaInput: {
    width: '100%',
    height: 200,
    fontSize: 15,
  },
};

export const selectStyle = {
  width: 100,
  height: 35,
  outline: 'none',
  border: 0,
  fontSize: 14,
  fontWeight: 300,
  backgroundImage: 'linear-gradient(#D2D2D2, #D2D2D2), linear-gradient(#2f27b0, #2f27b0)',
  backgroundColor: 'transparent',
  backgroundSize: '100% 2px, 100% 2px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom, center bottom',
  transition: 'background 0.3s ease-in-out',
  ':focus': {
    backgroundSize: '0 2px, 100% 2px',
  },
};

export const submitButton = {
  outline: 'none',
  borderRadius: 3,
  cursor: 'pointer',
  backgroundColor: '#0976b4',
  color: '#efefef',
  fontWeight: 400,
  padding: '15px 30px',
  border: 'none',
  margin: 20,
  fontSize: 14,
};
