import { siteUrl, readOptions, ALL_GROUPS } from '../consts';

export function getAllGroups(_requestDigest: string) {
    readOptions['X-RequestDigest'] = _requestDigest;
    return {
        type: ALL_GROUPS,
        payload: {
            siteUrl,
            readOptions
        }
    };
}