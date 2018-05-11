import React from 'react';
import thunk from 'redux-thunk';
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
import fetchMiddleware from 'redux-middleware-fetch';

// shared

// component
import MainBoard from './containers/MainBoard.jsx';

// Reducers
import Course from './reducers/Course.js';
import Auth from './reducers/Auth.js';

const history = createBrowserHistory();


export const store = createStore(
  combineReducers({
    Course,
    Auth,
    form: formReducer,
    routing: routerReducer,
  }),
  {},
  compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      fetchMiddleware,
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
