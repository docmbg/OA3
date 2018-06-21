import { siteUrl, readOptions, ALL_USERS } from '../consts';

export function getAllUsers(_requestDigest: string) {
    readOptions['X-RequestDigest'] = _requestDigest;
    return {
        type: ALL_USERS,
        payload: {
            siteUrl,
            readOptions
        }
    };
}