
import { UPDATE_COPIED_PERMISSIONS } from '../consts';

export default function UpdateCopiedPermissions(groups: Array<Object>) {
    return {
        type: UPDATE_COPIED_PERMISSIONS,
        payload: groups
    };
}
