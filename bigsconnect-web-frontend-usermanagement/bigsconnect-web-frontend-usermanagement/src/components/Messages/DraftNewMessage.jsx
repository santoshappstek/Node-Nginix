import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js'; //ContentState
import draftToHtml from 'draftjs-to-html';
import swal from 'sweetalert';
import { Input, Button } from 'antd'; //notification
import { connect } from 'react-redux';
import { SendMessageInput, sendMessageForm, ToUsersListData } from '../../Store/messages/sendMessageAction';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MessStyle.css';
import 'antd/dist/antd.css';
import SimpleReactValidator from 'simple-react-validator';
import HttpService from '../../Services/HttpService'
import Autosuggest from 'react-autosuggest';
import { stateFromHTML } from 'draft-js-import-html';
import { RecievedMessages, sentMessages, draftMessages, trashMessages, deleteMessageService, viewMessagedata } from '../../Store/messages/allMessageAction';

const styles = {
  editor: {
    border: '0.5px solid lightgray',
    minHeight: '15em',
    left: '2935px',
    padding: "10px"
  }
};

class DraftNewMessage extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    var contentState = stateFromHTML(this.props.data.item.body);

    this.state = {
      editorState: EditorState.createWithContent(contentState),
      Uid: '',
      sender_id: "",
      email: "",
      subject: "",
      body: "",
      attachments: [],
      suggetionsdata: [],
      value: '',
      suggestions: [],
      display_name: ''
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
    return this.state.suggetionsdata;
  };

  // Trigger suggestions
  getSuggestionValue = suggestion => suggestion.first_name + " " + suggestion.last_name

  // Render Each Option
  renderSuggestion = suggestion => (
    <div className="sugg-option">
      <h8><b>{suggestion.first_name + " " + suggestion.last_name}</b></h8>
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
    this.setState({ email: suggestion.email })

  }
  onEditorStateChange = (editorState) => {
    const currentContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    this.setState({
      editorState,
    });
  };

  handleChange = (e, key) => {
    const { Uid } = this.state
    let eventInput = {
      key: key,
      value: e.currentTarget.value
    }
    if (e.currentTarget.value === 'name') {
      this.setState({
        email: e.currentTarget.value
      })
    }
    else {
      this.setState({ subject: e.currentTarget.value })
    }
  }

  componentDidMount() {
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));
    var user_id = this.currentuser.user_id;
    this.setState({ Uid: user_id });
    if (this.props.data != null) {
      this.setState({
        message_id: this.props.data.item.message_id,
        email: this.props.data.item.email,
        display_name: this.props.data.item.first_name + " " + this.props.data.item.last_name,
        subject: this.props.data.item.subject,
        body: this.props.data.item.body
      })

    }
    else {
      this.state.message_id = ''
      this.state.email = ''
      this.state.subject = ''
      this.state.body = ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.item.message_id !== prevProps.data.item.message_id) {
      this.setState({
        message_id: this.props.data.item.message_id,
        email: this.props.data.item.email,
        display_name: this.props.data.item.first_name + " " + this.props.data.item.last_name,
        subject: this.props.data.item.subject,
        body: this.props.data.item.body
      })

      // this.setState({
      //   spinner: true
      // })
      // this.currentuser = JSON.parse(localStorage.getItem('userdata'));
      // var user_id = this.currentuser.user_id;
      // var message_id = this.props.messageId;
      // this.props.viewMessagedata({ message_id,user_id });
    }
    else {
    }
  }
  sendMail = () => {
    const { to, from, subject, key, text } = this.state;
    const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

    //e.preventDefault();
    const { sendMessage } = this.props
    const { Uid } = this.state

    if (this.validator.allValid()) {
      if (this.props.data != null) {
        var data = {
          message_id: this.state.message_id,
          sender_id: Uid,
          email: this.state.email,
          subject: this.state.subject,
          body: html,
          message_type: 'sent'
        }
      }
      else {
        var data = {
          sender_id: Uid,
          email: this.state.email,
          subject: this.state.subject,
          body: html,
          message_type: 'sent'
        }
      }
      // this.props.sendMessageForm(data);
      HttpService.sendmessage(data)
        .then(response => {
          console.log('response', response);
          if (response.data.status === 200) {
            swal({
              title: response.data.message,
              icon: "success"
            });
            this.props.draftMessages();

            this.props.quitScreen();
            this.setState({
              email: "",
              subject: "",
              body: "",
              attachments: []
            });
            this.validator.hideMessages();
            //this.messageform.reset(); 
          }
          else {
            swal({
              title: "Something went wrong,Please try again.",
              icon: "error"
            });
            this.validator.hideMessages();
          }
          // dispatch(SendMessageTo(response))
        })
        .catch(error => {
          swal({
            title: "Something went wrong,Please try again.",
            icon: "error"
          });
          //dispatch(SendError)
        })
    }
    else {
      this.validator.showMessages();
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log("component:- ",nextProps.sendMessage.sendMessage_res.status==200)  
  }

  render() {
    //const { editorState } = this.state;
    const { selectedOption } = this.state;
    const { value, suggestions } = this.state;
    // Option props
    const inputProps = {
      placeholder: 'To:',
      value: this.state.display_name,
      onChange: this.onChange,
      style: { width: "100%", height: "46px" },
    };
    return (
      <div >
        <div style={{ marginBottom: "10px" }}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={(ev) => this.onSuggestionsFetchRequested(ev, "email")}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
            onSuggestionSelected={this.onSuggestionSelected}
          />
          <span className="text-danger">{this.validator.message("email", this.state.email, "required")}</span>
        </div>
        <Input
          className="form-control"
          placeholder="Subject"
          value={this.state.subject}
          onChange={(ev) => { this.handleChange(ev, "subject") }}
        />
        <div className="m-10"
          style={styles.editor}
          onClick={this.focusEditor}>
          <Editor
            editorState={this.state.editorState}
            placeholder=" Write Something... "
            //value = {this.state.body && <div dangerouslySetInnerHTML={{ __html: this.state.body }} />}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
          // onEditorStateChange={(ev)=> this.handleChange(ev,"body")}
          />
        </div>
        <button style={{ float: 'right', marginBottom: '20px' }} className="btn btn-info btn-success mt-4" onClick={() => this.sendMail()}>Send</button>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    sendMessage: state.sendMessage
  }
}

export default connect(mapStateToProps, { sendMessageForm, SendMessageInput, ToUsersListData,draftMessages })(DraftNewMessage);
