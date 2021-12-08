import { DSCOUNTS_LIST } from "../types";

const initialState = {
    discountslist:[],
}

export default function discountsListreducer(state = initialState, action){

    switch(action.type){

        case DSCOUNTS_LIST:
        return {
            ...state,
            discountslist:action.response,
        }
        default: return state
    }

}