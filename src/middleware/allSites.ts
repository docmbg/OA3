import { getAllSubSites } from '../api/helperFunctions';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type } = event.data.action;
    Promise.resolve(getAllSubSites(payload[`siteUrl`], payload[`arr`], payload[`siteUrl`], payload[`readOptions`]))
        .then(res => {
            console.log('worker groups', res);
            ctx.postMessage({
                type,
                payload: payload[`arr`]
            });
        });
});