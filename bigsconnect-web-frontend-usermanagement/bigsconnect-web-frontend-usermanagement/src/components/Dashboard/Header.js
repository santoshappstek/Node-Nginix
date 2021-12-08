import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationLogList, myChapterList } from '../../Store/notifications/notificationLogaction';
import { withRouter } from 'react-router-dom';
import ViewMessage from '../Messages/ViewMessage';
import MessagesList from '../Messages/MessagesList';
import Timeago from 'react-timeago'
import HttpService from '../../Services/HttpService'
import swal from 'sweetalert';
import { Button, Spinner } from 'react-bootstrap';
import { photogalleryData, downloadImage, deletePhotoForm, Allusersphotos } from '../../Store/photogallery/photogalleryaction';
import { getResourcesListdata } from '../../Store/resources/resourcesListaction';
import { getDiscounts } from '../../Store/discounts/discountsListaction';
import { getActiveUsers, getAgencyUsers, getBigsUsers, getInActiveUsers } from '../../Store/UserManagement/userManagementAction';
import { getEvents, getRangeEventList } from '../../Store/events/eventsListAction';
import { RecievedMessages, sentMessages, draftMessages, trashMessages, deleteMessageService, viewMessagedata } from '../../Store/messages/allMessageAction';
import { getAllNotifications, getSentNotifications, getScheduledNotifications } from '../../Store/notifications/allNotificationsaction';
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'

const currentuser = JSON.parse(localStorage.getItem('userdata'));

if (JSON.parse(localStorage.getItem('chapter_id')) != null) {
  var chapter_id = JSON.parse(localStorage.getItem('chapter_id'))

}
class Header extends Component {
  constructor() {
    super();
    this.state = {
      displayProfile: "",
      first_name: "",
      last_name: "",
      displayEmail: "",
      notifications: [],
      activeScreen: '',
      user_type_id: '',
      myChaptersListData: [],
      chapter_name: '',
      Spinner: false,
      notificationData: {}
    }
  }
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };


  logout = () => {
    const { cookies } = this.props;

    swal({
      title: "Logout",
      text: "Are you sure you want to logout?",
      buttons: ["No, Cancel", "Yes, Logout"],
      dangerMode: true,
    })
      .then((willDelete) => {

        if (willDelete) {
          this.setState({
            Spinner: true
          })
          HttpService.logout()
            .then(response => {

              if (response.data.status === 200) {

                cookies.remove("cookiedata")
                this.setState({ user: cookies.get('cookiedata') });

                this.setState({
                  Spinner: false
                })
                localStorage.clear();
                window.location.href = '/';

              }
              else {
                this.setState({
                  Spinner: false
                })
                swal({
                  title: 'Error',
                  text: "Something went wrong, Please try again after sometime."

                });
              }
            })
            .catch(error => {
              this.setState({
                Spinner: false
              })
              swal({
                title: 'Error',
                text: "Something went wrong, Please try again after sometime."

              });
            })
        }
      });
  }

  componentDidMount() {
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));
    var user_id = this.currentuser.user.user_id;
    var display_name = this.currentuser.user.display_name;
    var email = this.currentuser.user.email;
    var userPic = this.currentuser.user.profile_pic;
    this.setState({
      displayProfile: userPic, displayEmail: email, displayname: display_name,
      first_name: this.currentuser.user.first_name,
      last_name: this.currentuser.user.last_name,
      user_type_id: this.currentuser.user.usertypeid
    })
    this.props.NotificationLogList();
    this.props.myChapterList()
  }

  componentWillReceiveProps(nextProps) {
    this.state.notificationData = nextProps.NotificationLog.notificationLog
    this.state.notifications = nextProps.NotificationLog.notificationLog.list
    this.state.myChaptersListData = nextProps.NotificationLog.mychapterslist.chapters_list
  }

  onViewnotification(item) {

    var note_id = item.note_id
    if (item.viewed_status == 0) {
      HttpService.viewNotificationservice({ note_id })
        .then(response => {
          if (response.data.status === 200) {
            this.props.NotificationLogList();
          }
          else {

            swal({
              title: 'Error',
              text: "Something went wrong, Please try again after sometime."

            });
          }
        })
        .catch(error => {

          swal({
            title: 'Error',
            text: "Something went wrong, Please try again after sometime."

          });
        })
    }

    this.props.history.push({
      pathname: '/dashboard/messages',
      state: { detail: item }
    })
  }

  handleUserInput(e, key) {

    if (key === 'chapters') {
      this.state.chapter_name = e.currentTarget.value
      var chapter_id = e.currentTarget.value
      localStorage.setItem("chapter_id", JSON.stringify(e.currentTarget.value));

      var activescreen = JSON.parse(localStorage.getItem('activescreen'))
      switch (activescreen) {

        case 'resourcelist':
          return this.props.getResourcesListdata({ chapter_id });

        case 'discountlist':
          return this.props.getDiscounts({ chapter_id });

        case 'usermanagmentlist':
          this.props.history.push({
            pathname: '/dashboard/user_management'
          })
          return this.props.getActiveUsers({ chapter_id })

        case 'AgecySponsoredlist':
          var data = {
            organized_by: "agency",
            month: "current",
            chapter_id: chapter_id
          }
          return this.props.getRangeEventList(data)

        case 'bigscommunitylist':
          var data = {
            organized_by: "bigs",
            month: "current",
            chapter_id: chapter_id
          }
          return this.props.getRangeEventList(data)

        case 'messagelist':
          return this.props.RecievedMessages()

        case 'notificationlist':
          return this.props.getAllNotifications({ chapter_id })

        case 'alluserphotogallery':
          return this.props.Allusersphotos({ chapter_id });


        default:
          return null
      }
    }
  }

  render() {
    return (
      <header className="main-header">

        <a style={{ backgroundColor: '#3c3b53', padding: '10px', display: 'flex', justifyContent: 'center' }} href="#" className="logo">
          <span className="logo-lg"><img src="/img/bigsconnect.png" /></span>
        </a>

        <nav style={{ backgroundColor: 'white', boxShadow: '1px 1px lightgray' }} className="main-header navbar navbar-expand navbar-white navbar-light">

          <div style={{ position: "initial" }}>

            <a style={{ color: '#3c3b53' }} href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>

          </div>
          {this.state.Spinner ?
            <center>
              <Spinner
                animation="border"
                role="status" >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </center> : null}
          <ul className="navbar-nav ml-auto main-nav">

            <div className="user-panel d-flex">

              {this.state.user_type_id == 1 ?
                <select value={this.state.chapter_id} onChange={(e) => this.handleUserInput(e, 'chapters')} style={{ width: '200px', height: '40px', padding: '5px', marginRight: '20px' }} >

                  {this.state.myChaptersListData?.map(e => (
                    <option value={e.chapter_id}>{e.chapter_name}</option>
                  ))}
                </select>: null
              }
              <div style={{ color: '#bcbccb' }}>

                <li class="notification-container">
                  <div class="dropdown bellnotification">

                    <i className="fa fa-bell dropdown-toggle" aria-hidden="true" data-toggle="dropdown"></i>
                    <div style={{ overflow: 'scroll', minHeight: '200px', maxHeight: '500px' }} className="dropdown-menu">
                      <h4 className="p-3 mb-0" style={{ color: '#4D4F5C' }}>Notifications</h4>
                      
                      <div style={{background:'lightgray',width:'92%',height:'0.5px',marginLeft:'15px'}}></div>
                      {
                        this.state.notifications?.length ? this.state.notifications.map(item =>
                          <div className="dropdown-item">
                            <div class="grid-container" onClick={() => this.onViewnotification(item)} >

                              <div class="grid-child purple">
                              <img 
                               
                               style={{borderRadius:'100px',width:'50px',height:'50px',padding:'0px'}} 
                               src={item.profile_pic}
                                alt="User Image" />
                              </div>

                              <div class="grid-child green">
                              <h4 style={{color: '#4d565c'}} className="mb-0">{item.display_name} <small style={{ color: '#4d4f5c' }}>{item.message}</small></h4>
                                <small><Timeago style={{ color: '#808495'}} date={item.created_at}></Timeago></small>
                              </div>
                            </div>
                          </div>
                        ) : <h5 style={{ color: '#a1a0ae' }} className="App">No New Notifications</h5>
                      }
                    </div>
                  </div>
                  {
                    this.state.notificationData.total_count == 0 ? null :
                      <span class="notification-counter"></span>}
                </li>
              </div>
              <div style={{ height: '30px', width: '1px', backgroundColor: '#e2e2e2', marginLeft: "20px", marginRight: "20px" }}></div>
              <div className="dropdown">
                <a style={{ color: 'GrayText' }}
                  className="nav-link dropdown-toggle"
                  href="#" id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="true">
                  {this.state.first_name} {this.state.last_name}</a>
                <div style={{ textAlign: 'center' }} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <label className="dropdown-item">My Profile</label>
                  <div className="dropdown-divider"></div>
                  <label className="dropdown-item">Account Settings</label>
                  <div className="dropdown-divider"></div>
                  <label className="dropdown-item">Feedback</label>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={this.logout}>Logout</a>
                </div>
              </div>
              <div className="image">
                <img src={this.state.displayProfile} className="img-circle elevation-2" alt="User Image" />
              </div>
            </div>
          </ul>
        </nav>
      </header>
    )
  }
}


export const mapStateToProps = (state) => {
  return {
    user: state.user,
    NotificationLog: state.NotificationLog,
    myChapterResponce: state.myChapterResponce
  }
}
export default connect(mapStateToProps, {
  NotificationLogList,
  myChapterList,
  Allusersphotos,
  getResourcesListdata,
  getDiscounts,
  getActiveUsers,
  getRangeEventList,
  RecievedMessages,
  getAllNotifications
})(withRouter(withCookies(Header)))