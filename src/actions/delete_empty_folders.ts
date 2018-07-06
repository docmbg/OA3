import { DELETE_EMPTY_FOLDERS, postOptions, siteUrl } from '../consts';

export function deleteEmptyFolders(_requestDigest: string, urls: Array<string>) {
    postOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: DELETE_EMPTY_FOLDERS,
        payload: {
            postOptions,
            urls,
            siteUrl
        }
    };
}