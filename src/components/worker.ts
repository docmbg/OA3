
import {
    // getAllSubSites,
    // getFolderUrisRecursive,
    // getAllLists,
    getAllUsers,
    createFolderInformation,
    getEmptyFolders
} from './api/helperFunctions';

const ctx: Worker = self as any;
// Post data to parent thread

// Respond to message from parent thread
ctx.addEventListener('message', (event) => {
    let data = event.data;
    const readOptions: any = {
        method: 'GET', // or 'PUT'
        credentials: 'include',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'X-RequestDigest': event.data._requestDigest,
            'content-type': 'application/json;odata=verbose'
        }
    };
    switch (data.operation) {
        case 'folders':
            Promise.resolve(getEmptyFolders(data.siteUrl, readOptions, data._requestDigest))
                .then(res => {
                    let emptyFolders = createFolderInformation(data.paramUrl, res, data.users);
                    ctx.postMessage({ res: emptyFolders });
                });
            break;
        case 'users':
            Promise.resolve(getAllUsers(data.siteUrl, readOptions))
                .then(res => {
                    ctx.postMessage({ res: res });
                });
            break;
        default:
            break;
    }

});