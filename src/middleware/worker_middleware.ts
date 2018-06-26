import { push } from 'connected-react-router';
import WorkerAllUsers from 'worker-loader!./allUsers.ts';
import WorkerAllGroups from 'worker-loader!./allGroups.ts';
import WorkerAllSites from 'worker-loader!./allSites.ts';
import WorkerSearchedUser from 'worker-loader!./currentSearchedUser.ts';
import { ALL_USERS, SET_STAGE, CURRENT_USER_GROUPS, ALL_GROUPS, ALL_SITES, CHANGE_URL } from '../consts';

const wAllUsers = new WorkerAllUsers();
const wAllGroups = new WorkerAllGroups();
const wAllSites = new WorkerAllSites();
const wSearchedUser = new WorkerSearchedUser();

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
            workerInit(wAllSites, action, next);
            break;
        case SET_STAGE:
            next(action);
            break;
        case CURRENT_USER_GROUPS:
            workerInit(wSearchedUser, action, next);
            break;
        case CHANGE_URL:
            console.log('change url action');
            store.dispatch(push(action.payload));
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