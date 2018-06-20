import { SET_STAGE } from '../consts';

export default function (state: string = '', action: any) {
    console.log(action);
    switch (action.type) {
        case SET_STAGE:
            return action.payload;
        default:
            return state;
    }
}