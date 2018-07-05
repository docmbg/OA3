// import { getMainUrl } from './api/helperFunctions';

export const SET_STAGE = 'SET_STAGE';
export const ALL_USERS = 'ALL_USERS';
export const ALL_SITES = 'ALL_SITES';
export const ALL_GROUPS = 'ALL_GROUPS';
export const UPDATE_USER_GROUPS = 'UPDATE_USER_GROUPS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_COPIED_PERMISSIONS = 'UPDATE_COPIED_PERMISSIONS';
export const PASTE_PERMISSIONS = 'PASTE_PERMISSIONS';
export const GENERATE_MATRIX = 'GENERATE_MATRIX';
export const GENERATE_EMPTY_FOLDERS = 'GENERATE_EMPTY_FOLDERS';

export const readOptions = {
    method: 'GET', // or 'PUT'
    credentials: 'include',
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose'
    }
};

export const postOptions = {
    method: 'POST', // or 'PUT'
    credentials: 'include',
    headers: {
        'Accept': 'application/json; odata=verbose',
        'content-type': 'application/json;odata=verbose'
    }
};

export const paramUrl = window.location.href.includes('sites') ? 'sites' : 'teams';
export const siteUrl = '';