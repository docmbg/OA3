import { siteUrl, readOptions, ALL_SITES } from '../consts';

export function getAllSites(_requestDigest: string) {
    readOptions.headers['X-RequestDigest'] = _requestDigest;
    let arr: any = [];
    return {
        type: ALL_SITES,
        payload: {
            siteUrl,
            readOptions,
            arr,
        }
    };
}