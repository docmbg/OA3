import { getAllLists, getSitePermissions, getUsersByGroup } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    const { payload, type } = event.data.action;
    const { sites, groups, readOptions } = payload;
    Promise.resolve(generateMatrix(sites, groups, readOptions))
        .then(res => {
            console.log('worker groups', res);
            ctx.postMessage({
                type,
                payload: res
            });
        });
});

async function generateMatrix(sites: any, groups: any, readOptions: any) {
    let flattenedGroups: any = [].concat(...groups);
    let uniqueGroups: any = [];
    let flag = 0;
    for (let group of flattenedGroups) {
        flag = 0;
        for (let item of uniqueGroups) {
            if (item.Title === group.Title) {
                flag = 1;
                break;
            }
        }
        if (flag !== 1) {
            uniqueGroups.push(group);
        }
    }

    let promises = [];
    for (let site of sites) {
        promises.push(
            getAllLists(site.url, readOptions, false)
        );
    }
    let lists = await Promise.all(promises);
    const filteredLists = [].concat(...lists).filter((e: any) => e.uniquePermissions === true);
    promises = [];
    for (let site of sites) {
        promises.push(
            getSitePermissions(site.url, readOptions, site.title)
        );
    }
    const permissions = await Promise.all(promises);
    promises = [];
    for (let group of uniqueGroups) {

        promises.push(
            getUsersByGroup(group.Users.__deferred.uri, readOptions)
        );

    }
    const usersByGroup = await Promise.all(promises);
    return {
        sites,
        lists: filteredLists,
        permissions,
        usersByGroup,
        uniqueGroups
    };
}