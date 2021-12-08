import {EVENTS_LIST,BIGS_EVENTS,RANGE_EVENTS} from '../types';
import HttpService from '../../Services/HttpService';

export const eventsData = (response) =>{
    return {
        type: EVENTS_LIST,
        response: response
    }
}


export const bigseventsData=(response)=>{
    return{
        type:BIGS_EVENTS,
        response: response
    }
}

export const rangeevetsdata=(response)=>{
    return{
        type:BIGS_EVENTS,
        response: response
    }
}

export const getEvents = (chapter_id) => {
    return (dispatch) => {
        HttpService.eventslist(chapter_id)
        .then(response => {
            console.log('Events list:- ', response.data);
            dispatch(eventsData(response.data));
        })
    }
}

export const getBigsEvents = () => {
    return (dispatch) => {
        HttpService.bigseventslist()
        .then(response => {
            console.log('Bigs Events list:- ', response.data);
            dispatch(bigseventsData(response.data));
        })
    }
}

export const getRangeEventList = (inputrange) => {
    return (dispatch) => {
        HttpService.allEventsList(inputrange)
        .then(response => {
            console.log('range Events list:- ', response.data);
            dispatch(rangeevetsdata(response.data));
        })
    }
}


    

