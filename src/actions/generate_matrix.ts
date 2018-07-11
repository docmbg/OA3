import { GENERATE_MATRIX, readOptions } from '../consts';

export function generateMatrix(_requestDigest: string, sites: Array<Object>, groups: Array<Object>) {
    if (_requestDigest === null) {
        return {
            type: GENERATE_MATRIX,
            payload: {
                setTo: []
            }
        };
    }
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