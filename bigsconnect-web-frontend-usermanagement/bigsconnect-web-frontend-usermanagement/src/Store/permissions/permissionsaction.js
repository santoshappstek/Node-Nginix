import {GET_PERMISSIONS} from '../types';
import HttpService from '../../Services/HttpService';

export const permissionsData = (response) =>{
    return {
        type: GET_PERMISSIONS,
        response: response
    }
}

export const getPermissions = () => {
    return (dispatch) => {
        HttpService.permissions()
        .then(response => {
            //console.log('response',response.data);
            dispatch(permissionsData(response.data));
        })
    }
}
    

