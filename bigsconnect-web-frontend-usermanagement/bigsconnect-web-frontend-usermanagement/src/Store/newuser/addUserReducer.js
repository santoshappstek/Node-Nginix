import { USER_FETCH_INPUT,USER_ADD,USER_ERROR} from "../types";

let initialState = {
    userDetails: {},   
    adduser_res: '',
    error: false,
}

export default function addUserReducer(state = initialState, action) {
    switch (action.type) {
        case USER_FETCH_INPUT:
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case USER_ADD:
            return {
                ...state,
                adduser_res: action.response
            }
        case USER_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}