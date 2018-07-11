import { DELETE_USERS, siteUrl, postOptions } from '../consts';

<<<<<<< Updated upstream
export function deleteUsers(users: Object, _requestDigest: string) {
=======
export function deleteUsers(users: any, _requestDigest: string) {
>>>>>>> Stashed changes
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
