import { GENERATE_EMPTY_FOLDERS, readOptions, postOptions, paramUrl } from '../consts';

export function generateEmptyFolders(_requestDigest: string, sites: Array<Object>, users: any) {
    readOptions.headers['X-RequestDigest'] = _requestDigest;
    postOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: GENERATE_EMPTY_FOLDERS,
        payload: {
            readOptions,
            postOptions,
            sites,
            paramUrl,
            users
        }
    };
}