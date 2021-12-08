import axios from 'axios';
import config from "../config/config";

var currentuser = {}

if(JSON.parse(localStorage.getItem('userdata'))!=null){
    currentuser = JSON.parse(localStorage.getItem('userdata'))
}
const bearer = {
    
    token: currentuser.token
    
   
}

const login = (user) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.loginUrl,
            data: user
        })
    )
}

const adduser = (user) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.adduserUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: user
        })
    )
}

const deleteuser = (user) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.deleteuserUrl,            
            headers: { 'content-type': 'application/json'},
            data: user
        })
    )
}

const activateuser = (user) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.activateusersUrl,            
            headers: { 'content-type': 'application/json' },
            data: user
        })
    )
}

const adddiscount = (discount) => {    
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.adddiscountUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data: discount
        })
    )
}

const editdiscount = (discount) => {    
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.editdiscountUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: discount
        })
    )
}

const deletediscount = (discount_id) => {    
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.deletediscountUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: discount_id
        })
    )
}

const discountslist = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.discountslistUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data:chapter_id
        })
    )
}

const mylittle = (little) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.mylittleUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: little
        })
    )
}
const mylittleEdit = (little) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.editLittle,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: little
        })
    )
}

const userinfo = (info) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.userInformationUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: info
        })
    )
} 
const userdetails = (user) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.userdetailsUrl,
            headers: { 'content-type': 'application/json' },
            data: user
        })
    )
}

const sendpasswordresetmail = (email) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.forgotpasswordUrl,
            headers: { 'content-type': 'application/json' },
            data: email
        })
    )
}

const activeusers = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.activeusersUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer '+JSON.parse(localStorage.getItem('userdata')).token },
            data:chapter_id
        })
    )
}

const inactiveusers = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.inactiveusersUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer '+JSON.parse(localStorage.getItem('userdata')).token  },
            data:chapter_id
        })
    )
}

const organiseusers = () => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.organizationUsers,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer '+JSON.parse(localStorage.getItem('userdata')).token  },
           
        })
    )
}

const bigsusers = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.bigsusersUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer '+JSON.parse(localStorage.getItem('userdata')).token },
            data: chapter_id
        })
    )
}

const agencyusers = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.agencyusersUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer '+JSON.parse(localStorage.getItem('userdata')).token },
            data:chapter_id
          
        })
    )
}

const addnotification = (notification) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.addnotificationUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: notification
        })
    )
}

const editnotification = (notification) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.editnotificationUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data: notification
        })
    )
}

const deletenotification = (notify_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.deletenotificationUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: notify_id
        })
    )
}

const allnotifications = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.allnotificationsUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data:chapter_id
        })
    )
}

const sentnotifications = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.sentnotificationsUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data:chapter_id
        })
    )
}

const schedulednotifications = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.schedulednotificationsUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data:chapter_id
        })
    )
}

const permissions = () => {
    return(
        axios({
            method: config.apiMethods.getMethod,
            url: config.apiUrl.permissionUrl,            
            headers: { 'content-type': 'application/json' },
        })
    )
}

const accountsettings = (settings) =>{
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.accountsettingsUrl,
            headers: { 'content-type': 'application/json' },
            data: settings
        })
    )
}

const gallery = (user_id) =>{
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.photogalleryUrl,
            headers: { 'content-type': 'application/json' },
            data: user_id
        })
    )
}

const deletephoto = (photo_id) =>{
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.deletephotoUrl,
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: photo_id
        })
    )
}

const getresources = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.resourceslistUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:chapter_id
        })
    )
}

const addresource = (resource) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.addresourceUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: resource
        })
    )
}

const editresource = (resource) => {
    return(
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.editresourceUrl,            
            headers: { 'content-type': 'application/json' },
            data: resource
        })
    )
}

const deleteresource = (resource_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.deleteresourceUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token },
            data: resource_id
        })
    )
}

const eventtypes = () => {
    return(
        axios({
            method: config.apiMethods.getMethod,
            url: config.apiUrl.eventtypesUrl,            
            headers: { 'content-type': 'application/json' },            
        })
    )
}

const eventslist = (chapter_id) => {
    return(
        axios({
            method: config.apiMethods.putMethod,
            url: config.apiUrl.eventslistUrl,            
            headers: { 'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:chapter_id         
        })
    )
}

const bigseventslist = () => {
    return(
        axios({
            method: config.apiMethods.getMethod,
            url: config.apiUrl.bigseventslistUrl,            
            headers: { 'content-type': 'application/json' },            
        })
    )
}
const allEventsList = (data) =>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.allEventsList,
            headers:{'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data: data
        })
    )
}
const addevent = (eventdata) =>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.addeventUrl,
            headers:{'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data: eventdata
        })
    )
}

const editevent = (eventdata) =>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.editeventUrl,
            headers:{'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data: eventdata
        })
    )
}

const deleteevent = (event_id) =>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.inactivateeventUrl,
            headers:{'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data: event_id
        })
    )
}

const sendmessage = (sendmessagedata) =>{
    console.log('service',sendmessagedata);
    return(
        axios({
            method: config.apiMethods.postMethod,
            url:config.apiUrl.sendmessage,
            headers:{'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:sendmessagedata

        })
    )
}

const recievedmessages = () =>{
    return(
        axios({
            method: config.apiMethods.getMethod,
            url: config.apiUrl.recievedmessages,
            headers: {'content-type': 'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            //data: user_id
        })
    )
}

const deletemessage=(message_id)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.deletemessage,
            headers:{'content-type':'application/json'},
            data:message_id

        })
    )

}

const trashmessages =()=>{
    return(
        axios({
                method:config.apiMethods.getMethod,
                url:config.apiUrl.trashmessages,
                headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
             //   data:user_id
            })
    )
}

const sentmessages =()=>{
    return(
        axios({
                method:config.apiMethods.getMethod,
                url:config.apiUrl.sentmessages,
                headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
               // data:user_id
            })
    )
}

const draftsmessages =()=>{
    return(
        axios({
                method:config.apiMethods.getMethod,
                url:config.apiUrl.draftsmessages,
                headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
              //  data:user_id
            })
    )
}

const viewmessage =(message_id,)=>{
    return(
        axios({
                method:config.apiMethods.postMethod,
                url:config.apiUrl.viewmessage,
                headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
                data:message_id
            })
    )
}
const deleteDiscountdocument=(document_id)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.deleteDiscountdocument,
            headers:{'content-type':'application/json'},
            data:document_id

        })
    )
} 

const profilepicUpload=(photodata)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.profilepicUpload,
            headers:{'content-type':'application/json'},
            data:photodata
        })
    )
} 

const Allusersphotos=(user_id)=>{
    return(
        axios({
            method:config.apiMethods.putMethod,
            url:config.apiUrl.Allusersphotos,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:user_id
        })
    )
} 

const getusertypename = (usertype_id) => {
    return (
        axios({
            method: config.apiMethods.postMethod,
            url: config.apiUrl.getusertypename,
            headers: { 'content-type': 'application/json' },
            data: usertype_id
        })
    )
}

const photoDownload = (image_name) => {
    return (
        axios({
            url: config.apiUrl.photoDownload,
            method: 'POST',
            responseType: 'blob',
            data: image_name
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', image_name.image_name);
            document.body.appendChild(link);
            link.click();
        })
    )
}
const ToListUsersSearch=(name)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.toListUsers,
            headers:{'content-type':'application/json'},
            data:name
        })
    )
} 
const caseManager=()=>{
    return(
        axios({
            method:config.apiMethods.getMethod,
            url:config.apiUrl.caseManager,
            headers:{'content-type':'application/json'},
           
        })
    )
} 
const notificationLog=()=>{
    return(
        axios({
            method:config.apiMethods.getMethod,
            url:config.apiUrl.notificationLog,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
           // data:user_id
        })
    )
} 
const chapterslist=()=>{
    return(
        axios({
            method:config.apiMethods.getMethod,
            url:config.apiUrl.chaptersList,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
           
        })
    )
} 

const addChapterservice=(user_id)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.addChapter,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:user_id
        })
    )
} 
const createHelpCenter=(info)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.createhelp,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:info
        })
    )
} 

const helplistservice=()=>{
    return(
        axios({
            method:config.apiMethods.getMethod,
            url:config.apiUrl.helpList,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
           
        })
    )
}
const myChaptersService=()=>{
    console.log('inner method:- ',JSON.parse(localStorage.getItem('userdata')).token)
    return(
        axios({
            method:config.apiMethods.getMethod,
            url:config.apiUrl.myChapters,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},

            //   headers:{'content-type':'application/json','Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYmZhM2ZkZDk2MmUwZTNjZmM2YjljYTlhZjA3NDgwY2NhNmJjMTI4YzFkYmM1Zjc1ODcyZmRkNmJlYjg5ZjQwOWY4YWE5ZDUzMTMxZWMxMGEiLCJpYXQiOjE2Mjc4OTI3MDQsIm5iZiI6MTYyNzg5MjcwNCwiZXhwIjoxNjU5NDI4NzA0LCJzdWIiOiI3ODMiLCJzY29wZXMiOltdfQ.N0IIyVK2tlUK_QURikMbGUsGmHztKmJ-XSIRyboWWE3GcyzCszQAk2nOsQu3FmS4lc4ktDSEnzVcNSu4TfYDMpq4ef2hd9aA5-guo0ZL8m_uWGGqdI7sm3Gk1dA0KED7El1hOrIso9uVMjxF7yIupqlbN_TmxSSxPzRTh6J-fbiEIbdKx9-0yBDhDjolhM3YijhHvjtjaDt8q_bf18MfcQufbAaE0qeGHPSxZ-c1TcLmAajO7p3PZu4KfMqZCF9F5KM7MQQNn6jhEBHc-73tjC6YuQ8iC3v_Og_dIHDMqjO1Uno9iEJ4RtOJsV0RhAoK4S2tyRkRaMDthtZWffof_igPvQNCi4UlF5kDV97jEMo8D-Ym-f1zMg7zx4F4ciLYo9_xWnIGrc7ovmXUlNwjtUvuHkZZlADvP9d75Uc3nmJZNT8D3V0SS0cUAWuXFi_Qpom2ivOEfzGiO72POen5T35C0j4EKLp5MLgmqt4EQDz9y0sHT3ELR9hNZM5nnQl0wayWmDslZ2_9u98yqZBtfVvPxGYYR5LcOFZBZtLpZovZL-_Q8wFAjF3rVwOLeK-yqFgGGt0dB-oYc8zdUzwTMdUue3nALW__e70r3GQntsUX9LbqYVGJ8DH00UUiXhvlxw1CzWWCVMRSMKJbl1aRTLHNH4u9fsFahnPlVgbslwc'},
           // data:token
           
        })
    )
} 

const logout=()=>{
    return(
        axios({
            method:config.apiMethods.getMethod,
            url:config.apiUrl.logout,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
        })
    )
} 

const sidebarmenu=()=>{
    return(
        axios({
            method:config.apiMethods.getMethod,
            url:config.apiUrl.viewSettings,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
           
        })
    )
}

const deleteChapter=(chapter_id)=>{
    return(
        axios({
            method:config.apiMethods.putMethod,
            url:config.apiUrl.deleteChapter,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:chapter_id
        })
    )
}

const editChapter=(chapter_id)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.editChapter,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:chapter_id
        })
    )
}
const viewNotificationservice=(note_id)=>{
    return(
        axios({
            method:config.apiMethods.postMethod,
            url:config.apiUrl.viewNotificationLog,
            headers:{'content-type':'application/json','Authorization':'Bearer ' +JSON.parse(localStorage.getItem('userdata')).token},
            data:note_id
        })
    )
} 
export default {
    login,
    adduser,
    adddiscount,
    editdiscount,
    deletediscount,
    activeusers,
    inactiveusers,
    bigsusers,
    agencyusers,
    sendpasswordresetmail,
    addnotification,
    editnotification,
    deletenotification,
    allnotifications,
    sentnotifications,
    schedulednotifications,
    discountslist,
    mylittle,
    mylittleEdit,
    userinfo,
    userdetails,
    permissions,
    accountsettings,
    gallery,
    deletephoto,
    deleteuser,
    activateuser,
    getresources,
    addresource,
    editresource,
    deleteresource,
    eventtypes,
    eventslist,
    bigseventslist,
    addevent,
    editevent,
    deleteevent,
    sendmessage,
    recievedmessages,
    deletemessage,
    trashmessages,
    sentmessages,
    draftsmessages,
    viewmessage,
    deleteDiscountdocument,
    profilepicUpload,
    Allusersphotos,
    getusertypename,
    photoDownload,
    ToListUsersSearch,
    caseManager,
    notificationLog,
    allEventsList,
    chapterslist,
    addChapterservice,
    myChaptersService,
    logout,
    sidebarmenu,
    organiseusers,
    deleteChapter,
    editChapter,
    viewNotificationservice,
    createHelpCenter,
    helplistservice
}