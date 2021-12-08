import {BIGS_USERS} from "../types";

const initialState = {
    bigsusers:[],
}

export default function bigsUsersReducer(state = initialState, action){

    switch(action.type){

        case BIGS_USERS:
        return {
            ...state,
            bigsusers:action.response,            
        }
        default: return state
    }

}