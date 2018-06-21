import { getAllUsers } from '../api/helperFunctions';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type } = event.data.action;

    Promise.resolve(getAllUsers(payload[`siteUrl`], payload[`readOptions`]))
        .then(res => {
            ctx.postMessage({
                type,
                payload: res
            });
        });
});