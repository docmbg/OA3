import { GENERATE_MATRIX, readOptions } from '../consts';

export function generateMatrix(_requestDigest: string, sites: Array<Object>, groups: Array<Object>) {
    readOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: GENERATE_MATRIX,
        payload: {
            readOptions,
            sites,
            groups
        }
    };
}