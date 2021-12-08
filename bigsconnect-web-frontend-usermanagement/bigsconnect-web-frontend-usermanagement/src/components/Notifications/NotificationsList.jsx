import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from "react-crud-icons";
import $ from 'jquery';
import remove from "../../assets/remove.png";
import edit from '../../assets/edit.png';
import { getAllNotifications, getSentNotifications, getScheduledNotifications } from '../../Store/notifications/allNotificationsaction';
import { editnotificationForm, notificationFetchInput, deletenotificationForm } from '../../Store/notifications/addNotificationaction';
import ReactPagenate from 'react-paginate'
import '../../App.css'
import { Button, Spinner } from 'react-bootstrap'
import swal from 'sweetalert';
import Edit from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import HttpService from '../../Services/HttpService';
import * as moment from 'moment';

const currentuser = JSON.parse(localStorage.getItem('userdata'));



class NotificationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      allnotifications: [],
      offset: 0,
      perPage: 10,
      currentPage: 0,
      filterNotification: [],
      slice: [],
      notifications: [],
      DefaultMessage: '',
      deleteResponce: {},
      notifToDeleteRefresh: '',
      notifSearchInput: '',
      notifSearchList: [],
      chapter_id:''
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }

  listOfNotifications = (event, notificationType) => {
    this.state.notifToDeleteRefresh = notificationType
    var data ={
      chapter_id:this.state.chapter_id
    }
    if (notificationType == 'all') {
      this.clearSearhText.value = ''
      this.setState({
        notifSearchList: [],
        DefaultMessage:''
      })
      
      this.props.getAllNotifications(data);
    } else if (notificationType == 'sent') {
      this.clearSearhText.value = ''
      this.setState({
        notifSearchList: [],
        DefaultMessage:''
      })
      this.props.getSentNotifications(data);
    } else if (notificationType == "scheduled") {
      this.clearSearhText.value = ''
      this.setState({
        notifSearchList: [],
        DefaultMessage:''
      })
      this.props.getScheduledNotifications(data);
    }
  }
  componentDidMount() {
    this.state.notifToDeleteRefresh = 'all'
    var data ={
      chapter_id:this.state.chapter_id
    }
    this.props.getAllNotifications(data);
  }
  onnewNotification() {
    this.props.history.push({
      pathname: '/dashboard/notifications/new_notification'
    })
  }

  onEdit(item) {
    this.props.history.push({
      pathname: '/dashboard/notifications/new_notification',
      state: { detail: item }
    })
  }

  onDelete(notify_id) {
    swal({
      title: "Delete Notification",
      text: "Are you sure you want to delete this\n user notification?",     
      buttons: ["No, Cancel", "Yes, Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {

        if (willDelete) {
          this.setState({
            spinner: !this.state.spinner
          })
          const noteArray = this.state.allnotifications.slice()
          if (notify_id > -1) {
            noteArray.splice(notify_id, 1);
          }
          HttpService.deletenotification({ notify_id })
            .then(response => {
              this.state.deleteResponce = response.data
              if (this.state.deleteResponce.status === 200) {
                this.setState({
                  spinner: false
                })
                swal(this.state.deleteResponce.message, {
                  icon: 'success'
                });
                var data ={
                  chapter_id:this.state.chapter_id
                }
                if (this.state.notifToDeleteRefresh == 'all') {
                  this.props.getAllNotifications(data);
                } else if (this.state.notifToDeleteRefresh == 'sent') {
                  this.props.getSentNotifications(data);
                } else if (this.state.notifToDeleteRefresh == "scheduled") {
                  this.props.getScheduledNotifications(data);
                }
                this.setState({
                  notifications: this.state.notifications
                })
              }
              else {
                this.setState({
                  spinner: false
                })
                swal(this.state.deleteResponce.message, {
                  icon: 'error'
                });
              }
              //  dispatch(store, deletenotificationfor(response.data))
            })
            .catch(error => {
              swal(error, {
                icon: 'error'
              });
              //  dispatch(notificationError());
            })
          this.setState({
            allnotifications: noteArray
          })
        }
      });
  }
  componentWillReceiveProps(nextProps) {
    this.state.notifications = nextProps.allNotificationsDetails.allnotifications.notifications

    this.setState({
      spinner: false,
      notifications: nextProps.allNotificationsDetails.allnotifications.notifications
    })
    //this.state.spinner = true
    if (this.state.notifications.length === 0) {
      this.setState({
        spinner: false,
        DefaultMessage: "No Notifications Found",
        pageCount: 0
      })
    }

    else {
      this.state.notifications = nextProps.allNotificationsDetails.allnotifications.notifications
      this.state.filterNotification = nextProps.allNotificationsDetails.allnotifications.notifications.slice(this.state.offset, this.state.offset + this.state.perPage)

      const postData = this.state.notifications.map(pd => <React.Fragment>
      </React.Fragment>)
      this.setState({
        spinner: false,
        pageCount: Math.ceil(this.state.notifications.length / this.state.perPage),
        postData,
      })
    }
  }

  searchHandler = (event) => {
    if (event.target.value.length === 0) {
      var data ={
        chapter_id:this.state.chapter_id
      }
      this.props.getAllNotifications(data);
      this.setState({
        spinner: false,
        notifSearchList: [],
        notifSearchInput: '',
        DefaultMessage: ''
      })
    }
    else {
      let searcjQery = event.target.value,
        displayedSearch = this.state.notifications.filter((el) => {
          let searchValue = el.message;
          return searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
        })
      if (displayedSearch.length > 0) {
        this.setState({
          notifSearchList: displayedSearch,
          pageCount: Math.ceil(displayedSearch.length / this.state.perPage),
          notifSearchInput: event.target.value,
          DefaultMessage:''
        })

      }
      else {
        this.setState({
          notifSearchList: [],
         // notifications: [],
        //  notifSearchInput: '',
          DefaultMessage: 'No Notifications Found.'
        })
      }
      // this.setState({ notifications: displayedSearch, pageCount: Math.ceil(displayedSearch.length / this.state.perPage) })
    }
  }

  receivedData() {
    this.state.slice = this.state.notifications.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = this.state.slice.map(pd => <React.Fragment>
      <img src={pd.thumbnailUrl} alt="" />
    </React.Fragment>)
    this.setState({
      pageCount: Math.ceil(this.state.notifications.length / this.state.perPage),
      postData
    })
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {

      this.receivedData()
    })
  };
  render() {
    localStorage.setItem("activescreen", JSON.stringify('notificationlist'));
    if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
      this.state.chapter_id = JSON.parse(localStorage.getItem('chapter_id'))
    
    }
    return (
      <div className="container">
         <div style={{ width: '100%', paddingTop: '20px' }}>
          <div style={{ width: '50%', float: 'left' }}>
            <h3 className="pagename mb-3">Notifications</h3>
          </div>

          <div style={{ width: '50%', float: 'right' }}>
            <div style={{ width: '100%', float: 'right' }}>
              <div style={{ width: '65%', float: 'left', paddingRight: '20px' }}>
                <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                <input style={{ paddingLeft: '40px' }} type="text" ref={ref => this.clearSearhText = ref} className="form-control" placeholder="Search Message..." onChange={(e) => this.searchHandler(e)} />

              </div>
              <div style={{ width: '35%', float: 'right' }}>
              {/* <button type="button" className="btn btn-info btn-success newnotify-btn mt-1" onClick={() => this.onnewNotification()}>New Notification</button> */}
              <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewNotification()}>New Notification</button>

              </div>
            </div>
          </div>
        </div>       
        <div style={{ width: '100%', paddingTop: '20px', marginLeft: '0px' }} className="row">
          <div className="box">
            <center>
              {this.state.spinner? <Spinner
                animation="border"
                role="status" >
                <span className="sr-only">Loading...</span>
              </Spinner>:null}

            </center>
            <div className="userManagement-page">
              <div className="tabs-sec notify-tabs-sec">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" onClick={(event) => { this.listOfNotifications(event, 'all') }} href="#">All</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " data-toggle="tab" onClick={(event) => { this.listOfNotifications(event, 'sent') }} href="#">Sent</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listOfNotifications(event, 'scheduled') }} href="#">Scheduled</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row my-3">
              <div className="col mb-3 col-12 text-center">
                <div className="table-responsive">
                  <table style={{ margin: '10px' }} id="dataTable">
                    <thead>
                      {this.state.notifications.length>0?
                        <tr>
                          <th>To</th>
                          <th>Message</th>
                          <th>Date Sent</th>
                          <th>Status</th>
                          <th></th>
                        </tr> : null
                      }
                    </thead>
                    <tbody>
                      {
                        // this.state.slice?.map(item => (
                        this.state.notifSearchInput.length ? this.state.notifSearchList.length ? this.state.notifSearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                          <tr key={item.notify_id} >
                          <a>  <td 
                            // title={item.username}
                            data-tooltip={item.username}
                            data-tooltip-location="right"
                            > {item.sent_to} BIGS</td></a>
                            <td> {item.message}</td>
                            {item.sent_date !== null ? <td>{moment(item.sent_date).format('MM/DD/YYYY')} </td> : <td></td>}
                            {item.message_status == 'scheduled' ? <td> {item.message_status}-{moment(item.scheduled_date).format('MM/DD/YYYY')}@{item.scheduled_time} {item.timezone} </td> : <td>{item.message_status}</td>}

                            { item.message_status == 'scheduled' ?
                              <td>
                                <div className="float-right">
                                  <span className="pr-2"
                                    name="edit"
                                    onClick={() => this.onEdit(item)}
                                  ><Edit /></span>
                                  <span
                                    name="remove"
                                    onClick={() => this.onDelete(item.notify_id)}
                                  ><CloseIcon /></span>
                                </div>
                              </td> : <td></td>}
                              {/* <td>{item.sent_to} Users</td> */}

                          </tr>
                        )) : 
                        <tr>
                          <td colspan="4">
                            <div style={{ width: '100%' }}>
                              <h3 style={{ textAlign: 'center' }}>
                                  {this.state.DefaultMessage}
                              </h3>
                            </div>
                          </td>
                        </tr>
                         :

                          this.state.notifications.length ? this.state.notifications?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                            <tr key={item.notify_id} >
                               <a><td 
                              //  title={item.username}
                              data-tooltip={item.username}
                              data-tooltip-location="right"
                               > {item.sent_to} BIGS </td></a>
                              <td> {item.message}</td>
                              {item.sent_date !== null ? <td>{moment(item.sent_date).format('MM/DD/YYYY')} </td> : <td></td>}
                              {item.message_status == 'scheduled' ? <td> {item.message_status}-{moment(item.scheduled_date).format('MM/DD/YYYY')}@{item.scheduled_time} {item.timezone} </td> : <td>{item.message_status}</td>}

                              { item.message_status == 'scheduled' ?
                                <td>
                                  <div className="float-right">
                                    <span className="pr-2"
                                      name="edit"
                                      onClick={() => this.onEdit(item)}
                                    ><Edit /></span>
                                    <span
                                      name="remove"
                                      onClick={() => this.onDelete(item.notify_id)}
                                    ><CloseIcon /></span>
                                  </div>                                 
                                </td> : <td></td>}
                            </tr>
                          )) : 
                          <tr>
                            <td colspan="4">
                              <div style={{ width: '100%' }}>
                                <h3 style={{ textAlign: 'center' }}>
                                  {this.state.DefaultMessage}
                                </h3>
                              </div>
                            </td>
                          </tr>
                      }
                    </tbody>
                  </table>
                  {!this.state.DefaultMessage.length>0 ?
                    <div className="col-md-12">
                      <div className="pagination">
                        {this.state.postData}
                        <ReactPagenate
                          previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={"..."}
                          breakClassName={"break-me"}
                          pageCount={this.state.pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={10}
                          onPageChange={this.handlePageClick}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}>
                        </ReactPagenate>
                      </div>
                    </div> : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export const mapStateToProps = (state) => {
  return {
    allNotificationsDetails: state.allNotificationsDetails,
    addNotification: state.addNotification
  }
}

export default connect(mapStateToProps, { getAllNotifications, getSentNotifications, getScheduledNotifications, deletenotificationForm })(NotificationsList)