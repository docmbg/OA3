import { SET_STAGE } from '../consts';

export default function (state: string = 'useraccess', action: any) {
    switch (action.type) {
        case SET_STAGE:
            return action.payload;
        default:
            return state;
    }
}