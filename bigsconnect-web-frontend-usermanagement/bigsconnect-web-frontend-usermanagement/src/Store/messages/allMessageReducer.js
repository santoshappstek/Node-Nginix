import { RECIEVED_MESSAGES,RECIEVED_MESSAGE_ERROR,DELETE_MESSAGE,DELETE_MESSAGE_ERROR,TRASH_MESSAGE,TRASH_MESSAGE_ERROR,
         SENT_MESSAGES, SENT_MESSAGES_ERROR,DRAFT_MESSAGES, DRAFT_MESSAGE_ERROR,VIEW_MESSAGE, VIEW_MESSAGE_ERROR } from '../types'

const initialState = {
    allMessageList:[],
    deleteMessage:{},
    viewMessage:{}
}

export default function allMessagesReducer (state = initialState,action){
    switch(action.type){
        case RECIEVED_MESSAGES:
            return{
                ...state,
                allMessageList: action.response
            }

        case RECIEVED_MESSAGE_ERROR:
            return{
                ...state,
                error:true
            }
        case SENT_MESSAGES:
            return{
                ...state,
                allMessageList: action.response
            }

        case SENT_MESSAGES_ERROR:
            return{
                ...state,
                error:true
            }        

        case DELETE_MESSAGE:
            return{
                ...state,
                deleteMessage:action.response
            }
        case DELETE_MESSAGE_ERROR:
            return{
                ...state,
                error:true
            }
        case DRAFT_MESSAGES:
            return{
                ...state,
                allMessageList:action.response
            }
        case DRAFT_MESSAGE_ERROR:
            return{
                ...state,
                error:true
            }
        case TRASH_MESSAGE:
            return{
                ...state,
                allMessageList:action.response
            }
        case TRASH_MESSAGE_ERROR:
            return{
                ...state,
                error:true
            }
        case VIEW_MESSAGE:
            return{
                ...state,
                viewMessage: action.response
            }
               
        default:
            return state
    }

}