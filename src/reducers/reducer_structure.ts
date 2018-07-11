import { GENERATE_STRUCTURE } from '../consts';

export default function (state: Object =  [], action: any) {
    switch (action.type) {
        case GENERATE_STRUCTURE:
            return action.payload;
        default:
            return state;
    }
}