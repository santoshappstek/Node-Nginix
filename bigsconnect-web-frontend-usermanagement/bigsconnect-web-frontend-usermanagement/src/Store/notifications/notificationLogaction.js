import {  NOTIFICATION_LOG,NOTIFICATION_LOG_ERROR,MYCHAPTERS_LIST,MYCHAPTERS_ERROR } from "../types";
import HttpService from '../../Services/HttpService';

export const notificationlog = (response) => {
    return {
        type: NOTIFICATION_LOG,
        response
    }
}

export const notificationlogError = () => {
    return {
        type: NOTIFICATION_LOG_ERROR
    }
}

export const myChapterResponce = (response) => {
    return {
        type: MYCHAPTERS_LIST,
        response
    }
}

export const myChapterResponceError = () => {
    return {
        type: MYCHAPTERS_ERROR
    }
}


export const NotificationLogList = () => {
    return (dispatch) => {
      
        HttpService.notificationLog()
            .then(response => {
                console.log('response',response);
                dispatch(notificationlog(response.data))
            })
            .catch(error => {
                dispatch(notificationlogError());
            })
    }
}

export const myChapterList = ()=>{
    return (dispatch) => {
        HttpService.myChaptersService()
        .then(response=>{
            console.log('my chapter responce:- ',response);
            dispatch(myChapterResponce(response.data))

        })
        .catch(error =>{
            dispatch(myChapterResponceError())
        })
    }
}