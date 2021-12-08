import React,{ Component } from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { userdetailsData,userdeleteaction,passwordResetMail,ProfilePicUploadform } from  '../../Store/userprofile/userdetailsaction';
import UserInformation from './UserInformation';
import AccountSettings from './AccountSettings';
import UserPhotoGallery from './UserPhotoGallery';
import AccountView from './AccountView';
import MyLittle from './MyLittle';
import EventHistory from './EventHistory';
import swal from 'sweetalert';

 class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user_id: '',
        userdetails:'',
        picture: null,
        imagePreviewUrl:'',
        activeScreen:'UserInformation',
        userInfo:{},
        mylittleData:{}
    };
    var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  } 
  componentDidMount(){

    var user_id = this.props.location.state.detail.user_id;
       this.setState({user_id: user_id});
       this.props.userdetailsData({user_id});
       
    // if(this.props.location.state!=null){
    //   console.log('user details',this.props.location.state.detail);
    //   var user_id = this.props.location.state.detail.user_id;
    //   this.setState({user_id: user_id});
    //   let userdata = this.props.userdetailsData({user_id});
    //   this.state.userdetails=userdata
    // }
    
  } 
   activeSettings(event, key){
     if (key == 'UserInformation'){
        this.setState({
          activeScreen: 'UserInformation',          
        })
      } else if(key == 'AccountSettings'){
            this.setState({
              activeScreen: 'AccountSettings'
            })
    }else if (key == 'PhotoGallery') {
      this.setState({
        activeScreen: 'PhotoGallery'
      })
    } 
    else if (key == 'MyLittle') {
      this.setState({
        activeScreen: 'MyLittle'
      })
    } 
    else if (key == 'eventHistory') {
      this.setState({
        activeScreen: 'eventHistory'
      })
    } 
  }

  onDeleteuser(user_id)
  {   
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user details.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
  if (willDelete) {
    var user = {
      user_id: user_id,      
      action_type: "deleteuser" 
      };
    this.props.userdeleteaction(user);
    swal({
      title: "User Deleted Successfully",
      icon: "success"               
    })
          this.setState({
            spinner: false
          });              
        } 
      });
  }

  onDeactivateuser(user_id)
  {
    swal({
      title: "Are you sure?",
      text: "Once deactivated, you will not be able to recover this user details.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
  if (willDelete) {
    var user = {
      user_id: user_id,      
      action_type: "deactivateuser" 
      };
    this.props.userdeleteaction(user);
    swal({
      title: "User Deactivated Successfully",
      icon: "success"               
    })
          this.setState({
            spinner: false
          });              
        } 
      });
  }

  sendPassword(email)
  {
    swal({
      title: "Are you sure?",
      text: "You want to reset password.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
  if (willDelete) {
    var email = {
      email: email,
      };
    this.props.passwordResetMail(email);
    swal({
      title: "Password Reset link sent to your mail Successfully",
      icon: "success"               
    })
          this.setState({
            spinner: false
          });              
        } 
      });   
  }
  onUserManagement() {
    this.props.history.push('/dashboard/user_management');
  }
    componentWillReceiveProps(nextProps){
     // this.setState({ userdetails: nextProps.userDetails.userdetails_res.user_details});
      this.state.userdetails = nextProps.userDetails.userdetails_res.user_details
      
      this.state.mylittleData = nextProps.userDetails.userdetails_res.mylittle
      console.log('user data next props:- ',nextProps.userDetails.userdetails_res.user_details)
      console.log('user data userdetails:- ',this.state.userdetails)
      // this.setState({
      //   userInfo : nextProps.userDetails.userdetails_res.user_details
      // })
      this.state.userInfo = nextProps.userDetails.userdetails_res.user_details
    }

     render(){
     //  this.state.userInfo = this.state.userdetails
      //  if(this.props.location.state!=null){
      //   this.state.userInfo = this.props.location.state.detail


      //  }
         return(    
              <div className="container">
                <div className="row mt-3 mb-4">
          <div className="col-md-6">
            <div className="horizontal-container">
              <label className="label-discount" onClick={() => this.onUserManagement()}>User Management</label>             
            </div>
          </div>
        </div>
                <div style={{width:'110%',marginRight:'50px'}} className="row pt-5">
                             
               <AccountView user_id={this.state.user_id} userDetails={this.state.userdetails} />
                <div  className="col-md-8 col-lg-8">
                      <section style={{width:'100%'}}className="holltab-sec">
                    <div  className="userManagement-page">
                        <div className="tabs-sec">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                              <a class="nav-link active" data-toggle="tab" onClick={(event) => { this.activeSettings(event, 'UserInformation') }} id="defaultOpen" href="#">User Information</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" onClick={(event) => { this.activeSettings(event, 'AccountSettings') }} href="#">Account Settings</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" onClick={(event) => { this.activeSettings(event, 'PhotoGallery') }} href="#">Photo Gallery</a>
                            </li>
                            
                               {this.state.userdetails.usertype_id==2 || this.state.userdetails.usertype_id==3?
                               <li class="nav-item">
                               <a class="nav-link" data-toggle="tab" onClick={(event) => { this.activeSettings(event, 'MyLittle') }} href="#">My Little</a>
                             </li>:null
                                 }
                                                      
                            <li class="nav-item">
                              <a class="nav-link" data-toggle="tab" onClick={(event) => { this.activeSettings(event, 'eventHistory') }} href="#">Activity & Event History</a>
                            </li>                            
                          </ul>
                        </div>
                      </div>
                        {
                          this.state.activeScreen == 'UserInformation'?
                          <UserInformation userdata= {this.state.userInfo} />
                          : this.state.activeScreen == 'AccountSettings' ?
                          <AccountSettings userId = {this.state.user_id}/>
                          : this.state.activeScreen == 'PhotoGallery' ?
                          <UserPhotoGallery userId = {this.state.user_id}/>
                          : this.state.activeScreen == 'MyLittle' ?
                          <MyLittle userId = {this.state.user_id} littleData = {this.state.mylittleData} />
                          :this.state.activeScreen == 'eventHistory' ?
                          <EventHistory userId = {this.state.user_id} />               
                          :null
                        }
                      </section>
                </div>                                              
                </div>
              </div>
         );                                                                                                                   
     }
 }
 
 export const mapStateToProps  = (state) => ({
  userDetails: state.userDetails
  });

export default connect(mapStateToProps,{ userdetailsData,userdeleteaction,passwordResetMail,ProfilePicUploadform })(UserData)