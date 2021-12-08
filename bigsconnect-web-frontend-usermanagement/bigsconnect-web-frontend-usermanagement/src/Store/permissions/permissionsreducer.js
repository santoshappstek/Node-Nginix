import { GET_PERMISSIONS } from "../types";

const initialState = {
    permissions:[],
}

export default function getPermissionsreducer(state = initialState, action){
    switch(action.type){
        case GET_PERMISSIONS:
        return {
            ...state,
            permissions:action.response,
        }
        default: return state
    }

}