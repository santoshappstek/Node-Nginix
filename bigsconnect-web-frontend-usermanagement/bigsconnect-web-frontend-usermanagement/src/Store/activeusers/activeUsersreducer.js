import { ACTIVE_USERS } from "../types";

const initialState = {
    activeusers:[],
}

export default function activeUsersreducer(state = initialState, action){

    switch(action.type){

        case ACTIVE_USERS:
        return {
            ...state,
            activeusers:action.response,
        }
        default: return state
    }

}