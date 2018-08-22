import { getAllGroups } from '../actions/get_groups';
import WorkerAllUsers from 'worker-loader!./allUsers.ts';
import WorkerAllGroups from 'worker-loader!./allGroups.ts';
import WorkerAllSites from 'worker-loader!./allSites.ts';
import WorkerGenerateMatrix from 'worker-loader!./generateMatrix.ts';
import { generateExcelMatrix } from '../api/generate_matrix_excel';
import { generateExcelListsInformation } from '../api/generate_lists_excel';
import { generateExcelWorkflows } from '../api/generate_workflows_excel';
import { generateEmptyFoldersExcel } from '../api/generate_empty_folders_excel';
import { updateUserGroups } from '../actions/update_user_groups';
// import UpdateCopiedPermissions from '../actions/update_copied_permissions';
import WorkerCurrentUserGroups from 'worker-loader!./currentUserGroups.ts';
import WorkerPastePermissions from 'worker-loader!./pastePermissions.ts';
import WorkerGenerateEmptyFolders from 'worker-loader!./generateEmptyFolders.ts';
import WorkerDeleteEmptyFolders from 'worker-loader!./deleteEmptyFolders.ts';
import WorkerGenerateListsInformation from 'worker-loader!./generateListsInformation.ts';
import WorkerDeleteUsers from 'worker-loader!./deleteUsers.ts';
import WorkerGenerateWorkflows from 'worker-loader!./generateWorkflows.ts';
import WorkerStructure from 'worker-loader!./generateStructure.ts';

import {
    ALL_USERS,
    ALL_GROUPS,
    ALL_SITES,
    GENERATE_MATRIX,
    SET_STAGE,
    UPDATE_USER_GROUPS,
    SET_CURRENT_USER,
    UPDATE_COPIED_PERMISSIONS,
    PASTE_PERMISSIONS,
    DELETE_EMPTY_FOLDERS,
    GENERATE_LISTS_INFORMATION,
    GENERATE_EMPTY_FOLDERS,
    DELETE_USERS,
    GENERATE_WORKFLOWS,
    GENERATE_STRUCTURE
} from '../consts';

const wAllUsers = new WorkerAllUsers();
const wAllGroups = new WorkerAllGroups();
const wAllSites = new WorkerAllSites();
const wGenerateMatrix = new WorkerGenerateMatrix();
const wCurrentUserGroups = new WorkerCurrentUserGroups();
const wPastePermissions = new WorkerPastePermissions();
const wGenerateEmptyFolders = new WorkerGenerateEmptyFolders();
const wDeleteEmptyFolders = new WorkerDeleteEmptyFolders();
const wGenerateListsInformation = new WorkerGenerateListsInformation();
const wDeleteUsers = new WorkerDeleteUsers();
const wGenerateWorkflows = new WorkerGenerateWorkflows();
const wGenerateStructure = new WorkerStructure();

export const customPromiseMiddleware = (store: any) => (next: any) => (action: any) => {
    let enableLoader = {
        type: action.type,
        payload: {
            loading: true,
        }
    };
    switch (action.type) {
        case GENERATE_MATRIX:
            workerInit(wGenerateMatrix, action, next, enableLoader);
            break;
        case ALL_USERS:
            workerInit(wAllUsers, action, next, enableLoader);
            break;
        case ALL_GROUPS:
            workerInit(wAllGroups, action, next, enableLoader);
            break;
        case SET_STAGE:
            next(action);
            break;
        case ALL_SITES:
            wAllSites.postMessage({ action });
            wAllSites.onmessage = function (event: any) {
                next(event.data);
                console.log(event.data);
                store.dispatch(getAllGroups(event.data.reqDig, event.data.payload));
            };
            break;
        case UPDATE_USER_GROUPS:
            workerInit(wCurrentUserGroups, action, next, {});
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
            };
            break;

        case GENERATE_EMPTY_FOLDERS:
            workerInit(wGenerateEmptyFolders, action, next, enableLoader);
            break;
        case DELETE_EMPTY_FOLDERS:
            workerInit(wDeleteEmptyFolders, action, next, enableLoader);
            break;
        case GENERATE_LISTS_INFORMATION:
            workerInit(wGenerateListsInformation, action, next, enableLoader);
            break;
        case DELETE_USERS:
            workerInit(wDeleteUsers, action, next, enableLoader);
            break;
        case GENERATE_WORKFLOWS:
            workerInit(wGenerateWorkflows, action, next, enableLoader);
            break;
        case GENERATE_STRUCTURE:
            workerInit(wGenerateStructure, action, next, enableLoader);
            break;
        default:
            break;
    }
};

function workerInit(worker: any, action: any, next: any, loader: any) {
    if (action.payload.hasOwnProperty('setTo')) {
        next({
            type: action.type,
            payload: {
                loading: false,
            }
        });
    } else {
        if (loader.hasOwnProperty('payload')) {
            next(loader);
        }
        worker.postMessage({ action });
        worker.onmessage = function (event: any) {
            next(event.data);
            switch (action.type) {
                case GENERATE_MATRIX:
                    generateExcelMatrix(event.data.payload.data);
                    break;
                case GENERATE_LISTS_INFORMATION:
                    generateExcelListsInformation(event.data.payload.data);
                    break;
                case GENERATE_WORKFLOWS:
                    generateExcelWorkflows(event.data.payload.data);
                    break;
                case GENERATE_EMPTY_FOLDERS:
                    generateEmptyFoldersExcel(event.data.payload.data);
                    break;
                default:
                    return;
            }
        };
    }
}