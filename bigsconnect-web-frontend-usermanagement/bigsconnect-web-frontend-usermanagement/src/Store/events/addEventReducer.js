import { EVENT_TYPES, EVENT_FETCH_INPUT, EVENT_ADD, EVENT_ERROR  } from "../types";

let initialState = {
    eventtypes:[],
    addEventDetails: {},   
    addEvent_res: '',
    error: false,
}

export default function addEventReducer(state = initialState, action) {
    switch (action.type) {
        case EVENT_TYPES:
            return {
                ...state,
                eventtypes: action.response
            }
        case EVENT_FETCH_INPUT:
            return {
                ...state,
                addEventDetails: {
                    ...state.addEventDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case EVENT_ADD:
            return {
                ...state,
                addEvent_res: action.response
            }
      
        case EVENT_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}