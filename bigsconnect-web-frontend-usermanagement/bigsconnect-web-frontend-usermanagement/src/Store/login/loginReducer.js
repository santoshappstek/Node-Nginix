import { FETCH_LOGIN_INPUT, LOGIN_CHECK, LOGIN_ERROR} from "../types";

let initialState = {
    loginDetails: {
        username: '',
        password: ''
    },
    loginCheck: '',
    error: false
}

export default function loginReducer(state = initialState, action) {
    switch (action.type){
        case FETCH_LOGIN_INPUT:
            return {
                ...state,
                loginDetails: {
                    ...state.loginDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case LOGIN_CHECK:
            return {
                ...state,
                loginCheck: action.response

            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: true
            }
        
        default:
            return state
    }
}