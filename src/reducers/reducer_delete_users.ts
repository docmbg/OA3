import { DELETE_USERS } from '../consts';

export default function (state: any =  [], action: any) {
    switch (action.type) {
        case DELETE_USERS:
            return action.payload;
        default:
            return state;
    }
}