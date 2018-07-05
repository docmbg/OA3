import { combineReducers } from 'redux';
import StageReducer from './reducer_stage';
import AllUsersReducer from './reducer_allUsers';
import AllGroupsReducer from './reducer_allGroups';
import AllSitesReducer from './reducer_allSites';
import CurrentUserGroupsReducer from './reducer_current_user_groups';
import CurrentUserReducer from './reducer_current_user';
import UpdateCopiedPermissionsReducer from './reducer_update_copied_permissions';
import MatrixReducer from './reducer_matrix';
import EmptyFoldersReducer from './reducer_empty_folders';

const rootReducer: any = combineReducers({
    stage: StageReducer,
    users: AllUsersReducer,
    groups: AllGroupsReducer,
    sites: AllSitesReducer,
    currentUserGroups: CurrentUserGroupsReducer,
    currentUser: CurrentUserReducer,
    copiedPermissions: UpdateCopiedPermissionsReducer,
    matrix: MatrixReducer,
    emptyFolders: EmptyFoldersReducer
});

export default rootReducer;
