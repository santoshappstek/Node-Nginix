import { SETTINGS_INPUT, SETTINGS, SETTINGS_ERROR, USER_TYPE } from "../types";
import HttpService from '../../Services/HttpService';

export const settingsInput = (Input) => {
    return {
        type: SETTINGS_INPUT,
        Input
    }
}

export const settings = (response) => {
    return {
        type: SETTINGS,
        response
    }
}

export const UserTypeName = (response) => {
    return {
        type: USER_TYPE,
        response
    }
}

export const settingserror = () => {
    return {
        type: SETTINGS_ERROR
    }
}

export const postsettingsForm = (settings) => {
    console.log('settings',settings);
    return (dispatch) => {
        HttpService.accountsettings(settings)
            .then(response => {
                console.log('settings response',response.data);
                dispatch(settings(response.data));
            })
            .catch(error => {
                dispatch(settingserror());
            })
    }
}

export const usertype = (usertype_id) => {
    console.log({ usertype_id })
    return (dispatch) => {
        HttpService.getusertypename({ usertype_id})
            .then(response => {
                console.log('getusertypename', response.data);
                dispatch(UserTypeName(response.data));
            })
            .catch(error => {
                dispatch(settingserror());
            })
    }
}