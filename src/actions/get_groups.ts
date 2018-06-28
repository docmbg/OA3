import { readOptions, ALL_GROUPS } from '../consts';

export function getAllGroups(_requestDigest: string, sites: any) {
    readOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: ALL_GROUPS,
        payload: {
            sites,
            readOptions
        }
    };
}