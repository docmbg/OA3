import { deleteFolder } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    const { payload, type } = event.data.action;
    const { siteUrl, postOptions, urls } = payload;
    Promise.resolve(deleteEmptyFolders(urls, postOptions, siteUrl))
        .then(res => {
            ctx.postMessage({
                type,
                payload: {
                    data: true,
                    loading: false
                },
            });
        });
});

async function deleteEmptyFolders(urls: Array<string>, postOptions: any, mainUrl: string) {
    let limit = 500;
    let promises = [];
    let counter = 0;
    while (counter < urls.length) {
        promises = [];
        if (counter + limit <= urls.length) {
            for (counter; counter <= limit; counter++) {
                promises.push(deleteFolder(urls[counter], postOptions, mainUrl));
            }
            limit += limit;
            await Promise.all(promises);

        } else {
            for (counter; counter < urls.length; counter++) {
                promises.push(deleteFolder(urls[counter], postOptions, mainUrl));
            }
            await Promise.all(promises);
        }

    }
    return true;
}