import { ACTIVE_USERS, AGENCY_USERS, BIGS_USERS, INACTIVE_USERS,ORGANISE_USER, USER_ERROR } from "../types";

let initialState = {
    data:[],
    error: false
}

export default function userManagementReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIVE_USERS:
            return {
                ...state,
                data: action.response
            }
        case AGENCY_USERS:
            return {
                ...state,
                data: action.response
            }
        case BIGS_USERS:
            return {
                ...state,
                data: action.response
            }
        case INACTIVE_USERS:
            return {
                ...state,
                data: action.response
            }
            case ORGANISE_USER:
                return {
                    ...state,
                    data: action.response
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