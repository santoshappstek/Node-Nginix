import {INACTIVE_USERS} from "../types";

const initialState = {
    inactiveusers:[],
}

export default function inactiveUsersreducer(state = initialState, action){

    switch(action.type){

        case INACTIVE_USERS:
        return {
            ...state,
            inactiveusers:action.response,
        }
        default: return state
    }

}