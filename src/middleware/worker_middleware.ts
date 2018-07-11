import { getAllGroups } from '../actions/get_groups';
import { updateUserGroups } from '../actions/update_user_groups';
import UpdateCopiedPermissions from '../actions/update_copied_permissions';
import WorkerAllUsers from 'worker-loader!./allUsers.ts';
import WorkerAllGroups from 'worker-loader!./allGroups.ts';
import WorkerAllSites from 'worker-loader!./allSites.ts';
import WorkerCurrentUserGroups from 'worker-loader!./currentUserGroups.ts';
import WorkerPastePermissions from 'worker-loader!./pastePermissions.ts';
import WorkerGenerateMatrix from 'worker-loader!./generateMatrix.ts';
import WorkerGenerateEmptyFolders from 'worker-loader!./generateEmptyFolders.ts';
import WorkerDeleteEmptyFolders from 'worker-loader!./deleteEmptyFolders.ts';
import WorkerGenerateListsInformation from 'worker-loader!./generateListsInformation.ts';
import WorkerDeleteUsers from 'worker-loader!./deleteUsers.ts';
import WorkerGenerateWorkflows from 'worker-loader!./generateWorkflows.ts';
import WorkerStructure from 'worker-loader!./generateStructure.ts';

import {
    ALL_USERS,
    SET_STAGE,
    UPDATE_USER_GROUPS,
    ALL_GROUPS,
    ALL_SITES,
    SET_CURRENT_USER,
    UPDATE_COPIED_PERMISSIONS,
    PASTE_PERMISSIONS,
    GENERATE_MATRIX,
    GENERATE_EMPTY_FOLDERS,
    DELETE_EMPTY_FOLDERS,
    GENERATE_LISTS_INFORMATION,
    DELETE_USERS,
    GENERATE_WORKFLOWS,
    GENERATE_STRUCTURE
} from '../consts';

const wAllUsers = new WorkerAllUsers();
const wAllGroups = new WorkerAllGroups();
const wAllSites = new WorkerAllSites();
const wCurrentUserGroups = new WorkerCurrentUserGroups();
const wPastePermissions = new WorkerPastePermissions();
const wGenerateMatrix = new WorkerGenerateMatrix();
const wGenerateEmptyFolders = new WorkerGenerateEmptyFolders();
const wDeleteEmptyFolders = new WorkerDeleteEmptyFolders();
const wGenerateListsInformation = new WorkerGenerateListsInformation();
const wDeleteUsers = new WorkerDeleteUsers();
const wGenerateWorkflows = new WorkerGenerateWorkflows();
const wGenerateStructure = new WorkerStructure();

export const customPromiseMiddleware = (store: any) => (next: any) => (action: any) => {
    console.log('Action', action);
    switch (action.type) {
        case ALL_USERS:
            workerInit(wAllUsers, action, next);
            break;
        case ALL_GROUPS:
            workerInit(wAllGroups, action, next);
            break;
        case ALL_SITES:
            wAllSites.postMessage({ action });
            wAllSites.onmessage = function (event: any) {
                next(event.data);
                console.log(event.data);
                store.dispatch(getAllGroups(event.data.reqDig, event.data.payload));
            };
            break;
        case SET_STAGE:
            next(action);
            break;
        case UPDATE_USER_GROUPS:
            workerInit(wCurrentUserGroups, action, next);
            break;
        case SET_CURRENT_USER:
            store.dispatch(updateUserGroups({
                task: 'create',
                _requestDigest: action.payload[`_requestDigest`],
                user: action.payload.user
            }));
            next(action);

            break;
        case UPDATE_COPIED_PERMISSIONS:
            next(action);
            break;
        case PASTE_PERMISSIONS:
            wPastePermissions.postMessage({ action });
            wPastePermissions.onmessage = function (event: any) {
                store.dispatch(updateUserGroups({
                    task: 'create',
                    _requestDigest: action.payload[`_requestDigest`],
                    user: action.payload.currentUser
                }));
                store.dispatch(UpdateCopiedPermissions([]));
            };
            break;
        case GENERATE_MATRIX:
            workerInit(wGenerateMatrix, action, next);
            break;
        case GENERATE_EMPTY_FOLDERS:
            workerInit(wGenerateEmptyFolders, action, next);
            break;
        case DELETE_EMPTY_FOLDERS:
            workerInit(wDeleteEmptyFolders, action, next);
            break;
        case GENERATE_LISTS_INFORMATION:
            workerInit(wGenerateListsInformation, action, next);
            break;
        case DELETE_USERS:
            workerInit(wDeleteUsers, action, next);
            break;
        case GENERATE_WORKFLOWS:
            workerInit(wGenerateWorkflows, action, next);
            break;
        case GENERATE_STRUCTURE:
            workerInit(wGenerateStructure, action, next);
            break;
        default:
            break;
    }
};

function workerInit(worker: any, action: any, next: any) {
    worker.postMessage({ action });
    worker.onmessage = function (event: any) {
        next(event.data);
    };
}