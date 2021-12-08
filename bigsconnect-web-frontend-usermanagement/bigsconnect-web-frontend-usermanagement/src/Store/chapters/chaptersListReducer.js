import { CHAPTERS_LIST } from "../types";

const initialState = {
    chapterslist:[],
}

export default function chaptersListreducer(state = initialState, action){

    switch(action.type){

        case CHAPTERS_LIST:
        return {
            ...state,
            chapterslist:action.response,
        }
        default: return state
    }

}