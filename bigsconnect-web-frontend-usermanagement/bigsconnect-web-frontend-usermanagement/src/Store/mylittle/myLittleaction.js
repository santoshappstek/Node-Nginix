import { LITTLE_FETCH_INPUT,LITTLE_ADD,LITTLE_ERROR} from "../types";
//import store ,{dispatchAndLog} from "../store";
import HttpService from '../../Services/HttpService';

export const littleFetchInput = (Input) => {
    return {
        type: LITTLE_FETCH_INPUT,
        Input
    }
}

export const littleForm = (response) => {
    return {
        type: LITTLE_ADD,
        response
    }
}

export const littleErrorForm = () => {
    return {
        type: LITTLE_ERROR
    }
}

export const addLittleForm = (little) => {
    console.log('little',little);
    return (dispatch) => {
        HttpService.mylittle(little)
            .then(response => {
                console.log('response',response);
                dispatch(littleForm(response.data));
            })
            .catch(error => {
                dispatch(littleErrorForm());
            })
    }
}