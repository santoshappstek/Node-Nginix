import { SEND_MESSAGE_INPUT,SEND_MESSAGE,SEND_MESSAGE_ERROR  } from "../types";

let initialState = {
    sendMessageDetails: {},   
    sendMessage_res: '',
    error: false,
}

export default function sendMessageReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE_INPUT:
            return {
                ...state,
                sendMessageDetails: {
                    ...state.sendMessageDetails,
                    [action.Input.key]: action.Input.value
                }
            }
        case SEND_MESSAGE:
            return {
                ...state,
                sendMessage_res: action.response
            }
      
        case SEND_MESSAGE_ERROR:
            return {
                ...state,
                error: true
            }
            
        default:
            return state
    }
}