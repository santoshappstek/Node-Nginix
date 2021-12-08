import { USER_FETCH_INPUT, USER_ADD, GET_PERMISSIONS, USER_ERROR,CASE_MANAGER,CASE_MANAGER_ERROR } from "../types";
import HttpService from '../../Services/HttpService';


export const userManagementFetchInput = (Input) => {
    return {
        type: USER_FETCH_INPUT,
        Input
    }
}
export const publishPermissionsData = (response) => {
    return {
        type: GET_PERMISSIONS,
        response
    }
}
export const publishAddUser = (response) => {
    return {
        type: USER_ADD,
        response
    }
}



// export const publishInactiveUser = (response) => {
//     return {
//         type: INACTIVE_USERS,
//         response
//     }
// }

export const publishError = () => {
    return {
        type: USER_ERROR
    }
}

export const casemanagerData=(response)=>{
    return{
        type:CASE_MANAGER,
        response
    }

}

export const caseManagerErrorData = () =>{
    return{
        type:CASE_MANAGER_ERROR
    }
}
export const getPermissions = () => {
    return (dispatch) => {
        HttpService.permissions()
            .then(response => {
                console.log('response',response);
                dispatch(publishPermissionsData(response.data.permissions));
            })
            .catch(error => {
                dispatch(publishError());
            })
    }
}

export const getCasemanagers = () => {
    return (dispatch) => {
        HttpService.caseManager()
            .then(response => {
                console.log('case manager response:- ',response);
                dispatch(casemanagerData(response));
            })
            .catch(error => {
                dispatch(caseManagerErrorData());
            })
    }
}

export const addUserForm = (user) => {
    console.log('adding user body',user);
    return (dispatch) => {
        HttpService.adduser(user)
            .then(response => {
                console.log('response',response);
                dispatch(publishAddUser(response.data));
            })
            .catch(error => {
                dispatch(publishError());
            })
    }
}

// export const getActiveUsers = () => {
//     return (dispatch) => {
//         HttpService.activeusers()
//             .then(response => {
//                 dispatch(publishActiveUser(response.data.active_users));
//             })
//             .catch(error => {
//                 dispatch(publishError());
//             })
//     }
// }

// export const getAgencyUsers = () => {
//     return (dispatch) => {
//         HttpService.agencyusers()
//             .then(response => {
//                 dispatch(publishAgencyUser(response.data.agency_users))
//             })
//             .catch(error => {
//                 dispatch(publishError());
//             })
//     }
// }

// export const getBigsUsers = () => {
//     return (dispatch) => {
//         HttpService.bigsusers()
//             .then((response) => {
//                 dispatch(publishBigsUser(response.data.bigs_users))
//             })
//             .catch(error => {
//                 dispatch(publishError());
//             })
//     }
// }

// export const getInActiveUsers = () => {
//     return (dispatch) => {
//         HttpService.inactiveusers()
//             .then(response => {
//                 dispatch(publishInactiveUser(response.data.inactive_users))
//             })
//             .catch(error => {
//                 dispatch(publishError());
//             })
//     }
// }

