import { helper_getCurrenUserGroups, addRemoveUserToGroup } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let { payload, type } = event.data.action;
    console.log('event data', event.data);
    console.log('payload', );
    if (payload.task === 'create') {
        let { siteUrl, readOptions, userId }: any = payload;

        Promise.resolve(helper_getCurrenUserGroups(siteUrl, readOptions, userId))
            .then(res => {
                ctx.postMessage({
                    type,
                    payload: res
                });
            });
    } else {

        let { siteUrl, group, postOptions, user, crudOperation, currentUserGroups }: any = payload;
        Promise.resolve(addRemoveUserToGroup(siteUrl, group[`Id`], postOptions, user, crudOperation))
            .then(res => {
                let toBeDeleted = 0;
                let flag = 0;
                for (let entry of currentUserGroups) {
                    if (entry[`Id`] === group[`Id`]) {
                        toBeDeleted = flag;
                        break;
                    }
                    flag++;
                }
                if (crudOperation === 'add') {
                    currentUserGroups = [...currentUserGroups, group];
                } else {
                    currentUserGroups.splice(toBeDeleted, 1);
                }
                // let modifiedGroups: any = currentUserGroups.filter((e: any) => groups.includes(e[`Id`]));
                console.log('worker groups', res);
                ctx.postMessage({
                    type,
                    payload: currentUserGroups
                });
            });
    }
});