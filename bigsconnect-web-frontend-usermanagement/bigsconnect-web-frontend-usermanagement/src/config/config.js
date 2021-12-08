//const baseURL = 'http://54.187.114.170:81';
 //const baseURL = 'http://localhost:70';
 const baseURL = 'https://bigsconnect.com/api';
 
const apiUrl = {
    loginUrl: `${baseURL}/api/login`,
    usertypeUrl:`${baseURL}/api/userType`,
    userpermissionsUrl:`${baseURL}/api/userPermissions`,
    adduserUrl:`${baseURL}/api/addUser`,
    deleteuserUrl:`${baseURL}/api/deleteUser`,
    activeusersUrl:`${baseURL}/api/activeUsers`,
    inactiveusersUrl:`${baseURL}/api/inactiveUsers`,
    bigsusersUrl:`${baseURL}/api/bigsUsers`,
    agencyusersUrl:`${baseURL}/api/agencyUsers`,
    updateuserUrl:`${baseURL}/api/updateUser`,
    forgotpasswordUrl:`${baseURL}/api/forgotPassword`,
    activateusersUrl:`${baseURL}/api/activateUser`,
    adddiscountUrl:`${baseURL}/api/addDiscount`,
    editdiscountUrl:`${baseURL}/api/editDiscount`,
    deletediscountUrl:`${baseURL}/api/inactivateDiscount`,    
    addnotificationUrl:`${baseURL}/api/addNotification`,
    editnotificationUrl:`${baseURL}/api/editNotification`,
    deletenotificationUrl:`${baseURL}/api/deleteNotification`,
    allnotificationsUrl:`${baseURL}/api/allNotifications`,
    sentnotificationsUrl:`${baseURL}/api/sentNotifications`,
    schedulednotificationsUrl:`${baseURL}/api/scheduledNotifications`,
    discountslistUrl:`${baseURL}/api/discountsList`,
    mylittleUrl:`${baseURL}/api/myLittle`,
    userInformationUrl:`${baseURL}/api/userInformation`,
    permissionUrl:`${baseURL}/api/permissions`,
    accountsettingsUrl:`${baseURL}/api/accountSettings`,
    userdetailsUrl:`${baseURL}/api/userDetails`,
    photogalleryUrl:`${baseURL}/api/photoGallery`,
    deletephotoUrl:`${baseURL}/api/deletePhoto`,
    resourceslistUrl:`${baseURL}/api/resources`,
    addresourceUrl:`${baseURL}/api/addResource`,
    editresourceUrl:`${baseURL}/api/editResource`,
    deleteresourceUrl:`${baseURL}/api/inactivateResource`,
    eventtypesUrl:`${baseURL}/api/eventTypes`,
    eventslistUrl:`${baseURL}/api/eventsList`,
    bigseventslistUrl:`${baseURL}/api/bigseventsList`,
    addeventUrl: `${baseURL}/api/addEvent`,
    editeventUrl: `${baseURL}/api/editEvent`,
    inactivateeventUrl: `${baseURL}/api/inactivateEvent`,
    vieweventUrl: `${baseURL}/api/viewEvent`,
    sendmessage: `${baseURL}/api/sendMessage`,
    recievedmessages: `${baseURL}/api/recievedMessages`,
    deletemessage: `${baseURL}/api/deleteMessage`,
    trashmessages: `${baseURL}/api/deletedMessagesList`,
    sentmessages: `${baseURL}/api/sentMessages`,
    draftsmessages: `${baseURL}/api/draftsMessages`,
    viewmessage: `${baseURL}/api/viewMessage`,
    deleteDiscountdocument:`${baseURL}/api/deleteDiscountdocument`,
    profilepicUpload:`${baseURL}/api/profilepicUpload`,
    Allusersphotos:`${baseURL}/api/Allusersphotos`,
    getusertypename: `${baseURL}/api/getusertypename`,
    photoDownload: `${baseURL}/api/photoDownload`,
    toListUsers:  `${baseURL}/api/toListUsers`,
    caseManager: `${baseURL}/api/caseManagers`,
    notificationLog: `${baseURL}/api/notification_log`,
    allEventsList: `${baseURL}/api/allEventsList`,
    chaptersList:  `${baseURL}/api/chaptersList`,
    addChapter : `${baseURL}/api/addChapter`,
    myChapters:  `${baseURL}/api/myChapters`,
    logout: `${baseURL}/api/logout`,
    viewSettings:`${baseURL}/api/viewSettings`,
    organizationUsers: `${baseURL}/api/organizationUsers`,
    deleteChapter :  `${baseURL}/api/deleteChapter`,
    editChapter:`${baseURL}/api/editChapter`,
    editLittle: `${baseURL}/api/editLittle`,
    viewNotificationLog:`${baseURL}/api/viewNotificationLog`,
    createhelp: `${baseURL}/api/createhelp`,
    helpList:`${baseURL}/api/helpList`
}
const apiMethods = {
    postMethod: 'POST',
    getMethod: 'GET',
    putMethod:'PUT'
}


export const environment = "Dev";

export default {
    apiUrl,
    apiMethods
}