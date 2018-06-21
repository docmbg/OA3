import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './reducers/index';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { customPromiseMiddleware } from './middleware/worker_middleware';

const history = createHistory();
const createStoreWithMiddleware = applyMiddleware(customPromiseMiddleware)(createStore);

ReactDOM.render(
  <HashRouter history={history}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>
  </HashRouter >,
  document.getElementById('root') as HTMLElement
);
