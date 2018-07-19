import { DELETE_EMPTY_FOLDERS, postOptions, siteUrl } from '../consts';

export function deleteEmptyFolders(_requestDigest: string, urls: Array<string>) {
    if (_requestDigest === null) {
        return {
            type: DELETE_EMPTY_FOLDERS,
            payload: {
                setTo: []
            }
        };
    }
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