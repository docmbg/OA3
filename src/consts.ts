import { getMainUrl } from './api/helperFunctions';

export const SET_STAGE = 'SET_STAGE';
export const ALL_USERS = 'ALL_USERS';

export const readOptions = {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose'
    }
};
export const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
export const siteUrl = getMainUrl(paramUrl);