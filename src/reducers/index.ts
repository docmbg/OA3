import { combineReducers } from 'redux';
import AllUsersReducer from './reducer_allUsers';
import AllGroupsReducer from './reducer_allGroups';
import AllSitesReducer from './reducer_allSites';
import StageReducer from './reducer_stage';
import CurrentUserGroupsReducer from './reducer_current_user_groups';
import CurrentUserReducer from './reducer_current_user';
import UpdateCopiedPermissionsReducer from './reducer_update_copied_permissions';
import MatrixReducer from './reducer_matrix';
import EmptyFoldersReducer from './reducer_empty_folders';
import DeleteEmptyFoldersReducer from './reducer_delete_empty_folders';
import ListsReducer from './reducer_lists_information';
import DeleteUsersReducer from './reducer_delete_users';
import WorkflowsReducer from './reducer_workflows';
import StructureReducer from './reducer_structure';

const rootReducer: any = combineReducers({
    users: AllUsersReducer,
    groups: AllGroupsReducer,
    sites: AllSitesReducer,
    stage: StageReducer,
    currentUserGroups: CurrentUserGroupsReducer,
    currentUser: CurrentUserReducer,
    copiedPermissions: UpdateCopiedPermissionsReducer,
    matrix: MatrixReducer,
    emptyFolders: EmptyFoldersReducer,
    foldersDeleted: DeleteEmptyFoldersReducer,
    lists: ListsReducer,
    deletedUsers: DeleteUsersReducer,
    workflows: WorkflowsReducer,
    structure: StructureReducer
});

export default rootReducer;
