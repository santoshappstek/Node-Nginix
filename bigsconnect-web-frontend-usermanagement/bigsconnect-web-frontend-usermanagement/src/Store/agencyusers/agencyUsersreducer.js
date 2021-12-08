import {AGENCY_USERS} from "../types";

const initialState = {
    agencyusers:[],
}

export default function agencyUsersreducer(state = initialState, action){

    switch(action.type){

        case AGENCY_USERS:
        return {
            ...state,
            agencyusers:action.response,
        }
        default: return state
    }

}