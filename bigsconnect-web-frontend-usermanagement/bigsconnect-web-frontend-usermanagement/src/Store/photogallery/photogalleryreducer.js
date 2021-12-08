import { PHOTO_GALLERY, DELETE_PHOTO, GALLERY_ERROR, IMAGEDOWNLOAD } from "../types";

let initialState = {   
    gallery_res: '',
    deletephoto_res:'',
    image_download:'',
    error: false,
}

export default function photogalleryreducer(state = initialState, action){

    switch(action.type){
        case PHOTO_GALLERY:
            return {
                ...state,
                gallery_res: action.response
            }
        case DELETE_PHOTO:
            return {
                ...state,
                deletephoto_res: action.response
            }
        case IMAGEDOWNLOAD:
            return {
                ...state,
                image_download: action.response
            }
        case GALLERY_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }

}