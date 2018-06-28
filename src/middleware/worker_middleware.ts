import { getAllGroups } from '../actions/get_groups';
import { updateUserGroups } from '../actions/update_user_groups';
import WorkerAllUsers from 'worker-loader!./allUsers.ts';
import WorkerAllGroups from 'worker-loader!./allGroups.ts';
import WorkerAllSites from 'worker-loader!./allSites.ts';
import WorkerCurrentUserGroups from 'worker-loader!./currentUserGroups.ts';

import {
    ALL_USERS,
    SET_STAGE,
    UPDATE_USER_GROUPS,
    ALL_GROUPS,
    ALL_SITES,
    SET_CURRENT_USER,
} from '../consts';

const wAllUsers = new WorkerAllUsers();
const wAllGroups = new WorkerAllGroups();
const wAllSites = new WorkerAllSites();
const wCurrentUserGroups = new WorkerCurrentUserGroups();

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