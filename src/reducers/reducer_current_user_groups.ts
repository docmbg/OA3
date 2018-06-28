import { UPDATE_USER_GROUPS } from '../consts';

export default function (state: Array<Object> = [], action: any) {
    switch (action.type) {
        case UPDATE_USER_GROUPS:
            return action.payload;
        default:
            return state;
    }
}