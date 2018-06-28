import { combineReducers } from 'redux';
// import StageReducer from './reducer_stage';
// import AllUsersReducer from './reducer_allUsers';
// import AllGroupsReducer from './reducer_allGroups';
// import AllSitesReducer from './reducer_allSites';
// import CurrentUserGroupsReducer from './reducer_current_user_groups';
// import CurrentUserReducer from './reducer_current_user';

const rootReducer: any = combineReducers({
    state: (state = {}) => state
    // stage: StageReducer,
    // users: AllUsersReducer,
    // groups: AllGroupsReducer,
    // sites: AllSitesReducer,
    // currentUserGroups: CurrentUserGroupsReducer,
    // currentUser: CurrentUserReducer,
});

export default rootReducer;
