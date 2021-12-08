import { BIGS_USERS } from '../types';
import HttpService from '../../Services/HttpService';

export const bigsusersData = (response) =>{
    return {
        type: BIGS_USERS,
        response:response
    }
}

export const getBigsUsers = () => {
       return (dispatch) => {
        HttpService.bigsusers()
        .then((response) => {
            dispatch(bigsusersData(response.data))
        })
    }
} 

