import { RESOURCES_LIST } from "../types";

const initialState = {
    resources:[],
}

export default function getResourceslistreducer(state = initialState, action){
    switch(action.type){
        case RESOURCES_LIST:
        return {
            ...state,
            resources:action.response,
        }
        default: return state
    }
}