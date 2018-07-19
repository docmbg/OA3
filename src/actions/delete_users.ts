import { DELETE_USERS, siteUrl, postOptions } from '../consts';

export function deleteUsers(users: any, _requestDigest: string) {
    if (_requestDigest === null) {
        return {
            type: DELETE_USERS,
            payload: {
                setTo: 1
            }
        };
    }
    postOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: DELETE_USERS,
        payload: {
            postOptions,
            users,
            siteUrl
        }
    };
}
