import React, { Component } from 'react';
//import { render } from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js'; //ContentState
import draftToHtml from 'draftjs-to-html';
import { Input, Button } from 'antd'; //notification
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MessStyle.css';
import 'antd/dist/antd.css';

const styles = {
  editor: {
    border: '0.5px solid gray',
    minHeight: '15em',
    left:'2935px'
  }
};

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      from: "",
      to: "",
      subject: "",
      key: "",
      text:""
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onToChange = (ev) => {
    this.setState({
      to: ev.target.value
    });
  }


  onFromChange = (ev) => {
    this.setState({
      from: ev.target.value
    })
  }

  onSubjectChange = (ev) => {
    this.setState({
      subject: ev.target.value
    })
  }

  onKeyChange = (ev) => {
    this.setState({
      key: ev.target.value
    })
  }

  
  onTextChange = (ev) => {
    this.setState({
      text: ev.target.value
    })
  }



  sendMail = () => {
    const { to, from, subject, key,text } = this.state;
    const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  }


  render() {
    const { editorState } = this.state;

    return (
      <div className="main-box">
        <h2 className="pagename">
        Messaging : Compose Message
        </h2>
        
        <Input
          className="m-10 form-control"
          placeholder="To"
          onChange={(ev) => { this.onToChange(ev) }}
        />         
        
        <Input
          className="m-10 form-control"
          placeholder="Subject"
          onChange={(ev) => { this.onSubjectChange(ev) }}
        />
       
        <div className="m-10"
          style={styles.editor}
          onClick={this.focusEditor}>
          <Editor
            editorState={editorState}
            placeholder="Write Something"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>
        <button type="button" className="btn btn-info m-10" onClick={() => this.sendMail()}>Send</button>
      </div>
    );
  }
}

export default Messages;