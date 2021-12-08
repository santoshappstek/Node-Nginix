import React, { Component } from 'react';
import '../../Signin.css';
import '../../assets/css/style.css';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import { addnotificationForm, notificationFetchInput, editnotificationForm } from '../../Store/notifications/addNotificationaction';
import { getBigsUsers } from '../../Store/UserManagement/userManagementAction';
import HttpService from '../../Services/HttpService';
import { Multiselect } from 'multiselect-react-dropdown';
import { withRouter } from 'react-router-dom';
import "../../assets/css/style.css";

const currentuser = JSON.parse(localStorage.getItem('userdata'));



class NewNotification extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      input: {},
      Uid: '',
      sent_to: '',
      message: '',
      scheduled_date: "",
      scheduled_time: "",
      timezone: "",
      message_status: "",
      sent_date: "",
      bigsusers: [],
      char_left: 115,
      max_char: 115,
      select: 'no',
      selectedValue: '',
      all_bigs_user: '',
      selected_users: [],
      isCheckedAllBigs: false,
      isCheckedRecipient: false,
      SelectedUserName: [],
      selectedUserId:[],
      chapter_id:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.style = {
      chips: {
        background: "red"
      },
      searchBox: {
        border: "none",
        "border-bottom": "1px solid blue",
        "border-radius": "0px"
      },
      multiselectContainer: {
        color: "red"
      }
    };
  }

  componentDidMount() {
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));
    var user_id = this.currentuser.user_id;
    this.setState({ Uid: user_id });

    if (this.props.location.state != null) {
      this.state.notify_id = this.props.location.state.detail.notify_id
      this.state.sent_to = this.props.location.state.detail.sentto_status
      this.state.message = this.props.location.state.detail.message
      this.state.scheduled_date = this.props.location.state.detail.scheduled_date
      this.state.scheduled_time = this.props.location.state.detail.scheduled_time
      this.state.timezone = this.props.location.state.detail.timezone
      this.state.sent_date = this.props.location.state.detail.sent_date
      this.state.message_status = this.props.location.state.detail.message_status
      this.state.char_left = this.state.max_char - this.props.location.state.detail.message.length
      this.state.selectedUserId = this.props.location.state.detail.selected_userid
      this.state.SelectedUserName = this.props.location.state.detail.username?.map((name)=>{
        return {
          first_name: name        
        }
      })
      console.log('SelectedUserName:- ', this.state.SelectedUserName)
 
      if(this.state.sent_to=='selected'){
        HttpService.bigsusers()
        .then((response) => {
          this.setState({ bigsusers: response.data.bigs_users })
          //  this.state.bigsusers = response.data.bigs_users
          console.log("all bigs users:- ", this.state.bigsusers)
        })
        .catch(error => {
        })
      }
    }
  }

  handleChange = (e, key) => {
    const { Uid } = this.state
    let noteInput = {
      key: key,
      value: e.currentTarget.value
    }
    if (key == 'sent_to') {
      if (e.currentTarget.value == "selected") {
        var data ={
          chapter_id:this.state.chapter_id 
        }
        // this.props.getBigsUsers();  
        this.state.select = 'yes'
        this.state.sent_to = "selected"

        HttpService.bigsusers(data)
          .then((response) => {
            this.setState({ bigsusers: response.data.bigs_users })
            //  this.state.bigsusers = response.data.bigs_users
            console.log("all bigs users:- ", this.state.bigsusers)
          })
          .catch(error => {
          })
      }
      else {
        //e.currentTarget.value = 'all'
        this.state.select = 'no'
        this.state.sent_to = "all"
      }
      this.setState({
        sent_to: e.currentTarget.value
      })
    }
    if (key === 'message') {
      var input_count = e.currentTarget.value
      this.state.char_left = this.state.max_char - input_count.length
      this.state.message = e.currentTarget.value
    }
    if (key === 'message_status') {
      this.state.message_status = e.currentTarget.value
    }
    if (this.state.message_status == 'sent') {
      this.state.scheduled_time = ''
      this.state.scheduled_date = ''
    }
    if (key === 'scheduled_date') {
      this.state.scheduled_date = e.currentTarget.value
    }
    if (key === 'scheduled_time') {
      this.state.scheduled_time = e.currentTarget.value
    }

    if (key === 'timezone') {
      this.setState({
        timezone: e.currentTarget.value
      })
    }
    this.props.notificationFetchInput(noteInput);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { addNotification } = this.props
    const { Uid } = this.state
    if (this.props.location.state != null) {
      if (this.validator.allValid()) {
        if (this.state.sent_to == 'all') {
          
          var data = {
            notify_id:  this.state.notify_id,
            message: this.state.message,
            message_status: this.state.message_status,
            scheduled_date: this.state.scheduled_date,
            scheduled_time: this.state.scheduled_time,
            timezone: this.state.timezone,
            //user_id: Uid,
            chapter_id:this.state.chapter_id ,
            sent_to: "all"
          };
          this.props.editnotificationForm(data);
        }
        else {
          var data = {
            notify_id:  this.state.notify_id,
            message: this.state.message,
            message_status: this.state.message_status,
            scheduled_date: this.state.scheduled_date,
            scheduled_time: this.state.scheduled_time,
            timezone: this.state.timezone,
          //  user_id: Uid,
            chapter_id:this.state.chapter_id ,
            sent_to: this.state.selectedUserId
          };
          this.props.editnotificationForm(data);

        }        
        swal({
          text: "Notification Updated Successfully",
          icon: "success",
          closeOnEsc: false,
          dangerMode: true,
          closeOnClickOutside: false
        })
          .then((willDelete) => {
            if (willDelete) {
              this.props.history.push({
                pathname: '/dashboard/notifications'
              })
            }
          });
        this.props.history.push({
          pathname: '/dashboard/notifications'
        })
      }
      else {
        this.validator.showMessages();
      }
    }
    else {
      if (!this.validator.allValid()) {
        this.validator.showMessages();
      }
      else {
        if (this.state.select == 'no') {
          var data = {
            message: addNotification.notificationDetails.message,
            message_status: addNotification.notificationDetails.message_status,
            scheduled_date: addNotification.notificationDetails.scheduled_date,
            scheduled_time: addNotification.notificationDetails.scheduled_time,
            timezone: addNotification.notificationDetails.timezone,
            //user_id: Uid,
            chapter_id:this.state.chapter_id ,
            sent_to: "all"
          };
          this.props.addnotificationForm(data);
        }
        else {
          var data = {
            message: addNotification.notificationDetails.message,
            message_status: addNotification.notificationDetails.message_status,
            scheduled_date: addNotification.notificationDetails.scheduled_date,
            scheduled_time: addNotification.notificationDetails.scheduled_time,
            timezone: addNotification.notificationDetails.timezone,
          //  user_id: Uid,
            chapter_id:this.state.chapter_id ,
            sent_to: this.state.selectedUserId
          };
          this.props.addnotificationForm(data);

        }
        swal({
          text: " Notification added Successfully.  ",
          icon: "success",
          closeOnEsc: false,
          dangerMode: true,
          className: 'label-bold-gray',
          closeOnClickOutside: false
        })
          .then((willDelete) => {
            if (willDelete) {
              this.props.history.push({
                pathname: '/dashboard/notifications'
              })
            }
          });
        this.noteForm.reset();
        this.setState({
          message: '',
          message_status: '',
          scheduled_date: '',
          scheduled_time: ''
        })
        this.validator.hideMessages();                    
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    this.setState({ bigsusers: nextProps.addNotification.data });
  }
  onSelectItem = (selectedusers,ii) => {
    const user_ids = this.state.selectedUserId;

    if(user_ids==null){
      this.state.selectedUserId = selectedusers.map(id=>(
        id.user_id
      ))
    }
    else{
    user_ids.push(+ii.user_id)
    this.state.selectedUserId = user_ids
    }
  }
  onRemove = (removeusers,removeitem,yyy)=> {
    const remove_user_ids = this.state.selectedUserId
    let index
    index = remove_user_ids.indexOf(-removeitem.user_id)
    remove_user_ids.splice(index, 1)
    this.state.selectedUserId = remove_user_ids
   }
   onNotifications()
   {
     this.props.history.push('/dashboard/notifications');
   }

  render() {
    const { plainArray, objectArray, selectedValues } = this.state;
    if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
    this.state.chapter_id = JSON.parse(localStorage.getItem('chapter_id'))
    
    }
    return (

      <form ref={form => { this.noteForm = form }} onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 mb-4">
              <label className="label-discount" onClick={() => this.onNotifications()}>Notifications</label>
              <i style={{ color: "#43425d", margin: "10px" }} class="fa fa-chevron-right" aria-hidden="true"></i>
              <label className="label-discount">New Notification</label>
            </div>            
          </div>
          <section className="notifications-sec">
            <div className="row row-eq-height">
              <div className="col-lg-6">
                <div className="message-card">
                  <div className="mb-3">
                    <h5 style={{ color: '#4d4f5c' }} className="mb-3"><b>To</b></h5>

                    <div className="row">

                      <div className="col-3">
                        <input checked ={this.state.sent_to=='all'} type="radio" id="defaultRadio" name="sent_to" value='all' onChange={(e) => this.handleChange(e, 'sent_to')} />
                        <label style={{ color: '#8f9199' }}for="defaultRadio" className="mr-0">All BIGS</label>
                      </div>

                      <div className="col-6">
                        <input  checked ={this.state.sent_to=="selected"}type="radio" id="defaultRadioone" name="sent_to" value="selected" onChange={(e) => this.handleChange(e, 'sent_to')} />
                        <label style={{ color: '#8f9199' }}
                          for="defaultRadioone"
                        >Select Recipients</label>
                      </div>
                    </div>
                    {this.state.sent_to == 'selected' ?
                      <div className="row my-3">
                        <div style={{ width: '100px', marginTop: '20px', marginLeft: '130px' }} className="col-md-6 addadency-sec">
                          <div>
                            <Multiselect
                              placeholder="Select Recipients"
                              options={this.state.bigsusers}
                              displayValue={'first_name'}                              
                              onSelect={this.onSelectItem}
                              onRemove={this.onRemove}
                              selectedValues={this.state.SelectedUserName}
                             style={{
                              chips: {                               
                                border: 'none',
                                'border-radius': '15px'                              
                              //  background: 'white'
                              },
                              multiselectContainer: {
                                color: '#8f9199'
                              },
                              searchBox: {
                                border: 'none',
                                'border': '1px solid gray',
                                'border-radius': '5px'
                              }
                            }}
                            />                            
                          </div>
                        </div>
                      </div> : null
                    }
                  </div>
                  <h5 style={{ color: '#4d4f5c' }} className="mb-3"><b>Message*</b></h5>
                  <input rows="5" maxLength={115} className="form-control mb-4" name="message" placeholder="Write Something" defaultValue={this.state.message} onChange={(e) => this.handleChange(e, 'message')} />
                  <label style={{ color: '#8f9199', marginLeft: '20px' }}>Characters Remaining: {this.state.char_left}</label>
                  <span className="text-danger">{this.validator.message("message", this.state.message, "required")}</span>
                  <div className="send-button mb-5">
                    <button style={{ marginTop: '10px', float: 'right' }} type="button" className="btn btn-info btn-success mt-1" onClick={this.handleSubmit}>Send</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="schedule-card">
                  <div >

                  <h5 style={{ marginLeft: '0px', color: '#4d4f5c' }} className="mb-3"><b>Scheduling*</b></h5>
                  <div style={{ marginTop: '20px',marginLeft:'-30px' }} className="form-check mb-2">
                    <input type="radio" className="form-check-input" id="send_now" name="message_status" value="sent" checked={this.state.message_status == 'sent'}
                      onChange={(e) => this.handleChange(e, 'message_status')} />
                    <label style={{ color: '#8f9199' }} className="form-check-label" for="send_now">Send Now
                    </label>
                  </div>
                  <div style={{ marginTop: '20px' ,marginLeft:'-30px'}} className="form-check">
                    <input type="radio" className="form-check-input" id="send_later" name="message_status" value="scheduled" checked={this.state.message_status == 'scheduled'}
                      onChange={(e) => this.handleChange(e, 'message_status')} />
                    <label style={{ color: '#8f9199' }} className="form-check-label" for="send_later">Schedule Notification
                    </label>
                  </div>
                  <span className="text-danger">{this.validator.message("message_status", this.state.message_status, "required")}</span>

                  {this.state.message_status == 'scheduled' ?
                    <div  className="row m-3">
                      <div  style={{ marginLeft: '-20px' }} className="col-xl-5">
                        <div  className="form-group">
                          <label style={{ marginLeft: '0px', color: '#4d4f5c' }} className="font-weight-bold">Date *</label>
                          <input type="date" style={{ padding: '5px',fontSize:'13px' }} name="date" className="form-control" name="scheduled_date" defaultValue={this.state.scheduled_date} onChange={(e) => this.handleChange(e, 'scheduled_date')} />
                          <span className="text-danger">{this.validator.message("scheduled_date", this.state.scheduled_date, "required")}</span>
                        </div>
                      </div>
                      <div style={{ marginLeft: '-10px' }} className="col-xl-4">
                        <div className="form-group">
                          <label style={{ marginLeft: '0px', color: '#4d4f5c' }} className="font-weight-bold">Time *</label>
                          <input style={{fontSize:'13px',width:'110%', paddingLeft:'10px'}} type="time" className="form-control" name="scheduled_time" defaultValue={this.state.scheduled_time} onChange={(e) => this.handleChange(e, 'scheduled_time')} />
                          <span className="text-danger">{this.validator.message("scheduled_time", this.state.scheduled_time, "required")}</span>

                        </div>
                      </div>

                      <div style={{ marginLeft: '0px' }} className="col-xl-3">
                        <div className="form-group">
                          <label style={{ marginLeft: '-10px', color: '#848494' }} className="font-weight-bold"></label>

                          <select style={{ borderRadius:'5px', margin: '5px', height: '46px',fontSize:'13px',marginLeft:'0px' }} className="form-control" name="timezone" value={this.state.timezone} onChange={(e) => this.handleChange(e, 'timezone')}>
                            <option  value="EST">EST</option>
                            <option value="UTC">UTC</option>
                          </select>
                        </div>
                      </div>
                    </div> : null
                  }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>          
    );
  }
}


export const mapStateToProps = (state) => {
  return {
    addNotification: state.addNotification,
    bigsusers: state.bigsusers

  }
}

export default connect(mapStateToProps, { addnotificationForm, notificationFetchInput, editnotificationForm, getBigsUsers })(withRouter(NewNotification));
