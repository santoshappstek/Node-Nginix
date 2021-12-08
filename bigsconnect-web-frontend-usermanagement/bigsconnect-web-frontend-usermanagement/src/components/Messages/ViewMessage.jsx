import React, { Component } from 'react';
import '../../assets/css/style.css';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { deleteMessageService, viewMessagedata } from '../../Store/messages/allMessageAction';
import MessagesList from './MessagesList';
import { Spinner } from 'react-bootstrap'
import HttpService from './../../Services/HttpService'
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js'; //ContentState

const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

class ViewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      message_id: '',
      message: '',
      message_type:'',
      actiontype: '',
      spinner: true,
      deleteResponse: {},
      draftsubject:''
    }
  }


  componentDidMount() { 
    this.setState({
      spinner: true
    })
    if(this.props.sendMessage.sendMessageDetails.draftbody!==undefined){
      var drafthtml = draftToHtml(convertToRaw(this.props.sendMessage.sendMessageDetails.draftbody.getCurrentContent()))
    }
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));
    if (this.props.sendMessage.sendMessageDetails.subject!==undefined || this.props.sendMessage.sendMessageDetails.draftemail!=undefined||this.props.sendMessage.sendMessageDetails.draftbody!==undefined) {
      this.state.draftsubject= "draft"      
    }
    else{
      this.state.draftsubject= ""
    }
    var messagebody = {
      user_id : this.currentuser.user_id,
       message_id: this.props.messageId,
       message_type :  this.state.draftsubject,
       email : this.props.sendMessage.sendMessageDetails.draftemail,
       subject : this.props.sendMessage.sendMessageDetails.subject,
       body :  drafthtml
    } 
  
    this.props.viewMessagedata(messagebody);
    this.props.sendMessage.sendMessageDetails.subject = undefined
    this.props.sendMessage.sendMessageDetails.draftemail = undefined
    this.props.sendMessage.sendMessageDetails.draftbody = undefined
  }
  componentDidUpdate(prevProps) {
    if (this.props.messageId !== prevProps.messageId) {
      this.setState({
        spinner: true
      })
      this.currentuser = JSON.parse(localStorage.getItem('userdata'));
      var user_id = this.currentuser.user_id;
      var message_id = this.props.messageId;
      this.props.viewMessagedata({ message_id,user_id });
    }
    else {
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      spinner: false,
      message : nextProps.Messageslistdata.viewMessage 
    })
  }

  onDelete(message_id) {
    var delete_from = this.props.typeOfMessage; 
    swal({
      title: "Delete Message?",
      text: "Are you sure you want to delete this\n user message?",     
      buttons: ["No, Cancel", "Yes, Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.setState({
            spinner: true
          })

          HttpService.deletemessage({ message_id,delete_from })
            .then(response => {
              this.state.deleteResponse = response.data
              if (this.state.deleteResponse.status === 200) {
                this.setState({
                  spinner: false
                })
                swal(this.state.deleteResponse.message, {
                  icon: "success",
                });
                window.location.reload(true)
              }
              else {
                this.setState({
                  spinner: false
                })
                swal(this.state.deleteResponse.message, {
                  icon: "error",
                });
              }
              //dispatch(deleteeventfor(response.data));
            })
            .catch(error => {
              this.setState({
                spinner: false
              })
              swal(error, {
                icon: "error",
              });
              // dispatch(EventError());
            })
        }
      });
  }

  render() {
    const toDeleteRefresh = "messagedeleted"
    return (
      <div>
        <div className="App">
          {this.state.spinner && <Spinner
            animation="border"
            role="status" >
            <span className="sr-only">Loading...</span>
          </Spinner>}

        </div>
        <section className="msg-mailbox-sec">

          <div className="row">

            <div className="col-lg-12 mb-3 mb-lg-0">
              <div id="textbox">
                <h5 style={{color:'#4D4F5C'}} className="alignleft">Protective Preventative Maintenance</h5>
                {/* <span className="alignright" ><i class="fas fa-chevron-down"></i></span> */}

                <span className="alignright" onClick={() => this.onDelete(this.state.message.message_id)}><i class="fas fa-trash-alt"></i></span>
              </div>
              <div className="mail-usercontent-sec">
                  <div className="delete-icon">
                    {/* <span onClick={() => this.onDelete(this.state.message.message_id)}><i class="fas fa-trash-alt"></i></span> */}
                  </div>
                  <div className="media p-3">
                    <div className="float-container">
                      <div className="float-child-view-message">
                        <img className="image-circle" src={this.state.message.profile_pic} width="50" height="50"></img>
                      </div>
                      <div className="float-child-right-view-message" >
                        <h8 style={{color:'#4D4F5C'}}><b>{this.state.message.first_name + " " + this.state.message.last_name}</b> <small style={{ float: "right" }}>{(new Date(this.state.message.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}</small></h8>
                        <h9 style={{color:'#4D4F5C'}} className="truncate">To <b>me</b></h9>
                      </div>
                    </div>

                  </div>
                <hr />
                <div className="mail-content">
                  {
                    this.state.message.body && <div dangerouslySetInnerHTML={{ __html: this.state.message.body }}></div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    Messageslistdata: state.Messageslistdata,
    sendMessage: state.sendMessage
  }
}
export default connect(mapStateToProps, { deleteMessageService, viewMessagedata })(ViewMessage)