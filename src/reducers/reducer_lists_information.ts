import { GENERATE_LISTS_INFORMATION } from '../consts';

export default function (state: any = [], action: any) {
    switch (action.type) {
        case GENERATE_LISTS_INFORMATION:
            return action.payload;
        default:
            return state;
    }
}