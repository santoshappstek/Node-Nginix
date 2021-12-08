import {combineReducers} from 'redux';
import loginReducer from './login/loginReducer';
import addUserReducer from './newuser/addUserReducer';
import addDiscountReducer from './discounts/addDiscountReducer';
import activeUsersreducer from './activeusers/activeUsersreducer';
import inactiveUsersreducer from './inactiveusers/inactiveUsersreducer';
import bigsUsersReducer  from './bigsusers/bigsUsersreducer';
import agencyUsersreducer from './agencyusers/agencyUsersreducer';
import addNotificationreducer from './notifications/addNotificationReducer';
import allNotificationsreducer from './notifications/allNotificationsreducer';
import discountsListreducer from './discounts/discountsListreducer';
import myLittlereducer from './mylittle/myLittlereducer';
import userdetailsreducer from './userprofile/userdetailsreducer';
import userInformationReducer from './userprofile/userInformationReducer';
import getPermissionsreducer from './permissions/permissionsreducer';
import accountSettingsreducer from './accountsettings/accountsettingsreducer';
import photogalleryreducer from './photogallery/photogalleryreducer';
import userManagementReducer from './UserManagement/userMangementReducer';
import newUserManagementReducer from './UserManagement/newuserManagementReducer';
import getResourceslistreducer from './resources/resourcesListreducer';
import addResourceReducer from './resources/newResourcereducer';
import eventsListreducer from './events/eventsListReducer';
import addEventReducer from './events/addEventReducer';
import sendMessageReducer from './messages/sendMessageReducer';
import allMessagesReducer from './messages/allMessageReducer';
import notificationLogReducer from './notifications/notificationLogReducer';
import chaptersListReducer from './chapters/chaptersListReducer';
import addChapterReducer from './chapters/addChapterReducer'
import getViewSettingsreducer from './viewsettings/viewsettingsreducer'

export default combineReducers(
    {
        login: loginReducer,
        addUser: addUserReducer,
        adddiscount: addDiscountReducer,
        addNotification:addNotificationreducer,
        activeUsers: activeUsersreducer,
        inactiveUsers:inactiveUsersreducer,
        agencyUsers:agencyUsersreducer,
        bigsUsers:bigsUsersReducer,
        allNotificationsDetails:allNotificationsreducer,
        discountsList:discountsListreducer,
        myLittle:myLittlereducer,
        userInfo:userInformationReducer,
        userDetails:userdetailsreducer,
        permissionsList:getPermissionsreducer,
        accountSettings:accountSettingsreducer,
        photoGallery:photogalleryreducer,
        userManagementDetails: userManagementReducer,
        newUserManagementDetails: newUserManagementReducer,
        getResourceslist:getResourceslistreducer,
        addResource:addResourceReducer,
        eventsList:eventsListreducer,
        addEvent:addEventReducer,        
        sendMessage:sendMessageReducer,
        Messageslistdata:allMessagesReducer,
        NotificationLog:notificationLogReducer,
        chaptersList:chaptersListReducer,
        addchapter: addChapterReducer,
        getViewSettingsList :getViewSettingsreducer
    }
);