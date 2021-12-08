import { RESOURCES_LIST } from '../types';
import HttpService from '../../Services/HttpService';

 export const resourcesData = (response) =>{
    return {
        type: RESOURCES_LIST,
        response: response
    }
}


 export const getResourcesListdata = (chapter_id) => {
    return (dispatch) => {
        HttpService.getresources(chapter_id)
        .then(response => {
            console.log("resources data :- ",response)
            dispatch(resourcesData(response.data));
        })
    }
}

    

