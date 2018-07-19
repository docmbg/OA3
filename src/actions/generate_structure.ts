import { GENERATE_STRUCTURE, readOptions } from '../consts';

export function generateStructure(_requestDigest: string, sites: Array<object>, paramUrl: string) {
    if (_requestDigest === null) {
        return {
            type: GENERATE_STRUCTURE,
            payload: {
                setTo: []
            }
        };
    }
    readOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: GENERATE_STRUCTURE,
        payload: {
            sites,
            readOptions,
            paramUrl
        }
    };
}