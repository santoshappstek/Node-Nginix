import { USERINFO_INPUT,USERINFO_ADD,USERINFO_ERROR} from "../types";
//import store ,{dispatchAndLog} from "../store";
import HttpService from '../../Services/HttpService';

export const userInfoInput = (Input) => {
    return {
        type: USERINFO_INPUT,
        Input
    }
}

export const userInfoForm = (response,info) => {
    return {
        type: USERINFO_ADD,
        response, info
    }
}

export const userInfoError = () => {
    return {
        type: USERINFO_ERROR
    }
}

export const userInformationForm = (info) => {
    console.log('info',info);
    return (dispatch) => {
        HttpService.userinfo(info)
            .then(response => {
                console.log('response',response.data);
                dispatch(userInfoForm(response.data,info));
            })
            .catch(error => {
                dispatch(userInfoError());
            })
    }
}