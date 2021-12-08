import { PHOTO_GALLERY, DELETE_PHOTO, GALLERY_ERROR, IMAGEDOWNLOAD } from '../types';
import HttpService from '../../Services/HttpService';

export const galleryres = (response) => {
    return {
        type: PHOTO_GALLERY,
        response
    }
}

export const deletephotofor = (response) => {
    return {
        type: DELETE_PHOTO,
        response
    }
}

export const galleryerror = () => {
    return {
        type: GALLERY_ERROR
    }
}

export const imageDownload = () => {
    return {
        type: IMAGEDOWNLOAD
    }
}


export const photogalleryData = (user_id) => {
    console.log('settings',user_id);
    return (dispatch) => {
        HttpService.gallery(user_id)
        .then(response => {
            console.log('response',response);
            dispatch(galleryres(response.data));
        })
    }
}

export const Allusersphotos = (user_id) => {
    console.log('Allusersphotos ',user_id);
    return (dispatch) => {
        HttpService.Allusersphotos(user_id)
        .then(response => {
            console.log('Allusersphotos response',response);
            dispatch(galleryres(response.data));
        })
    }
}

export const deletePhotoForm = (photo_id) => {
    console.log('photo_id',photo_id);
    return (dispatch) => {
        HttpService.deletephoto(photo_id)
            .then(response => {
                console.log('response',response);
                dispatch(deletephotofor(response.data));
            })
    }
}

export const downloadImage = (image_name) => {
    return (dispatch) => {
        HttpService.photoDownload(image_name)
            .then(response => {
                dispatch(imageDownload('image downloaded'));
            })
    }
}
    

