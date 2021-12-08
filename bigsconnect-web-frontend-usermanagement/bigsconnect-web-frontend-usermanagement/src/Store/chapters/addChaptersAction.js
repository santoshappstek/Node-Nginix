import { CHAPTER_FETCH_INPUT,CHAPTER_ADD,CHAPTER_ADD_ERROR } from "../types";
import HttpService from '../../Services/HttpService';

export const chapterFetchInput = (Input) => {
    return {
        type: CHAPTER_FETCH_INPUT,
        Input
    }
}

export const chapterForm = (response) => {
    return {
        type: CHAPTER_ADD,
        response
    }
}

export const chapterErrorForm = () => {
    return {
        type: CHAPTER_ADD_ERROR
    }
}

export const addChapterForm = (chapterInput) => {
    console.log('chapterInput ',chapterInput);
    return (dispatch) => {
        HttpService.addChapterservice(chapterInput)
            .then(response => {
                console.log('add chapter response',response);
                dispatch(chapterForm(response.data));
            })
            .catch(error => {
                dispatch(chapterErrorForm());
            })
    }
}

