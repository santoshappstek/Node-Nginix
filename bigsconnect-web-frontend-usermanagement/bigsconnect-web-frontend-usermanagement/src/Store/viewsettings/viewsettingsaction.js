import { VIEWSETTINGS_LIST } from '../types';
import HttpService from '../../Services/HttpService';

 export const viewSettingsData = (response) =>{
    return {
        type: VIEWSETTINGS_LIST,
        response: response
    }
}


 export const getViewSettingsListdata = () => {
    return (dispatch) => {
        HttpService.sidebarmenu()
        .then(response => {
            console.log("side bar resources data :- ",response)
            dispatch(viewSettingsData(response.data));
        })
    }
}

    