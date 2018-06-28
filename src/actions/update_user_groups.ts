import { siteUrl, readOptions, postOptions, UPDATE_USER_GROUPS } from '../consts';

interface IuserGroups {
    task: string;
    _requestDigest: string;
    user: Object;
    group?: Object;
    crudOperation?: string;
    currentUserGroups?: any;

}

export function updateUserGroups(config: IuserGroups) {
    readOptions.headers['X-RequestDigest'] = config._requestDigest;
    postOptions.headers['X-RequestDigest'] = config._requestDigest;
    console.log(config);
    if (config.task === 'create') {
        return {
            type: UPDATE_USER_GROUPS,
            payload: {
                task: config.task,
                siteUrl,
                readOptions,
                userId: config.user[`Id`]
            }
        };
    } else { // 'update'
        return {
            type: UPDATE_USER_GROUPS,
            payload: {
                task: config.task,
                siteUrl,
                postOptions,
                user: config.user,
                group: config.group,
                crudOperation: config.crudOperation,
                currentUserGroups: config.currentUserGroups
            }
        };
    }

}
