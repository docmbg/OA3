import { getAllLists } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type, } = event.data.action;
    const { sites, readOptions, paramUrl } = payload;
    Promise.resolve(generateListsInformation(sites, readOptions, paramUrl))
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

async function generateListsInformation(sites: any, readOptions: any, paramUrl: string) {
    let promises = [];
    for (let site of sites) {
        promises.push(getAllLists(site.url, readOptions, false));
    }
    let lists = await Promise.all(promises);
    let counter = 0;
    console.log(sites, lists, paramUrl);
    const head = sites[0].url.split(`${paramUrl}/`)[1];
    console.log(head);
    const urlOfMainSite = `${sites[0].url}/`;
    for (let site of sites) {
        let title;
        let parents;
        let belongingLists = lists[counter].map((e: any) => {
            return {
                name: e.Title,
                isRestricted: e.uniquePermissions
            };
        });
        if (counter === 0) {
            site.children = [];
            site.head = head;
            site.lists = belongingLists;
            site.name = site.title;
            site.parents = [];
            site.parentsURL = [];
            site.realName = site.title;
        } else {
            title = site.url.split('/')[site.url.split('/').length - 1];
            parents = site.url.split(urlOfMainSite)[1];
            if (parents === title) {
                parents = [];
            } else {
                parents = parents.split(`/${title}`)[0].split('/');
            }
            parents = parents.length > 0 ? parents : [];
            site.head = head;
            site.lists = belongingLists;
            site.name = site.title;
            site.realName = site.title;
            site.title = title;
            site.parents = parents;
            site.parentsURL = createParentsUrl(parents);
        }
        counter++;
    }
    return sites;
}

function createParentsUrl(data: Array<string>) {
    let parentsUrl = [];
    let url = '';
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            url = data[i];
        } else {
            url += `/${data[i]}`;
        }
        parentsUrl.push(url);
    }
    return parentsUrl;
}