import { USER_FETCH_INPUT,USER_ADD,USER_ERROR} from "../types";
import store ,{dispatchAndLog} from "../store";
import HttpService from '../../Services/HttpService';

export const userFetchInput = (Input) => {
    return {
        type: USER_FETCH_INPUT,
        Input
    }
}

export const userBasicForm = (response) => {
    return {
        type: USER_ADD,
        response
    }
}

export const userErrorBasicForm = () => {
    return {
        type: USER_ERROR
    }
}

export const addUserForm = (user) => {
    console.log('user',user);
    return (dispatch) => {
        HttpService.adduser(user)
            .then(response => {
                console.log('response',response);
                dispatch(userBasicForm(response.data));
                //dispatchAndLog(store, userBasicForm(response.data))
            })
            .catch(error => {
                dispatch(userErrorBasicForm());
            })
    }
}