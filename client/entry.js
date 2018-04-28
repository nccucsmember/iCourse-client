import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader'
import App from './App.jsx';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}
render(App)
