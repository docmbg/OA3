import { siteUrl, readOptions, CURRENT_USER_GROUPS } from '../consts';

export function currentUserGroups(_requestDigest: string, userId: number) {
    readOptions['X-RequestDigest'] = _requestDigest;
    return {
        type: CURRENT_USER_GROUPS,
        payload: {
            siteUrl,
            readOptions,
            userId
        }
    };
}