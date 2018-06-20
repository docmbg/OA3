import { SET_STAGE } from '../consts';

export function setStage(stage: string) {
    return {
        type: SET_STAGE,
        payload: stage
    };
}