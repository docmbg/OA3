import { UPDATE_COPIED_PERMISSIONS } from '../consts';

export default function (state: Array<Object> = [], action: any) {
    switch (action.type) {
        case UPDATE_COPIED_PERMISSIONS:
            return action.payload;
        default:
            return state;
    }
} 