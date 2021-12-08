import { USER_DETAILS,USERINFO_ERROR,DELETE_USER,SEND_PASSWORDMAIL,PROFILEPIC_UPLOAD,ACTIVATE_USER } from "../types";
import HttpService from '../../Services/HttpService';

export const userdata = (response) => {
    return {
        type: USER_DETAILS,
        response
    }
}

export const userdelete = (response) =>{
    return {
        type: DELETE_USER,
        response
    }
}

export const useractivate = (response) =>{
    return {
        type: ACTIVATE_USER,
        response
    }
}

export const sendresetpassword = (response) =>{
    return {
        type: SEND_PASSWORDMAIL,
        response
    }
}

export const profilepicupload = (response) =>{
    return {
        type: PROFILEPIC_UPLOAD,
        response
    }
}

export const userInfoError = () => {
    return {
        type: USERINFO_ERROR
    }
}

export const userdetailsData = (user) => {
    return (dispatch) => {
        HttpService.userdetails(user)
            .then(response => {
                console.log('response',response.data);
                dispatch(userdata(response.data));
            })
            .catch(error => {
                dispatch(userInfoError());
            })
    }
}

export const ProfilePicUploadform = (photodata) => {
    console.log('action',photodata);
    return (dispatch) => {
        HttpService.profilepicUpload(photodata)
            .then(response => {
                console.log('response',response.data);
                dispatch(profilepicupload(response.data));
            })
            .catch(error => {
                dispatch(userInfoError());
            })
    }
}

export const userdeleteaction = (user) => {
    console.log('action',user);
    return (dispatch) => {
        HttpService.deleteuser(user)
            .then(response => {
                console.log('response',response.data);
                dispatch(userdelete(response.data));
            })
            .catch(error => {
                dispatch(userInfoError());
            })
    }
}

export const passwordResetMail = (email) => {
    console.log('action',email);
    return (dispatch) => {
        HttpService.sendpasswordresetmail(email)
            .then(response => {
                console.log('response',response.data);
                dispatch(sendresetpassword(response.data));
            })
            .catch(error => {
                dispatch(userInfoError());
            })
    }
}


export const useractivateaction = (user) => {
    console.log('action',user);
    return (dispatch) => {
        HttpService.activateuser(user)
            .then(response => {
                console.log('response',response.data);
                dispatch(useractivate(response.data));
            })
            .catch(error => {
                dispatch(userInfoError());
            })
    }
}

