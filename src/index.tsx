import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './reducers/index';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

ReactDOM.render(
  <HashRouter history={history}>
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  </HashRouter >,
  document.getElementById('root') as HTMLElement
);
