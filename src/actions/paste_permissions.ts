import { PASTE_PERMISSIONS, siteUrl, postOptions } from '../consts';

export function pastePermissions(
    groupsAdd: any, groupsRemove: any, currentUser: Object, _requestDigest: string
) {
    postOptions.headers['X-RequestDigest'] = _requestDigest;
    return {
        type: PASTE_PERMISSIONS,
        payload: {
            siteUrl,
            groupsAdd,
            groupsRemove,
            postOptions,
            currentUser
        }
    };
}