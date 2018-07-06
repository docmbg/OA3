import { getAllLists } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type, } = event.data.action;
    const { sites, readOptions } = payload;
    Promise.resolve(generateListsInformation(sites, readOptions))
        .then(res => {
            console.log(res, 'res');
            ctx.postMessage({
                type,
                payload: res,
            });
        });
});

async function generateListsInformation(sites: any, readOptions: any) {
    let promises = [];
    for (let site of sites) {
        promises.push(getAllLists(site.url, readOptions, false));
    }
    let lists = await Promise.all(promises);
    lists = [].concat(...lists);
    return lists;
}