import { SET_CURRENT_USER } from '../consts';

export function setCurrentUser(_requestDigest: string, user: Object) {
    return {
        type: SET_CURRENT_USER,
        payload: {
            user,
            _requestDigest
        }
    };
}