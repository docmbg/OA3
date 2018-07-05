import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers/index';
import App from './components/App';
// import Matrix from './containers/matrix';
// import UserAccess from './containers/permission_stage';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { customPromiseMiddleware } from './middleware/worker_middleware';
import { createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router'; // react-router v4
import { HashRouter } from 'react-router-dom';

const history = createHashHistory({
  hashType: 'slash',
});

const composeEnhancers = window[`__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`] || compose;

const store = createStore(
  connectRouter(history)(reducers), // new root reducer with router state
  composeEnhancers(
    applyMiddleware(
      customPromiseMiddleware,
    ),
  ),
);

ReactDOM.render(

  <HashRouter history={history}>
    <Provider store={store}>
      <div>
        <Switch>
           <Route exact={true} path="/home" component={App} />
        </Switch>
      </div>
    </Provider>
  </HashRouter>
  ,
  document.getElementById('root') as HTMLElement
);
