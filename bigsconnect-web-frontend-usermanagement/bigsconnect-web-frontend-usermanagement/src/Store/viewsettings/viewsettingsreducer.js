import { VIEWSETTINGS_LIST } from "../types";

const initialState = {
    viewsettings:[],
}

export default function getViewSettingsreducer(state = initialState, action){
    switch(action.type){
        case VIEWSETTINGS_LIST:
        return {
            ...state,
            givenPermissions:action.response,
        }
        default: return state
    }
}