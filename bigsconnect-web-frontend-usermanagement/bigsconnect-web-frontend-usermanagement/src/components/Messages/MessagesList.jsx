import React, { Component } from 'react';
import '../../assets/css/style.css';
import { connect } from 'react-redux';
import { RecievedMessages, sentMessages, draftMessages, trashMessages, deleteMessageService, viewMessagedata } from '../../Store/messages/allMessageAction';
import swal from 'sweetalert';
import ViewMessage from './ViewMessage';
import NewMessage from './NewMessage';
import DraftNewMessage from './DraftNewMessage';
import { Spinner } from 'react-bootstrap';

const DATE_OPTIONS = { month: 'short', day: 'numeric' };

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recievedMessages: [],
      Uid: '',
      message_id: '',
      activeScreen: '',
      spinner: false,
      typeToRefresh:'',
      dataview: {props},
      allViewMessage:''
    }
  }

  componentDidMount() {
    
    this.state.spinner = true
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));
    var user_id = this.currentuser.user_id;
    this.setState({ Uid: user_id ,
    typeToRefresh:'inbox'});

    this.props.RecievedMessages()
    if(this.props.location.state!=null){
      this.state.allViewMessage = this.props.location.state.detail.source_id
      this.onViewmessage(this.state.allViewMessage)
    }
  }
  listofMessagesTypes = (event, typeOfMessage) => {
    this.state.typeToRefresh = typeOfMessage
    this.state.spinner = true
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));
    var user_id = this.currentuser.user_id;
    this.setState({ Uid: user_id });

    if (typeOfMessage == "inbox") {
      this.state.recievedMessages = []
      this.props.RecievedMessages();
    }
    else if (typeOfMessage == "sent") {
      this.state.recievedMessages = []
      this.props.sentMessages();
    }
    else if (typeOfMessage == "drafts") {
      this.state.recievedMessages = []
      this.props.draftMessages();
    }
    else if (typeOfMessage == "trash") {
      this.state.recievedMessages = []
      this.props.trashMessages();
    }
  }
  onCompose() {
    this.setState({
      activeScreen: 'compose'
    })   
  }
  onViewmessage(item,data) {
  
    if(data=='direct'){
      if(this.state.typeToRefresh == 'drafts')
    {
      this.setState({
        activeScreen: 'draftcompose',
        data: { item }
      })
    }
    else   
    {           
      this.setState({
        activeScreen: 'messageview',
        messageId: item.message_id,
        typeOfMessage: this.state.typeToRefresh
      })      
    }
    }    
    else
    {            
      this.setState({
        activeScreen: 'messageview',
        messageId: this.state.allViewMessage,
        typeOfMessage: this.state.typeToRefresh
      })
    }
  }

  deleteMessage(message_id) {
    this.props.deleteMessageService(message_id);
    swal({
      title: "Message Deleted Successfully",
      icon: "success"
    });
  }

  componentWillReceiveProps(nextProps) {
    this.state.spinner = false
    this.state.recievedMessages = nextProps.Messageslistdata.allMessageList    
  }

  searchHandler = (event,typeOfMessage) => {
    if (event.target.value.length === 0) {
    this.setState({
      spinner :true
    })
      this.currentuser = JSON.parse(localStorage.getItem('userdata'));
      var user_id = this.currentuser.user_id;      
  
      if (this.state.typeToRefresh == "inbox") {       
        this.state.recievedMessages = []
        this.props.RecievedMessages();
        this.state.spinner = false;
      }
      else if (this.state.typeToRefresh == "sent") {
        this.state.spinner = false
        this.state.recievedMessages = []
        this.props.sentMessages();
        this.state.spinner = false
      }
      else if (this.state.typeToRefresh == "trash") {
        this.state.spinner = false
        this.state.recievedMessages = []
        this.props.trashMessages()
        this.state.spinner = false
      }
      else if (this.state.typeToRefresh == "drafts") {
        this.state.spinner = false
        this.state.recievedMessages = []
        this.props.draftMessages()
        this.state.spinner = false
      }
    }
    else {
      let searcjQery = event.target.value,
        searchedMessages = this.state.recievedMessages.filter((el) => {
          if(el.first_name===null){
            return ""
          }
          else{
            let searchValue = el.first_name;          
            let data =  searchValue.toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
            return data
          }      
        })
      this.setState({ recievedMessages: searchedMessages})
    }
  }

  quitComposeScreen = () => {
    this.setState({
      activeScreen: '',
    })
  }
  componentDidUpdate(prevProps){
    if(this.props.location.state!=null){
      if (this.props.location.state.detail.source_id !== prevProps.location.state.detail.source_id) {
  
        this.currentuser = JSON.parse(localStorage.getItem('userdata'));
        var user_id = this.props.location.state.detail.user_id;
        var message_id = this.props.location.state.detail.source_id;
        this.props.viewMessagedata({ message_id,user_id });
      }
    }
  
    


  }

  render() {

    localStorage.setItem("activescreen", JSON.stringify('messagelist'));

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 mb-4">
            <h3 className="pagename">Messaging</h3>
          </div>
        </div>
        <section className="msg-mailbox-sec">
          <div className="row">
            <div className="col-sm-2">
              <div className="mail-main-sec">
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" onClick={() => this.onCompose()}>Compose</button>
                </div>
                <hr />
                <div className="userManagement-page">
                  <div className="tabs-sec">
                    <ul className="mail-items-list nav nav-tabs">
                      <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" onClick={(event) => { this.listofMessagesTypes(event, 'inbox') }} href="#">Inbox  <span className="mail-list-num"><strong></strong></span> </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listofMessagesTypes(event, 'sent') }} href="#">Sent</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listofMessagesTypes(event, 'drafts')}} href="#">Drafts</a></li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listofMessagesTypes(event, 'trash') }} href="#">Trash</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div style={{height:'75vh'}} className="col-sm-4">
              <div className="mail-users-sec">
                <div className="mail-search-field">
                  <button type="submit"><i class="fa fa-search"></i></button>
                  <input onChange={(e) => this.searchHandler(e)}style={{ fontSize: "14px" }} className="truncate" type="text" placeholder="Search Message or Name " name="search2" />
                </div>
                <center className="float-center">
                  {this.state.spinner && <Spinner
                    animation="border"
                    role="status" >
                    <span className="sr-only">Loading...</span>
                  </Spinner>}
                </center>
                {
                  this.state.recievedMessages.length ? this.state.recievedMessages.map(item =>
                    <div className="users-styling">
                      <div className="media  p-3">
                        <div className="media-body" key={item.message_id}>
                          <div className="float-container">
                            <div className="row">
                              <div className="col-sm-3">
                            <img className = "image-circle" src={item.profile_pic} width="50" height="50" />
                           
                            </div>
                            <div className="col-sm-9" >
                              <h8 style={{color:'#4D4F5C',marginLeft:'-15px'}} onClick={() => this.onViewmessage(item,'direct')}><b>{item.first_name + " " + item.last_name}</b> <small style={{ float: "right" }}>{(new Date(item.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}</small></h8>
                              { item.subject!=null? 
                              <h9 style={{color:'#4D4F5C',marginLeft:'-15px'}} className="truncate">{item.subject}</h9>:
                              <h9 style={{color:'#4D4F5C',marginLeft:'-15px'}} className="truncate">(No Subject)</h9>}
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : <h4 className="App">You don't have any messages</h4>
                }
              </div>
            </div>
            <div style={{height:'75vh'}} className="col-sm-6">
              <div className="mail-usercontent-sec">
                <div className="main-preventative-heading">
                  {                    
                    this.state.activeScreen == 'messageview' ?
                      <ViewMessage messageId={this.state.messageId} typeOfMessage={this.state.typeOfMessage} />
                      : this.state.activeScreen == 'draftcompose' ?
                        <DraftNewMessage 
                          quitScreen={this.quitComposeScreen.bind(this)} data={this.state.data}
                        />
                        : this.state.activeScreen == 'compose' ?
                        <NewMessage 
                          quitScreen={this.quitComposeScreen.bind(this)}
                        />
                        :  <div style={{display:'flex',justifyContent:'center',height:'70vh'}} >
                        <h3 style={{display:'flex',alignItems:'center',color:'#ccccd4'}} className="pagename">Select a Message</h3>               
                    
                   </div>
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
    Messageslistdata: state.Messageslistdata
    // deleteMessage: state.deleteMessage,
    // trashmessages:state.trashmessages
  }
}
export default connect(mapStateToProps, { RecievedMessages, sentMessages, draftMessages, deleteMessageService, trashMessages, viewMessagedata })(MessagesList)