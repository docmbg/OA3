import { GENERATE_STRUCTURE, readOptions } from '../consts';

export function generateStructure(_requestDigest: string, sites: Array<object>, paramUrl: string) {
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