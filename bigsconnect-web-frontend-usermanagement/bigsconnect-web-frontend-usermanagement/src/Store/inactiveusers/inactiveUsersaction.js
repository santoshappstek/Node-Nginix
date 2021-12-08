import {INACTIVE_USERS} from '../types';
import HttpService from '../../Services/HttpService';

export const inactiveusersData = (response) =>{
    return {
        type: INACTIVE_USERS,
        response:response
    }
}

export const getInActiveUsers = () => {
    return (dispatch) => {
        HttpService.inactiveusers()
        .then(response => {
            dispatch(inactiveusersData(response.data))
        })
    }
}

    

