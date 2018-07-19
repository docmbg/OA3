import { GENERATE_WORKFLOWS } from '../consts';

export default function (state: Object = { loading: false }, action: any) {
    switch (action.type) {
        case GENERATE_WORKFLOWS:
            return action.payload;
        default:
            return state;
    }
}