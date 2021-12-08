import { NOTIFICATION_FETCH_INPUT,NOTIFICATION_ADD,EDIT_NOTIFICATION,DELETE_NOTIFICATION,NOTIFICATION_ERROR } from "../types";

let initialState = {
    notificationDetails: {},   
    addnotification_res: '',
    editnotification_res:'',
    deletenotification_res:'',
    error: false,
}

export default function addNotificationReducer(state = initialState, action) {
    switch (action.type) {
        case NOTIFICATION_FETCH_INPUT:
            return {
                ...state,
                notificationDetails: {
                    ...state.notificationDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case NOTIFICATION_ADD:
            return {
                ...state,
                addnotification_res: action.response
            }
        case EDIT_NOTIFICATION:
            return {
                ...state,
                editnotification_res: action.response
            }    
        case DELETE_NOTIFICATION:
            return {
                ...state,
                deletenotification_res: action.response
            } 
        case NOTIFICATION_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}