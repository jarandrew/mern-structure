import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import routes from './routes';
import reducers from './reducers/index';
// import ReactGA from 'react-ga';
import { AUTH_USER } from './actions/types';

// Import stylesheets
import './public/stylesheets/base.scss';

// Initialize Google Analytics
// ReactGA.initialize('UA-000000-01');

function logPageView() {
  // ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
    </AppContainer>
  </Provider>,
  document.querySelector('.wrapper'));

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    ReactDOM.render(
        <AppContainer>
      <Provider store={store}>
          <Router history={browserHistory} routes={newRoutes} onUpdate={logPageView} />
      </Provider>
        </AppContainer>,
      document.querySelector('.wrapper'));
  });

  module.hot.accept('./reducers/index', () => {
    let newReducers = require('./reducers/index');
    store.replaceReducer(newReducers);
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
        </AppContainer>
      </Provider>,
      document.querySelector('.wrapper'));
  });
}

