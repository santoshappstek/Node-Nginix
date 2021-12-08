import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SendMessageInput,sendMessageForm } from '../../Store/messages/sendMessageAction';


class NewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          from: "",
          to: "",
          subject: "",
          key: "",
          text:""
        };
      }

      handleChange = (e, key) => {
        const { Uid } = this.state
        let eventInput = {
            key: key,
            value: e.currentTarget.value
        }
        this.props.SendMessageInput(eventInput);
        //console.log("User input:- ",inputdata)  
      }    
    
    // onInbox = () =>{
    //     this.props.history.push({
    //         pathname: '/dashboard/messages/inbox'
    //        })
    // }

    // onSent = () =>{
    //     this.props.history.push({
    //         pathname: '/dashboard/messages/sent'
    //        })
    // }

    // onTrash = () =>{
    //     this.props.history.push({
    //         pathname: '/dashboard/messages/trash'
    //        })
    // }

    componentDidMount(){
        this.currentuser = JSON.parse(localStorage.getItem('userdata'));
        var user_id = this.currentuser.user_id;
        this.setState({ Uid: user_id });
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
    };
    
    onToChange = (e) => {
        this.setState({
          to: e.target.value
        });
    }    
    
    onFromChange = (e) => {
        this.setState({
          from: e.target.value
        })
    }
    
    onSubjectChange = (e) => {
        this.setState({
          subject: e.target.value
        })
    }
    
    onKeyChange = (e) => {
        this.setState({
          key: e.target.value
        })
    }    
      
    onTextChange = (e) => {
        this.setState({
          text: e.target.value
        })
    } 
    
    sendMail = () => {
        //const { to, from, subject, key,text } = this.state;
        //e.preventDefault();
        const { sendMessage } = this.props
        const { Uid } = this.state
    
        var data = {
          sender_id: Uid,
          email: sendMessage.sendMessageDetails.email,
          subject: sendMessage.sendMessageDetails.subject,
          attachments : sendMessage.sendMessageDetails.attachments,
          body: sendMessage.sendMessageDetails.body              
        }
        this.props.sendMessageForm(data)
        //console.log("message data:- ",data)
      }

  render() {
    return(
        <div className="container">
                <section className="">
                	<div className="row">               		
                			<div className="mail-compose-sec">
                				<div className="form-group">
                					<input type="text" className="form-control" placeholder="To" name="to" onChange={(e) => { this.handleChange(e,"email") }} />
                				</div>
                				<div className="form-group">
                					<input type="text" className="form-control" placeholder="Subject" name="subject" onChange={(e) => { this.handleChange(e,"subject") }}/>
                				</div>
                        <div classNameName="m-10">
                            <input type="text" className="form-control" placeholder="Body" name="body" onChange={(e) => { this.handleChange(e,"body") }}/>      
                        </div>                                             
       
            				    <div className="send-button ">
    		             			<button type="button" className="btn btn-success" onClick={() => this.sendMail()}>Send</button>
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
        sendMessage: state.sendMessage
    }
  }
  
export default connect(mapStateToProps, { sendMessageForm, SendMessageInput})(NewMessage);