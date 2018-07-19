import { getEmptyFolders, createFolderInformation } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    const { payload, type } = event.data.action;
    const { sites, readOptions, postOptions, users, paramUrl } = payload;
    Promise.resolve(getEmptyFolders(sites, readOptions, postOptions))
        .then(res => {
            let emptyFolders = createFolderInformation(paramUrl, res, users);
            ctx.postMessage({
                type,
                payload: {
                    data: emptyFolders,
                    loading: false
                },
            });
        });
});