import { EVENTS_LIST,BIGS_EVENTS,RANGE_EVENTS } from "../types";

const initialState = {
    eventslist:[],
    bigseventslist:[],
    rangeeventslist:[]
}

export default function eventsListreducer(state = initialState, action){

    switch(action.type){

        case EVENTS_LIST:
        return {
            ...state,
            eventslist:action.response,
        }

        case BIGS_EVENTS:
        return {
            ...state,
            bigseventslist:action.response,
        }
        case RANGE_EVENTS:
            return{
                ...state,
                rangeeventslist:action.response
            }
        default: return state
    }

}