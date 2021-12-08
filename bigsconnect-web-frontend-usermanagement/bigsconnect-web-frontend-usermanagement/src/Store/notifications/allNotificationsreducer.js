import { ALL_NOTIFICATIONS, SENT_NOTIFICATIONS, SCHEDULED_NOTIFICATIONS } from "../types";

const initialState = {
    allnotifications:[],
}

export default function allNotificationsreducer(state = initialState, action){

    switch(action.type){

        case ALL_NOTIFICATIONS:
            return {
                ...state,
                allnotifications:action.response,
            }
        case SENT_NOTIFICATIONS:
            return {
                ...state,
                allnotifications: action.response,
            }
        case SCHEDULED_NOTIFICATIONS:
            return {
                ...state,
                allnotifications: action.response,
            }
        default: return state
    }

}