import { RESOURCE_FETCH_INPUT,ADD_RESOURCE,EDIT_RESOURCE,DELETE_RESOURCE,RESOURCE_ERROR } from "../types";
import HttpService from '../../Services/HttpService';

export const resourceFetchInput = (Input) => {
    return {
        type: RESOURCE_FETCH_INPUT,
        Input
    }
}

export const resourceForm = (response) => {
    return {
        type: ADD_RESOURCE,
        response
    }
}

export const editresourcefor = (response) => {
    return {
        type: EDIT_RESOURCE,
        response
    }
}

export const deleteresourcefor = (response) => {
    return {
        type: DELETE_RESOURCE,
        response
    }
}

export const resourceErrorForm = () => {
    return {
        type: RESOURCE_ERROR
    }
}

export const addResourceForm = (resource) => {
    console.log('resource',resource);
    return (dispatch) => {
        HttpService.addresource(resource)
            .then(response => {
                console.log('response',response);
                dispatch(resourceForm(response.data));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(resourceErrorForm());
            })
    }
}

export const editResourceForm = (resource) => {
    console.log('resource',resource);
    return (dispatch) => {
        HttpService.editresource(resource)
            .then(response => {
                console.log('response',response);
                dispatch(editresourcefor(response.data));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(resourceErrorForm());
            })
    }
}

export const deleteResourceForm = (resource_id) => {
    console.log('resource',resource_id);
    return (dispatch) => {
        HttpService.deleteresource(resource_id)
            .then(response => {
                console.log('response',response);
                dispatch(deleteresourcefor(response.data));
                console.log(response.data);
            })
            .catch(error => {
                dispatch(resourceErrorForm());
            })
    }
}