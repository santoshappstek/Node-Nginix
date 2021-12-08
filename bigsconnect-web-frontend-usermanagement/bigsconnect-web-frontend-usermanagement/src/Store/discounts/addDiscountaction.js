import { DISCOUNT_FETCH_INPUT,DISCOUNT_ADD,EDIT_DISCOUNT,DELETE_DISCOUNT,DISCOUNT_ERROR } from "../types";
import HttpService from '../../Services/HttpService';

export const discountFetchInput = (Input) => {
    return {
        type: DISCOUNT_FETCH_INPUT,
        Input
    }
}

export const discountForm = (response) => {
    return {
        type: DISCOUNT_ADD,
        response
    }
}

export const editdiscountfor = (response) => {
    return {
        type: EDIT_DISCOUNT,
        response
    }
}

export const deletediscountfor = (response) => {
    return {
        type: DELETE_DISCOUNT,
        response
    }
}

export const discountErrorForm = () => {
    return {
        type: DISCOUNT_ERROR
    }
}

export const addDiscountForm = (discount) => {
    console.log('discount',discount);
    return (dispatch) => {
        HttpService.adddiscount(discount)
            .then(response => {
                console.log('response',response);
                dispatch(discountForm(response.data));
            })
            .catch(error => {
                dispatch(discountErrorForm());
            })
    }
}

export const editDiscountForm = (discount) => {
    console.log('discount',discount);
     return (dispatch) => {
         HttpService.editdiscount(discount)
             .then(response => {
                 console.log('response',response);
                 dispatch(editdiscountfor(response.data));
             })
             .catch(error => {
                 dispatch(discountErrorForm());
             })
     }
 }

 export const deleteDiscountForm = (discount_id) => {
     console.log('discount_id',discount_id);
     return (dispatch) => {
         HttpService.deletediscount(discount_id)
             .then(response => {
                 console.log('response',response);
                 dispatch(deletediscountfor(response.data));
             })
             .catch(error => {
                 dispatch(discountErrorForm());
             })
     }
 }