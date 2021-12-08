import { SETTINGS_INPUT, SETTINGS, SETTINGS_ERROR, USER_TYPE } from "../types";

let initialState = {
    settingsin: {},   
    settings_res: '',
    userTypeName:{},
    error: false,
}

export default function accountSettingsreducer(state = initialState, action) {
    switch (action.type) {
        case SETTINGS_INPUT:
            return {
                ...state,
                settingsin: {
                    ...state.settingsin,
                    [action.Input.key]: action.Input.value
                }
            }
        case SETTINGS:
            return {
                ...state,
                settings_res: action.response
            }
        case USER_TYPE:
            return {
                ...state,
                userTypeName: action.response
            }
        case SETTINGS_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}