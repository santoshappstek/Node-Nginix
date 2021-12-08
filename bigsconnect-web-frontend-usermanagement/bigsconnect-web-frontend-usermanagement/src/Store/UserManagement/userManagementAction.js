import { ACTIVE_USERS, AGENCY_USERS, BIGS_USERS, INACTIVE_USERS, USER_ERROR,ORGANISE_USER } from "../types";
import HttpService from '../../Services/HttpService';

export const publishActiveUser= (response) => {
    return {
        type: ACTIVE_USERS,
        response
    }
}
export const publishAgencyUser = (response) => {
    return {
        type: AGENCY_USERS,
        response
    }
}
export const publishBigsUser = (response) => {
    return {
        type: BIGS_USERS,
        response
    }
}

export const publishInactiveUser = (response) => {
    return {
        type: INACTIVE_USERS,
        response
    }
}

export const publishOrganiseUser = (response) => {
    return {
        type: ORGANISE_USER,
        response
    }
}


export const publishError = () => {
    return {
        type: USER_ERROR
    }
}

export const getActiveUsers = (chapter_id) => {
    return (dispatch) => {
        HttpService.activeusers(chapter_id)
            .then(response => {
                dispatch(publishActiveUser(response.data.active_users));
            })
            .catch(error => {
                dispatch(publishError());
            })
    }
}

export const getAgencyUsers = (chapter_id) => {
    return (dispatch) => {
        HttpService.agencyusers(chapter_id)
            .then(response => {
                console.log('agency user res:- ',response.data.agency_users)
                dispatch(publishAgencyUser(response.data.agency_users))
            })
            .catch(error => {
                dispatch(publishError());
            })
    }
} 

export const getBigsUsers = (chapter_id) => {
    return (dispatch) => {
        HttpService.bigsusers(chapter_id)
            .then((response) => {
                console.log('bigs user res:- ',response)
                dispatch(publishBigsUser(response.data.bigs_users))
            })
            .catch(error => {
                dispatch(publishError());
            })
    }
}

export const getInActiveUsers = (chapter_id) => {
    return (dispatch) => {
        HttpService.inactiveusers(chapter_id)
            .then(response => {
                console.log('inactiveusers user res:- ',response.data.active_users)
                dispatch(publishInactiveUser(response.data.active_users))
            })
            .catch(error => {
                dispatch(publishError());
            })
    }
}

export const getOrganiseUsers = () => {
    return (dispatch) => {
        HttpService.organiseusers()
            .then(response => {
                console.log('organise user res:- ',response.data.organization_users)
                dispatch(publishOrganiseUser(response.data.organization_users))
            })
            .catch(error => {
                dispatch(publishError());
            })
    }
}

