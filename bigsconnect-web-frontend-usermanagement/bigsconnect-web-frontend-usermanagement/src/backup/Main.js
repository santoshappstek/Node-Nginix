import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import ActiveUsers from '../src/components/UserInfo/ActiveUsers';
//import InactiveUsers from '../src/components/UserInfo/InactiveUsers';
//import BigsUsers from '../src/components/UserInfo/BigsUsers';
//import AgencyUsers from '../src/components/UserInfo/AgencyUsers';
import MyLittle from '../src/components/UserInfo/MyLittle';
import PhotoGallery from '../src/components/UserInfo/PhotoGallery';
import UserInformation from '../src/components/UserInfo/UserInformation';
import AccountSettings  from '../src/components/UserInfo/AccountSettings';



const Main = () => (
  <div>
    <Switch>
      {/* <Route path='/ActiveUsers' component={ActiveUsers} />
      <Route path='/InactiveUsers' component={InactiveUsers} />
      <Route path='/AgencyUsers' component={AgencyUsers} /> 
       <Route path='/BigSUsers' component={BigsUsers} />        */}
        
       <Route path="/User Information" component={UserInformation } />
       <Route path='/Account Settings' component={AccountSettings} />
       <Route path='/photo Gallery' component={PhotoGallery} />
       <Route path='/My Little' component={MyLittle} />
       
    </Switch>
  </div>
)

export default Main;