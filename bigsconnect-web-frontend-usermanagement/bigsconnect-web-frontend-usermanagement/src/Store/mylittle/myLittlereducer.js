import { LITTLE_FETCH_INPUT,LITTLE_ADD,LITTLE_ERROR } from "../types";

let initialState = {
    littleDetails: {},   
    addlittle_res: '',
    error: false,
}

export default function myLittlereducer(state = initialState, action) {
    switch (action.type) {
        case LITTLE_FETCH_INPUT:
            return {
                ...state,
                littleDetails: {
                    ...state.littleDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case LITTLE_ADD:
            return {
                ...state,
                addlittle_res: action.response
            }
        case LITTLE_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}