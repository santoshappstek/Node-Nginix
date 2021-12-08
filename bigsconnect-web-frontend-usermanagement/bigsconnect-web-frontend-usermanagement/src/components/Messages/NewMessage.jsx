import React, { Component } from 'react';
//import { render } from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js'; //ContentState
import draftToHtml from 'draftjs-to-html';
import swal from 'sweetalert';
import { Input, Button } from 'antd'; //notification
import { connect } from 'react-redux';
import { SendMessageInput,sendMessageForm ,ToUsersListData} from '../../Store/messages/sendMessageAction';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MessStyle.css';
import 'antd/dist/antd.css';
import SimpleReactValidator from 'simple-react-validator';
import HttpService from './../../Services/HttpService'
import Autosuggest from 'react-autosuggest';

const styles = {
  editor: {
    border: '0.5px solid lightgray',
    minHeight: '15em',
    left:'2935px',
    padding:"10px"
  }
};

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({autoForceUpdate: this});   
    this.state = {   
      editorState: EditorState.createEmpty(),
      Uid: '',
      sender_id: "",
      email: "",
      subject: "",
      body:"",
      attachments: [],
      suggetionsdata: [],
      value: '',
      suggestions: []
    };
  }

    // Filter logic
    getSuggestions = async (eventInput) => {
      HttpService.ToListUsersSearch(eventInput)
        .then(response => {
          this.setState({
            suggetionsdata: response.data.users
          })
  
        })
        .catch(error => {
          //dispatch(SendError)
        })
  
      console.log("eventInput 2:- ", eventInput)
      return this.state.suggetionsdata;
    };
  
    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.first_name + " " + suggestion.last_name 
  
    // Render Each Option
    renderSuggestion = suggestion => (
      <div  className="sugg-option">
   <h8 style={{color:'#a1a0ae'}}><b>{suggestion.first_name + " " + suggestion.last_name}</b></h8>
      </div>
    );
  
    // OnChange event handler
    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
  
    // Suggestion rerender when user types
    onSuggestionsFetchRequested = (e) => {
      let eventInput = {
  
        name: e.value
      }
      console.log("eventInput 1", eventInput)
  
      this.getSuggestions(eventInput)
        .then(data => {
          if (data.Error) {
            this.setState({
              suggestions: []
            });
          } else {
            this.setState({
              suggestions: this.state.suggetionsdata
            });
          }
        })
    };
  
    // Triggered on clear
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    // Selected item
    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
      event.preventDefault();
      this.state.email = suggestion.email
     // this.setState({email:suggestion.email})
     let eventInput = {
      key: "draftemail",
      value: suggestion.email
  }
      this.props.SendMessageInput(eventInput);

  }
  onEditorStateChange = (editorState) => {
    const currentContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    this.setState({
      editorState,
    });
    if(this.state.editorState!==null){
      let eventInput = {
        key: "draftbody",
        value: this.state.editorState
    }
        this.props.SendMessageInput(eventInput);
    }
    else{
      let eventInput = {
        key: "draftbody",
        value: ''
    }
        this.props.SendMessageInput(eventInput);
    }
    
  };

  handleChange = (e, key) => {
    const { Uid } = this.state
    let eventInput = {
        key: key,
        value: e.currentTarget.value
    }
    this.state.subject = e.currentTarget.value
    this.props.SendMessageInput(eventInput);
  }  
  
componentDidMount(){
  this.currentuser = JSON.parse(localStorage.getItem('userdata'));
  var user_id = this.currentuser.user_id;
  this.setState({ Uid: user_id });  
}

  sendMail = () => {
    const { to, from, subject, key,text } = this.state;
    const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

    //e.preventDefault();
    const { sendMessage } = this.props
    const { Uid } = this.state    
 
    if( this.validator.allValid())
    {     
        var data = {
         // sender_id: Uid,
          // email: sendMessage.sendMessageDetails.email,
          // subject: sendMessage.sendMessageDetails.subject,
          // attachments : sendMessage.sendMessageDetails.attachments,
          email: this.state.email,
          subject: this.state.subject,
          body:html,         
          message_type:'sent'
        }
   // this.props.sendMessageForm(data);
   HttpService.sendmessage(data)
   .then(response=>{
       console.log('response',response);
       if(response.data.status===200){
        swal({
          title: response.data.message,
          icon: "success"
        });
        this.props.quitScreen();
        this.setState({
          email: "",
          subject: "",
          body: "",
          attachments: []
        });
        this.validator.hideMessages();
       
       }
       else{
        swal({
          title: "Something went wrong,Please try again.",
          icon: "error"
        });
        this.validator.hideMessages();
       }
   })
   .catch(error=>{
    swal({
      title: "Something went wrong,Please try again.",
      icon: "error"
    });
       
   })
    }
    else {
      this.validator.showMessages();          
      } 
       
  }

UNSAFE_componentWillReceiveProps(nextProps){
  //console.log("component:- ",nextProps.sendMessage.sendMessage_res.status==200)  
}

  render() {
    const { editorState } = this.state;
    const { selectedOption } = this.state;
    const { value, suggestions } = this.state;
    // Option props
    const inputProps = {      
      placeholder: 'To:',
      value,
      onChange: this.onChange,
     style: { width: "100%", height: "46px" },
    };
     return (
      <div>        
        <div style={{ marginBottom: "10px" }}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={(ev)=>this.onSuggestionsFetchRequested(ev, "email")}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion = {true}
            onSuggestionSelected={this.onSuggestionSelected}         
          />
          <span className="text-danger">{this.validator.message("To", this.state.email, "required")}</span>
        </div>
        <Input
          className="form-control"
          placeholder="Subject"                       
          onChange={(ev) => { this.handleChange(ev,"subject") }}
        />       
        <div style={{backgroundColor:'red',height:'50vh'}} className="m-10"
          style={styles.editor}
          onClick={this.focusEditor}>
          <Editor 
            editorState={editorState}
            placeholder=" Write Something... "
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorStyle={{lineHeight: '75%'}}
            onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
           // onEditorStateChange={(ev)=> this.handleChange(ev,"body")}
          />
        </div>
        <button style={{float:'right',marginBottom:'20px'}} className="btn btn-info btn-success mt-4" onClick={() => this.sendMail()}>Send</button>        
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
      sendMessage: state.sendMessage
  }
}

export default connect(mapStateToProps, { sendMessageForm, SendMessageInput,ToUsersListData})(NewMessage);
