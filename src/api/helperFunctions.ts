export async function getAllSubSites(url: string, arr: Array<String>, mainUrl: string, options: any) {
    let promises: any = [];
    let fetchUrl = url !== mainUrl ? url : `${mainUrl}/_api/Web/webs`;
    await fetch(fetchUrl, options).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            response.d.results.map((e: Object) => {
                arr.push(e[`Url`]);
                promises.push(getAllSubSites(`${e[`__metadata`][`uri`]}/webs`, arr, mainUrl, options));

            });
        });
    return Promise.all(promises).then(res => res);
}

export async function getFolderUrisRecursive(guid: string, options: any) {
    const view = `ServerRelativeUrl&@v1={"ViewXml":"<View Scope='RecursiveAll'>` +
        `<Query><Where><Eq><FieldRef Name='FSObjType' /><Value Type='Integer'>1</Value></Eq></Where></Query></View>"}`;
    let folderURIs = await fetch(
        `${guid}/GetItems(query=@v1)?$expand=Folder/` + `${view}`,
        options
    ).then(res => res.json()).then(res => res.d.results);
    return folderURIs;
}

export async function getAllLists(url: string, options: any, libsOnly: boolean) {
    let getListsUrl = `${url}/_api/Web/Lists`;
    let lists = await fetch(getListsUrl, options).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (libsOnly) {
                return response.d.results.filter((e: Object) => e[`BaseTemplate`] === 101);
            } else {
                return response.d.results;
            }
        });
    return lists;
}

export async function getAllUsers(url: string, readOptions: any) {
    let users = await fetch(`${url}/_api/web/siteusers`, readOptions)
        .then(res => res.json())
        .then(res => res.d.results);
    return users;
}

export function createFolderInformation(url: string, folders: Array<Object>, users: Array<Object>) {
    let emptyFolders: any = [];
    for (let folder of folders) {
        let ph = {};
        ph[`Name`] = folder[`Folder`][`Name`];
        ph[`URL`] = `${url}${folder[`Folder`][`ServerRelativeUrl`]}`;
        ph[`Author`] = users.filter((e: Object) => e[`Id`] === folder[`AuthorId`])[0][`Email`];
        ph[`Modified By`] = users.filter((e: Object) => e[`Id`] === folder[`EditorId`])[0][`Email`];
        ph[`Created`] = new Date(folder[`Folder`][`TimeCreated`]).toLocaleDateString();
        ph[`Last Modified`] = new Date(folder[`Folder`][`TimeLastModified`]).toLocaleDateString();
        emptyFolders.push(ph);
    }
    return emptyFolders;
}

export async function getEmptyFolders(siteUrl: string, readOptions: any, requestDigest: string) {
    let sites: any = [];
    let promises = [];
    let lists: any = [];
    let folders;
    await getAllSubSites(siteUrl, sites, siteUrl, readOptions);
    for (let site of sites) {
        promises.push(getAllLists(site, readOptions, true));
    }
    await Promise.all(promises).then(res => lists = res);
    promises = [];
    const postOptions: any = {
        method: 'POST', // or 'PUT'
        credentials: 'include',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'X-RequestDigest': requestDigest,
            'content-type': 'application/json;odata=verbose'
        }
    };
    for (let i = 0; i < sites.length; i++) {
        for (let j = 0; j < lists[i].length; j++) {
            promises.push(getFolderUrisRecursive(lists[i][j][`__metadata`][`id`], postOptions));
        }
    }
    await Promise.all(promises).then(res => folders = res);
    console.log(folders);
    let emptyFolders = [].concat.apply([], folders).filter((e: Object) => e[`Folder`][`ItemCount`] === 0);
    console.log(emptyFolders);
    return emptyFolders;
}

export async function getAllGroups(url: string, readOptions: any) {
    let groups = await fetch(`${url}/_api/web/roleassignments/groups`, readOptions)
        .then(res => res.json())
        .then(res => res.d.results);
    return groups;
}

export async function getCurrenUserGroups(url: string, readOptions: any, userId: number) {
    let groups = await fetch(`${url}/_api/web/GetUserById(${userId})/grousp`, readOptions)
        .then(res => res.json())
        .then(res => res.d.results);
    return groups;
}

export async function addRemoveUserToGroup(url: string, groupId: number, postOptions: any, user: any, operation: string) {
    let body;
    let complete;
    if (operation === 'add') {
        body = JSON.stringify({
            '__metadata': { 'type': 'SP.User' },
            'LoginName': user.LoginName
        });
        postOptions.body = body;
        complete = fetch(`${url}_api/Web/sitegroups(${groupId})/users`, postOptions)
            .then(res => res.json())
            .then(res => complete = true);
    }
    else if (operation === 'remove') {
        complete = fetch(`${url}_api/Web/sitegroups(${groupId})/users/removebyid(${user.Id})`, postOptions)
            .then(res => res.json())
            .then(res => complete = true);
    }
    return complete;
}

export async function getWorkflows(sites: Array<string>, readOptions: any) {
    let promises = [];
    let workflowsLists: any = [];
    let workflows: any = [];
    for (let site of sites) {
        promises.push(fetch(`${site}/_api/web/Lists/getByTitle('Workflows')`, readOptions)
            .then(res => res.json()).
            then(res => workflowsLists.push(res))
        )
    }
    await Promise.all(promises);
    workflowsLists = workflowsLists.filter((e: Object) => !e.hasOwnProperty('error'));
    promises = [];
    for (let list of workflowsLists) {
        for (let i = 1; i <= list.d.ItemCount; i++) {
            promises.push(fetch(`${list.d.Items.__deferred.uri}(${i})/File`, readOptions)
                .then(res => res.json())
                .then(res => {
                    if (res.d.File === undefined && res.d.Name.includes('.xsn')) { //res.File = null when file is empty
                        return Promise.resolve(getAuthor(res.d.Author.__deferred.uri, readOptions))
                            .then(author => {
                                workflows.push({
                                    'Author': author,
                                    'Name': res.d.Name.split('.xsn')[0],
                                    'Server Relatvive Url': res.d.ServerRelativeUrl
                                })
                            });
                    } else {
                        return;
                    }
                })
            )
            // e.g.https://dxcportal.sharepoint.com/sites/HPI-Account/AGov/_api/Web/
            // Lists(guid'ecf90f23-4b10-4cb7-ae0f-b2c28f7da237')/Items(3)/File
        }
    }
    await Promise.all(promises);
    return workflows;

}

// export async function getVersioning(lists: Array<object>, readOptions: any) {
//     let promises = [];
//     let rootFolders:any = [];
//     for (let list of lists) {
//         promises.push(fetch(list[`RootFolder`].__deferred.uri, readOptions)
//             .then(res => res.json()).then(res => rootFolders.push(res.d.Properties.__deferred.uri))
//         )
//     }
//     await Promise.all(promises);
//     promises = [];
//     for(let folder of rootFolders){

//     }

// }

async function getAuthor(url: string, readOptions: any) {
    let author = await fetch(url, readOptions)
        .then(res => res.json())
        .then(res => res.d.Email);
    return author;
}

export function getMainUrl(param: string) {
    let urlParts = window.location.href.split(`${param}/`);
    let result = `${urlParts[0]}${param}/${urlParts[1].split('/')[0]}`;
    return result;
}

