import {CHAPTERS_LIST,CHAPTERS_ERROR} from '../types';
import HttpService from '../../Services/HttpService';

export const chaptersData = (response) =>{
    return {
        type: CHAPTERS_LIST,
        response: response
    }
}
export const chapterserror = () => {
    return {
        type: CHAPTERS_ERROR
    }
}

export const getChapters = () => {
    return (dispatch) => {
        HttpService.chapterslist()
        .then(response => {
            console.log("chapters responce:- ",response)
            dispatch(chaptersData(response.data));
        })
        .catch(error => {
            dispatch(chapterserror());
        })
    }
}
    

