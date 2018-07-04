import { addRemoveUserToGroup } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type } = event.data.action;
    let { groupsAdd, groupsRemove, siteUrl, postOptions, currentUser } = payload;
    Promise.resolve(addRemoveMultiple(groupsAdd, groupsRemove, siteUrl, postOptions, currentUser))
        .then(res => {
            console.log('worker groups', res);
            ctx.postMessage({
                type,
                payload: groupsAdd
            });
        });
});

async function addRemoveMultiple(
    groupsAdd: any, groupsRemove: any, siteUrl: string, postOptions: any, currentUser: Object) {
    let promises = [];
    for (let group of groupsRemove) {
        promises.push(
            addRemoveUserToGroup(siteUrl, group[`Id`], postOptions, currentUser, 'remove')
        );
    }
    await Promise.all(promises);
    promises = [];
    for (let group of groupsAdd) {
        promises.push(
            addRemoveUserToGroup(siteUrl, group[`Id`], postOptions, currentUser, 'add')
        );
    }
    await Promise.all(promises);
    return 1;
}