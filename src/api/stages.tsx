import * as React from 'react';
import MatrixStage from '../containers/matrix_stage';
import EmptyFolderStage from '../containers/empty_folders_stage';
import UserAccessStage from '../containers/permission_stage';
import AllUsersStage from '../containers/all_users_stage';
import ListsInformationStage from '../containers/lists_information_stage';
import MassUserDeleteStage from '../containers/mass_user_delete_stage';
import WorkflowsStage from '../containers/workflows_stage';
import StructureStage from '../containers/structure_stage';
import StructurePage from '../containers/structure_page';

export default {
    'useraccess': {
        'tooltip': 'Access Management',
        'icon': <i className="material-icons">lock_open</i>,
        'component': <UserAccessStage />
    },
    'massdelete': {
        'tooltip': 'Mass Delete',
        'icon': <i className="material-icons">delete_sweep</i>,
        'component': <MassUserDeleteStage />
    },
    'matrix': {
        'tooltip': 'Permission Matrix',
        'icon': <i className="material-icons">grid_on</i>,
        'component': <MatrixStage />
    },
    'allusers': {
        'tooltip': 'All Users',
        'icon': <i className="material-icons">people_outline</i>,
        'component': <AllUsersStage />
    },
    'structure': {
        'tooltip': 'SharePoint Structure',
        'icon': <i className="material-icons">blur_on</i>,
        'component': <StructureStage />
    },
    'folders': {
        'tooltip': 'Empty Folders',
        'icon': <i className="material-icons">folder_open</i>,
        'component': <EmptyFolderStage />
    },
    'workflows': {
        'tooltip': 'Workflows Information',
        'icon': <i className="material-icons">update</i>,
        'component': <WorkflowsStage />
    },
    'lists': {
        'tooltip': 'Lists Information',
        'icon': <i className="material-icons">list_alt</i>,
        'component': <ListsInformationStage />
    },
    'structurePage': {
        'tooltip': '',
        'icon': <i className="material-icons">build</i>,
        'component': <StructurePage />
    },
};