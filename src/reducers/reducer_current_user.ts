import { SET_CURRENT_USER } from '../consts';

export default function (state: Object = {}, action: any) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.payload;
        default:
            return state;
    }
}