import WorkerAllUsers from 'worker-loader!./allUsers.ts';
import { ALL_USERS, SET_STAGE } from '../consts';

const wAllUsers = new WorkerAllUsers();

export const customPromiseMiddleware = (store: any) => (next: any) => (action: any) => {
    console.log('Action', action);
    switch (action.type) {
        case ALL_USERS:
            wAllUsers.postMessage({ action });
            wAllUsers.onmessage = function (event: any) {
                next(event.data);
            };
            break;
        case SET_STAGE:
            next(action);
            break;

        default:
            break;
    }
};