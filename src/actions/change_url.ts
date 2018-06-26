import { CHANGE_URL } from '../consts';

export function changeUrl(url: string) {
    return {
        type: CHANGE_URL,
        payload: url
    };
}