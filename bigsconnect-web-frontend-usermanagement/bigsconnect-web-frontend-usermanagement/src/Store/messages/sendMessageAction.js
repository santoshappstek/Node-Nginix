import {SEND_MESSAGE_INPUT,SEND_MESSAGE,SEND_MESSAGE_ERROR} from '../types'
import HttpService from '../../Services/HttpService'

export const SendMessageInput = (Input) => {
return {
    type: SEND_MESSAGE_INPUT,
    Input
}
}

export const SendMessageTo = (response)=>{
    return {
        type: SEND_MESSAGE,
        response
    }
}
export const SendError = ()=>{
    return {
        type: SEND_MESSAGE_ERROR
    }
}

export const sendMessageForm=(sendmessagedata)=>{
    return (dispatch)=>{
        console.log('input',sendmessagedata);
        HttpService.sendmessage(sendmessagedata)
        .then(response=>{
            console.log('response',response);
           dispatch(SendMessageTo(response))
        })
        .catch(error=>{
            dispatch(SendError)
        })
    }
}
export const ToUsersListData=(name)=>{
    return (dispatch)=>{
        console.log('To User input',name);
        HttpService.ToListUsersSearch(name)
        .then(response=>{
            console.log('To user response',response);
          // dispatch(SendMessageTo(response))
        })
        .catch(error=>{
            dispatch(SendError)
        })
    }
}
