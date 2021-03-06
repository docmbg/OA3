import { ALL_SITES } from '../consts';

export default function (state: Array<Object> = [], action: any) {
    switch (action.type) {
        case ALL_SITES:
            return action.payload;
        default:
            return state;
    }
}