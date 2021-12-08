import { USER_DETAILS,USERINFO_ERROR,DELETE_USER,SEND_PASSWORDMAIL,PROFILEPIC_UPLOAD,ACTIVATE_USER } from "../types";

let initialState = {   
    userdetails_res: '',
    delete_user:{},
    activate_user:{},
    send_resetmail:{},
    error: false,
}

export default function userdetailsreducer(state = initialState, action) {
    switch (action.type) {
        case USER_DETAILS:
            return {
                ...state,
                userdetails_res: action.response
            }
        case ACTIVATE_USER:
            return{
                ...state,
                activate_user: {
                    ...state.activate_user,
                    [action.Input.key]: action.Input.value
                }
            }
        case DELETE_USER:
            return{
                ...state,
                delete_user: {
                    ...state.delete_user,
                    [action.Input.key]: action.Input.value
                }
            }
        case SEND_PASSWORDMAIL:
            return{
                ...state,
                send_resetmail: {
                    ...state.send_resetmail,
                    [action.Input.key]: action.Input.value
                }
            }
        case PROFILEPIC_UPLOAD:
            return{
                ...state,
                profilepic_upload:{
                    ...state.profilepic_upload,
                    [action.Input.key]: action.Input.value
                }
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