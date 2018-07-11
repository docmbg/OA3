import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers/index';
import EmptyFolderStage from './containers/empty_folders_stage';
import MatrixStage from './containers/matrix';
import UserAccessStage from './containers/permission_stage';
import AllUsersStage from './containers/all_users_stage';
import ListsInformationStage from './containers/lists_information_stage';
import MassUserDelete from './containers/mass_user_delete';
import WorkflowsStage from './containers/workflows_stage';
import App from './components/App';
import StructureStage from './containers/structure_stage';
import StructurePage from './containers/structure_page';
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
          <Route exact={true} path="/home" component={MassUserDelete} />
          <Route exact={true} path="/home/useraccess" component={UserAccessStage} />
          <Route exact={true} path="/home/matrix" component={MatrixStage} />
          <Route exact={true} path="/home/allusers" component={AllUsersStage} />
          <Route exact={true} path="/home/folders" component={EmptyFolderStage} />
          <Route exact={true} path="/home/lists" component={ListsInformationStage} />
          <Route exact={true} path="/home/massdelete" component={MassUserDelete} />
          <Route exact={true} path="/home/app" component={App} />
          <Route exact={true} path="/home/structure" component={StructureStage} />
          <Route exact={true} path="/home/structure_page" component={StructurePage} />
          <Route exact={true} path="/home/workflows" component={WorkflowsStage} />

        </Switch>
      </div>
    </Provider>
  </HashRouter>
  ,
  document.getElementById('root') as HTMLElement
);
