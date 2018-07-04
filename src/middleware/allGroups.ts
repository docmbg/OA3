import { getAllGroups } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type } = event.data.action;

    Promise.resolve(getAllGroups(payload[`sites`], payload[`readOptions`]))
        .then(res => {
            console.log('worker groups', res);
            ctx.postMessage({
                type,
                payload: res
            });
        });
});