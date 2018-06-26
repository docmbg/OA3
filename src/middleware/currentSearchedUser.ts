import { helper_getCurrenUserGroups } from '../api/helperFunctions';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type } = event.data.action;

    Promise.resolve(helper_getCurrenUserGroups(payload[`siteUrl`], payload[`readOptions`], payload[`userId`]))
        .then(res => {
            ctx.postMessage({
                type,
                payload: res
            });
        });
});