import { addRemoveUserToGroup } from '../api/helperFunctions';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    const { payload, type } = event.data.action;
    const { siteUrl, postOptions, users } = payload;
    Promise.resolve(deleteUsers(users, postOptions, siteUrl))
        .then(res => {
            ctx.postMessage({
                type,
                payload: {
                    loading: false,
                    usersLeft: res,
                }
            });
        });
});

async function deleteUsers(users: Array<Object>, postOptions: any, siteUrl: string) {
    let promises = [];
    let limit = 500;
    let counter = 0;
    while (counter < users.length) {
        promises = [];
        if (counter + limit <= users.length) {
            for (counter; counter <= limit; counter++) {
                for (let group of users[counter][`Groups`].results) {
                    promises.push(addRemoveUserToGroup(siteUrl, group.Id, postOptions, users[counter], 'remove'));
                }
            }
            limit += limit;
            await Promise.all(promises);

        } else {
            for (counter; counter < users.length; counter++) {
                for (let group of users[counter][`Groups`].results) {
                    promises.push(addRemoveUserToGroup(siteUrl, group.Id, postOptions, users[counter], 'remove'));
                }
            }
            await Promise.all(promises);
        }

    }
    return 0;
}