import React from 'react';
import thunk from 'redux-thunk';
import debug from 'debug';
import {
  createStore,
  compose,
  combineReducers,
  applyMiddleware,
} from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import {
  Router,
} from 'react-router';
import {
  Provider,
} from 'react-redux';
import { reducer as formReducer } from 'redux-form';

// shared

// component
import MainBoard from './containers/MainBoard.jsx';

// Reducers

// Debug mode
if (process.env.NODE_ENV !== 'production') {
  debug.enable('RomantichakkaAdmin:*');
}

const history = createBrowserHistory();


export const store = createStore(
  combineReducers({
    form: formReducer,
    routing: routerReducer,
  }),
  {},
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
);

export default (
  <Provider store={store}>
    <Router history={history}>
      <MainBoard />
    </Router>
  </Provider>
);
