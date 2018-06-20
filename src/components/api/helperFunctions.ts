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

export function getMainUrl(param: string) {
  let urlParts = window.location.href.split(`${param}/`);
  let result = `${urlParts[0]}${param}/${urlParts[1].split('/')[0]}`;
  return result;
}