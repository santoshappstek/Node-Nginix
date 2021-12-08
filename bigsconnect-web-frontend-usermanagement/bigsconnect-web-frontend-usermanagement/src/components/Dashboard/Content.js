import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import history from '../../history';
import Home from '../Home/Home';
import UserManagement from '../User Managements/UserManagement';
import NewUserManagement from '../User Managements/NewUserManagment';
import UserInformation from '../UserInfo/UserInformation';
import UserData from '../UserInfo/UserData';
import AccountSettings from '../UserInfo/AccountSettings';
import MyLittle from '../UserInfo/MyLittle';
import Activity from '../Activities/Activity';
import Resources from '../Resources/Resources';
import Events from '../Events/Events';
import AddEvent from '../Events/AddEvent';
import DiscountsList from '../Discounts/DiscountsList';
import Newdiscount from '../Discounts/Newdiscount'; 
import NotificationsList from '../Notifications/NotificationsList';
import NewNotification from '../Notifications/Newnotification';
import UserPhotoGallery from '../UserInfo/UserPhotoGallery';
import Newresource from '../Resources/Newresource';
import NewMessage from '../Messages/NewMessage';
import MessagesList from '../Messages/MessagesList';
import Helpcenter from '../HelpCenter/Helpcenter';
import Settings from '../Settings/Settings';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import NewHomeContent from '../NewHome/NewHomeContent'
import NewDashBoard from './NewDashBoard';
import Dashboard from './Dashboard';
import AgecySponsored from '../Events/AgencySponsored';
import BigsCommunity from '../Events/BigsCommunity';
import AgencyTags from '../Events/AgencyTags';
import GettingStarted from '../HelpCenter/GettingStarted'

import ChaptersList from '../Chapters/ChaptersList';
import NewChapter from '../Chapters/NewChapter';
import AboutBigs from '../HelpCenter/AboutBigs';
import CmsHelpCenter from '../HelpCenter/CmsHelpCenter';

class Content extends Component {
    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <Switch history={history}>
                                <Route exact={true} path="/dashboard/" render={props => <Dashboard {...props} />} />
                                <Route exact={true} path="/dashboard/newdashboard" render={props => <NewDashBoard {...props} />} />
                                <Route exact={true} path="/dashboard/home" render={props => <NewHomeContent {...props} />} />
                                <Route exact={true} path="/dashboard/user_management" render={props => <UserManagement {...props} />} />
                                <Route exact={true} path="/dashboard/user_management/new_user_management" render={props => <NewUserManagement {...props} />} />
                                <Route exact={true} path="/dashboard/user_management/user_data" render={props => <UserData {...props} />} />
                                <Route exact={true} path="/dashboard/user_info" render={props => <UserInformation {...props} />} />
                                <Route exact={true} path="/dashboard/account_settings" render={props => <AccountSettings {...props} />} />
                                <Route exact={true} path="/dashboard/mylittle" render={props => <MyLittle {...props} />} />
                                <Route exact={true} path="/dashboard/activities" render={props => <Activity {...props} />} />
                                <Route exact={true} path="/dashboard/resources" render={props => <Resources {...props} />} />
                                <Route exact={true} path="/dashboard/resources/new_resource" render={props => <Newresource {...props} />} />
                                <Route exact={true} path="/dashboard/events" render={props => <Events {...props} />} />
                                <Route exact={true} path="/dashboard/events/add_event" render={props => <AddEvent {...props} />} />
                                <Route exact={true} path="/dashboard/discount_programs" render={props => <DiscountsList {...props} />} />
                                <Route exact={true} path="/dashboard/discount_programs/new_discount" render={props => <Newdiscount {...props} />} />
                                <Route exact={true} path="/dashboard/notifications" render={props => <NotificationsList {...props} />}/>
                                <Route exact={true} path="/dashboard/notifications/new_notification" render={props => <NewNotification {...props} />}/>
                                <Route exact={true} path="/dashboard/userphoto_gallery" render={props => <UserPhotoGallery {...props} />} />
                                <Route exact={true} path="/dashboard/new_message" render={props => <NewMessage {...props} />}/>
                                <Route exact={true} path="/dashboard/messages" render={props=> <MessagesList {...props} />}/>
                                <Route exact={true} path="/dashboard/photo_gallery" render={props => <PhotoGallery {...props} />} />
                                <Route exact={true} path="/dashboard/settings" render={props => <Settings {...props} />} />
                                <Route exact={true} path="/dashboard/help_center" render={props => <Helpcenter {...props} />} />
                                <Route exact={true} path="/dashboard/agencysponsored_events" render={props => <AgecySponsored {...props} />} />
                                <Route exact={true} path="/dashboard/bigsconnect_community" render={props => <BigsCommunity {...props} />} />
                                <Route exact={true} path="/dashboard/agencysponsored_tags" render={props => <AgencyTags {...props} />}/>
                                <Route exact={true} path ="/dashboard/help_center/getting_started" render={props => <GettingStarted {...this.props}/>} />
                                <Route exact={true} path ="/dashboard/help_center/aboutbigs" render={props => <AboutBigs {...props}/>} />
                                <Route exact={true} path ="/dashboard/Chapters/ChaptersList" render={props => <ChaptersList {...props}/>} />
                                <Route exact={true} path ="/dashboard/Chapters/NewChapter" render={props => <NewChapter {...props}/>} />
                                <Route exact={true} path ="/dashboard/cmshelpcenter" render={props => <CmsHelpCenter {...props}/>} />

                            </Switch>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Content;