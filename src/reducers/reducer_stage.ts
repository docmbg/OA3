import { SET_STAGE } from '../consts';

export default function (state: string = 'info', action: any) {
    switch (action.type) {
        case SET_STAGE:
            return action.payload;
        default:
            return state;
    }
}