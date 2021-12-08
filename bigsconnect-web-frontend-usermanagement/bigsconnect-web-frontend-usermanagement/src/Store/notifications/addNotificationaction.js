import { NOTIFICATION_FETCH_INPUT,NOTIFICATION_ADD,EDIT_NOTIFICATION,DELETE_NOTIFICATION,NOTIFICATION_ERROR } from "../types";
import store from "../store";
import HttpService from '../../Services/HttpService';

export const notificationFetchInput = (Input) => {
    return {
        type: NOTIFICATION_FETCH_INPUT,
        Input
    }
}

export const notificationForm = (response) => {
    return {
        type: NOTIFICATION_ADD,
        response
    }
}

export const editnotificationfor = (response) => {
    return {
        type: EDIT_NOTIFICATION,
        response
    }
}

export const deletenotificationfor = (response) => {
    return {
        type: DELETE_NOTIFICATION,
        response
    }
}

export const notificationError = () => {
    return {
        type: NOTIFICATION_ERROR
    }
}

export const addnotificationForm = (notification) => {
    return (dispatch) => {
        console.log('note',notification);
        HttpService.addnotification(notification)
            .then(response => {
                console.log('response',response);
                dispatch(store, notificationForm(response.data))
            })
            .catch(error => {
                dispatch(notificationError());
            })
    }
}

export const editnotificationForm = (notification) => {
    return (dispatch) => {
        console.log('note',notification);
        HttpService.editnotification(notification)
            .then(response => {
                console.log('response',response);
                dispatch(store, editnotificationfor(response.data))
            })
            .catch(error => {
                dispatch(notificationError());
            })
    }
}

export const deletenotificationForm = (notify_id) => {
    return (dispatch) => {
        console.log('id',notify_id);
        HttpService.deletenotification(notify_id)
            .then(response => {
                console.log('response',response);
                dispatch(store, deletenotificationfor(response.data))
            })
            .catch(error => {
                dispatch(notificationError());
            })
    }
}