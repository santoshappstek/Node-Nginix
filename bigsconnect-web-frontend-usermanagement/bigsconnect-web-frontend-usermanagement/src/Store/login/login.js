import { FETCH_LOGIN_INPUT, LOGIN_CHECK, LOGIN_ERROR} from "../types";
import store from "../store.js";
import HttpService from '../../Services/HttpService';

export const fetchLoginInput =(Input) =>{
    return {
        type: FETCH_LOGIN_INPUT,
        Input
    }
}

export const publishLoginCheck = (response) => {
    return {
        type: LOGIN_CHECK,
        response
    }
}

export const publishLoginError = () => {
    return {
        type: LOGIN_ERROR
    }
}

export const loginUser= (user) =>{
    return (dispatch) =>{
        HttpService.login(user)
        .then(response =>{            
            console.log('res',response);
            
            localStorage.setItem("userdata", JSON.stringify(response.data.user));
            localStorage.setItem("chapter_id", JSON.stringify(response.data.user.chapter_id));
            console.log('token:- ',JSON.parse(localStorage.getItem('chapter_id')))
        
            // localStorage.setItem("token", JSON.stringify(response.data.user));
             dispatch(publishLoginCheck(response.data.success));
        })
        .catch(error =>{
             dispatch(publishLoginError());
            //console.log(error.message);
        })
    }
}