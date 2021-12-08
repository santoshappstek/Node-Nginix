import { DISCOUNT_FETCH_INPUT,DISCOUNT_ADD,EDIT_DISCOUNT,DELETE_DISCOUNT,DISCOUNT_ERROR, CHAPTER_FETCH_INPUT, CHAPTER_ADD, CHAPTER_ADD_ERROR } from "../types";

let initialState = {
    chapterDetails: {},   
    addchapter_res: '',
    error: false,
}

export default function addChapterReducer(state = initialState, action) {
    switch (action.type) {
        case CHAPTER_FETCH_INPUT:
            return {
                ...state,
                chapterDetails: {
                    ...state.chapterDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case CHAPTER_ADD:
            return {
                ...state,
                addchapter_res: action.response
            }
        
        case CHAPTER_ADD_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}