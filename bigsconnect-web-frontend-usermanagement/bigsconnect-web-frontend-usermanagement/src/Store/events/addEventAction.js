import { EVENT_TYPES, EVENT_FETCH_INPUT, EVENT_ADD, EDIT_EVENT, DELETE_EVENT, EVENT_ERROR } from '../types'
import store from '../store'
import HttpService from '../../Services/HttpService'

    export const EventFetchInput = (Input) => {
        return {
         type: EVENT_FETCH_INPUT,
         Input
        
        }
    }
    export const EventForm = (response) =>{
            return{
                type : EVENT_ADD,
                response
            }        
    }

    export const editeventfor = (response) => {
            return {
                type: EDIT_EVENT,
                response
            }
    }
        
    export const deleteeventfor = (response) => {
            return {
                type: DELETE_EVENT,
                response
            }
    }

    export const EventError = () =>{
            return{
            type: EVENT_ERROR
        }
    }
    export const EventTypes = (response) =>{
        return{
            type: EVENT_TYPES,
            response
        }
    }

    export const getEventTypes = () => {
        return (dispatch) => {
            HttpService.eventtypes()
                .then(response => {
                    console.log('response',response);
                    dispatch(EventTypes(response.data));
                })
                .catch(error => {
                    dispatch(EventError());
                })
        }
    }

    export const addEventForm = (eventdata) => {
        console.log('eventdata',eventdata);
            return (dispatch)=>{
               HttpService.addevent(eventdata)
               .then(response=>{
                console.log('response',response);
                   dispatch(EventForm(response.data))
               }).catch(error=> {
                    dispatch(EventError());
                })               
            }
    }

    export const editEventtForm = (eventdata) => {
            console.log('event',eventdata);
             return (dispatch) => {
                 HttpService.editevent(eventdata)
                     .then(response => {
                         console.log('response',response);
                         dispatch(editeventfor(response.data));
                     })
                     .catch(error => {
                         dispatch(EventError());
                     })
             }
    }
        
    export const deleteEventForm = (event_id) => {
             console.log('event_id',event_id);
             return (dispatch) => {
                 HttpService.deleteevent(event_id)
                     .then(response => {
                         console.log('response',response);
                         dispatch(deleteeventfor(response.data));
                     })
                     .catch(error => {
                         dispatch(EventError());
                     })
             }
    }
