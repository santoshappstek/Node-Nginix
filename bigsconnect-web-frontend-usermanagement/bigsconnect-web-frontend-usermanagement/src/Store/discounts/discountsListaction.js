import {DSCOUNTS_LIST} from '../types';
import HttpService from '../../Services/HttpService';

export const discountsData = (response) =>{
    return {
        type: DSCOUNTS_LIST,
        response: response
    }
}

export const getDiscounts = (chapter_id) => {
    return (dispatch) => {
        HttpService.discountslist(chapter_id)
        .then(response => {
            console.log("discount list:- ",response.data)
            dispatch(discountsData(response.data));
        })
    }
}
    

