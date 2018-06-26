import { getMainUrl } from './api/helperFunctions';

export const SET_STAGE = 'SET_STAGE';
export const ALL_USERS = 'ALL_USERS';
export const ALL_SITES = 'ALL_SITES';
export const ALL_GROUPS = 'ALL_GROUPS';
export const SET_SEARCH_USER = 'SET_SEARCH_USER';
export const CURRENT_USER_GROUPS = 'CURRENT_USER_GROUPS';
export const CHANGE_URL = 'CHANGE_URL';

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