import {AGENCY_USERS} from '../types';
import HttpService from '../../Services/HttpService';

export const agencyusersData = (response) =>{
    return {
        type: AGENCY_USERS,
        response:response
    }
}

export const getAgencyUsers = () => {
    return (dispatch) => {
        HttpService.agencyusers()
        .then(response => {
            dispatch(agencyusersData(response.data))
        })
    }
} 

