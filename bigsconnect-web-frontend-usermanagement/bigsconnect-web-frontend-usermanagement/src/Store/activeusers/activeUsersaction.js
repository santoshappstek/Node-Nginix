import {ACTIVE_USERS} from '../types';
import HttpService from '../../Services/HttpService';

export const activeusersData = (response) =>{
    return {
        type: ACTIVE_USERS,
        response: response
    }
}

export const getActiveUsers = () => {
    return (dispatch) => {
        HttpService.activeusers()
        .then(response => {
            dispatch(activeusersData(response.data));
        })
    }
}
    

