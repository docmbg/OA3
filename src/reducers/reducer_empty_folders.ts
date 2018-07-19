import { GENERATE_EMPTY_FOLDERS } from '../consts';

export default function (state: any = { loading: false }, action: any) {
    switch (action.type) {
        case GENERATE_EMPTY_FOLDERS:
            return action.payload;
        default:
            return state;
    }
}