import { GENERATE_LISTS_INFORMATION, readOptions } from '../consts';

export function generateListsInformation(_requestDigest: string, sites: Array<object>) {
    readOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: GENERATE_LISTS_INFORMATION,
        payload: {
            sites,
            readOptions,
        }
    };
}