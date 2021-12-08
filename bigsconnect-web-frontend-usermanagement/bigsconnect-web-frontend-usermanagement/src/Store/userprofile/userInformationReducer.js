import { USERINFO_INPUT,USERINFO_ADD,USERINFO_ERROR } from "../types";

let initialState = {
    userInfoDetails: {},   
    userInfo_res: '',
    userData :  {} ,
    error: false,
}

export default function userInformationReducer(state = initialState, action) {
    switch (action.type) {
        case USERINFO_INPUT:
            return {
                ...state,
                userInfoDetails: {
                    ...state.userInfoDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case USERINFO_ADD:
            return {
                ...state,
                userInfo_res: action.response,
                userData: action.info

            }
        case USERINFO_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}