import { ALL_GROUPS } from '../consts';

export default function (state: Array<Object> = [], action: any) {
    switch (action.type) {
        case ALL_GROUPS:
            return action.payload;
        default:
            return state;
    }
}