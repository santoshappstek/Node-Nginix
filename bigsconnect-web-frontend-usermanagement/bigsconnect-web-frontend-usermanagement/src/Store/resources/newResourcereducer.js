import { RESOURCE_FETCH_INPUT,ADD_RESOURCE,EDIT_RESOURCE,DELETE_RESOURCE,RESOURCE_ERROR } from "../types";

let initialState = {
    resourceDetails: {},   
    resource_res: '',
    editresource_res:'',
    deleteresource_res:'',
    error: false,
}

export default function addResourceReducer(state = initialState, action) {
    switch (action.type) {
        case RESOURCE_FETCH_INPUT:
            return {
                ...state,
                resourceDetails: {
                    ...state.resourceDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case ADD_RESOURCE:
            return {
                ...state,
                resource_res: action.response
            }
        case EDIT_RESOURCE:
            return {
                ...state,
                editresource_res: action.response
            }
        case DELETE_RESOURCE:
            return {
                ...state,
                deleteresource_res: action.response
            }
        case RESOURCE_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}