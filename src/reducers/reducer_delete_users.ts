import { DELETE_USERS } from '../consts';

export default function (state: any = { loading: false, usersLeft: 1}, action: any) {
    switch (action.type) {
        case DELETE_USERS:
            return action.payload;
        default:
            return state;
    }
}