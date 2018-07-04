import { GENERATE_MATRIX } from '../consts';

export default function (state: Object =  {}, action: any) {
    switch (action.type) {
        case GENERATE_MATRIX:
            return action.payload;
        default:
            return state;
    }
}