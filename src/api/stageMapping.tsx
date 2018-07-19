
import * as React from 'react';
import MatrixStage from '../containers/matrix_stage';
import EmptyFolderStage from '../containers/empty_folders_stage';
import UserAccessStage from '../containers/permission_stage';
import AllUsersStage from '../containers/all_users_stage';
import ListsInformationStage from '../containers/lists_information_stage';
import MassUserDeleteStage from '../containers/mass_user_delete_stage';
import WorkflowsStage from '../containers/workflows_stage';
import StructureStage from '../containers/structure_stage';
                                                                
export default  {
    'useraccess': <UserAccessStage />,
    'massdelete': <MassUserDeleteStage />,
    'matrix': <MatrixStage />,
    'allusers': <AllUsersStage />,
    'structure': <StructureStage />,
    'folders': <EmptyFolderStage />,
    'workflows': <WorkflowsStage />,
    'lists': <ListsInformationStage />
};
