import { GENERATE_WORKFLOWS, readOptions } from '../consts';

export function generateWorkflows(_requestDigest: string, sites: Array<object>) {
    if (_requestDigest === null) {
        return {
            type: GENERATE_WORKFLOWS,
            payload: {
                setTo: []
            }
        };
    }
    readOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: GENERATE_WORKFLOWS,
        payload: {
            sites,
            readOptions
        }
    };
}