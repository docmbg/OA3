import { getWorkflows } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type, } = event.data.action;
    const { sites, readOptions } = payload;
    Promise.resolve(getWorkflows(sites, readOptions))
        .then(res => {
            console.log(res, 'res');
            ctx.postMessage({
                type,
                payload: {
                    data: res,
                    loading: false,
                }
            });
        });
});
