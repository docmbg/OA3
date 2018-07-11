import { DELETE_USERS, siteUrl, postOptions } from '../consts';

export function deleteUsers(users: any, _requestDigest: string) {
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
