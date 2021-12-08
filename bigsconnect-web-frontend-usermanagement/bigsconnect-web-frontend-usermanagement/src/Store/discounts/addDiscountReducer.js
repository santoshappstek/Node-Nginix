import { DISCOUNT_FETCH_INPUT,DISCOUNT_ADD,EDIT_DISCOUNT,DELETE_DISCOUNT,DISCOUNT_ERROR } from "../types";

let initialState = {
    discountDetails: {},   
    adddiscount_res: '',
    editdiscount_res: '',
    deletediscount_res: '',
    error: false,
}

export default function addDiscountReducer(state = initialState, action) {
    switch (action.type) {
        case DISCOUNT_FETCH_INPUT:
            return {
                ...state,
                discountDetails: {
                    ...state.discountDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case DISCOUNT_ADD:
            return {
                ...state,
                adddiscount_res: action.response
            }
        case EDIT_DISCOUNT:
            return {
                ...state,
                editdiscount_res: action.response
            }
        case DELETE_DISCOUNT:
            return {
                ...state,
                deletediscount_res: action.response
            }
        case DISCOUNT_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}