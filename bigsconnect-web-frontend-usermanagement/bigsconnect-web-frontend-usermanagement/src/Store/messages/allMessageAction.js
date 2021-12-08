import HttpService from '../../Services/HttpService'
import { RECIEVED_MESSAGES, RECIEVED_MESSAGE_ERROR,DELETE_MESSAGE, DELETE_MESSAGE_ERROR,TRASH_MESSAGE, TRASH_MESSAGE_ERROR,
         SENT_MESSAGES, SENT_MESSAGES_ERROR,DRAFT_MESSAGES, DRAFT_MESSAGE_ERROR,VIEW_MESSAGE, VIEW_MESSAGE_ERROR } from '../types'

export const recievedMessages = (response) => {
    return {
        type: RECIEVED_MESSAGES,
        response
    }
}

export const recievedMessageError = () => {
    return {
        type: RECIEVED_MESSAGE_ERROR
    }
}

export const sentmessagesResponse = (response) => {
    return {
        type: SENT_MESSAGES,
        response
    }
}

export const sentMessagesError = () => {
    return {
        type: SENT_MESSAGES_ERROR
    }
}

export const draftmessagesResponse = (response) => {
    return {
        type: DRAFT_MESSAGES,
        response
    }
}

export const draftMessagesError = () => {
    return {
        type: DRAFT_MESSAGE_ERROR
    }
}

export const deleteMessageResponse = (response) => {
    return {
        type: DELETE_MESSAGE,
        response
    }
}

export const deleteMessageError = () => {
    return {
        type: DELETE_MESSAGE_ERROR
    }
}

export const trashMessagesResponse = (response) => {
    return {
        type: TRASH_MESSAGE,
        response
    }
}

export const trashmessageError = () => {
    return {
        type: TRASH_MESSAGE_ERROR
    }
}

export const viewMessageResponse = (response) => {
    return {
        type: VIEW_MESSAGE,
        response
    }
}

export const viewMessageError = () => {
    return {
        type: VIEW_MESSAGE_ERROR
    }
}

export const RecievedMessages = () => {
    return (dispatch) => {
        HttpService.recievedmessages()
            .then(response => {
                console.log('recieved',response.data.list);
                dispatch(recievedMessages(response.data.list))
            })
    }
}

export const sentMessages = () => {
    return (dispatch) => {
        HttpService.sentmessages()
            .then(response => {
                console.log('sent',response.data.list);
                dispatch(sentmessagesResponse(response.data.list))
            })
    }
}
export const draftMessages = () => {
    return (dispatch) => {
        HttpService.draftsmessages()
            .then(response => {
                console.log('draft',response.data.list);
                dispatch(draftmessagesResponse(response.data.list))
            })
    }
}

export const trashMessages = () => {
    return (dispatch) => {
        HttpService.trashmessages()
            .then(response => {
                console.log('trash',response.data.list);
                dispatch(trashMessagesResponse(response.data.list))
            })
    }
}

export const deleteMessageService = (message_id) => {
    return (dispatch) => {
        HttpService.deletemessage(message_id)
            .then(response => {
                console.log('deleted',response.data);
                dispatch(deleteMessageResponse(response.data))
            })
    }
}

export const viewMessagedata = (message_id) => {
    console.log('view message body',message_id);
    return (dispatch) => {
        HttpService.viewmessage(message_id)
            .then(response => {
                console.log('viewMessageResponse',response.data.message);
                dispatch(viewMessageResponse(response.data.message))
            })
    }
}
