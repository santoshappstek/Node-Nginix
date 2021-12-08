import { NOTIFICATION_LOG,NOTIFICATION_LOG_ERROR,MYCHAPTERS_LIST,MYCHAPTERS_ERROR } from "../types";

let initialState = {
    notificationLog: [],
    mychapterslist :[],
    error: false,
}

export default function notificationLogReducer(state = initialState, action) {
    switch (action.type) {        
        case NOTIFICATION_LOG:
            return {
                ...state,
                notificationLog: action.response
            }        
        case NOTIFICATION_LOG_ERROR:
            return {
                ...state,
                error: true
            }
        case  MYCHAPTERS_LIST:
            return {
                ...state,
                mychapterslist : action.response
            }

            case MYCHAPTERS_ERROR:
                return {
                    ...state,
                    error: true
                }
        default:
            return state
    }
}