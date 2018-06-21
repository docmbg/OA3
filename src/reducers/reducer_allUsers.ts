import { ALL_USERS } from '../consts';

export default function (state: Array<Object> = [], action: any) {
    console.log('Reducer', action);
    switch (action.type) {
        case ALL_USERS:
            return action.payload;
        default:
            return state;
    }
}