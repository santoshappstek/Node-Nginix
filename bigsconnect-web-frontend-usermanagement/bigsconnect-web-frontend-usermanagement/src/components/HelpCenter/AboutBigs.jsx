import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import HttpService from '../../Services/HttpService';
import swal from 'sweetalert';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js'; //ContentState
import draftToHtml from 'draftjs-to-html';
class AboutBigs extends Component {
    constructor(props){
        super(props)
     //   var contentState = stateFromHTML(this.props.data.item.body);

        this.state={
            helpList:[],
            description:[]
        }

    }

    componentDidMount(){
        HttpService.helplistservice()
                    .then(response => {
                        console.log(' help list response', response);
                        if (response.data.status == 200) {
                            this.setState({
                                helpList: response.data.help_list
                            })
                           // this.state.helpList = response.data.help_list
                             console.log('help list:- ',this.state.helpList)
                            this.state.description= this.state.helpList?.map(data=>(
                                data.description
                           ))
                           console.log('description list:- ',this.state.description)

                                                     }

                        else {
                            swal({
                                icon: 'error',
                                text: response.data.error
                            })

                        }
                    })
                    

    }
    backToHelpCenter=()=>{
        this.props.history.push('/dashboard/help_center');
    }
    backToGettingStarted=()=>{
        this.props.history.push('/dashboard/help_center/getting_started');
    }
    render() {
        return (
            <div className="container">
                <div className="head">
                    <div className="col-md-6">
                        <div className="row mt-3 mb-4">
                            <div className="horizontal-container">
                                <h3 className="pagename mb-3 resources-text"  onClick={()=>this.backToHelpCenter()}>Help Center</h3>
                                <i style={{ color: "#43425d", padding: "10px", marginBottom: '5px' }} class="fa fa-chevron-right" aria-hidden="true"></i>

                                <div className="horizontal-container">
                                    <h3 className="pagename mb-3 resources-text" onClick={()=>this.backToGettingStarted()} >Getting Started</h3>
                                </div>
                            </div>
                            {/* <h3 className="pagename">Resources {'>'} New Resources</h3> */}
                        </div>
                    </div>
                   
                </div>
                <div >
                    <div className="box">
                    {this.state.helpList?.map(data=>(
                        <div dangerouslySetInnerHTML={{ __html: data.description }}></div>                          // console.log("des",data.description)
                       ))}
                       {console.log("des",'data.description')}
                        <div class="row">
                            <div >
                                <h4 className="helphead">What is BIGS Connect?</h4>
                               <h6 style={{margin:'25px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>
                            <div className="videoimage" style={{height:'130px',width:'200px',marginLeft:'25px'}}></div>
                         
                            </div>
                            <h6 style={{marginLeft:'25px',marginTop:'20px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>
                            <h6 style={{marginLeft:'25px',marginTop:'10px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>
                            <h6 style={{marginLeft:'25px',marginTop:'10px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h6>
                            <h6 style={{marginLeft:'25px',marginTop:'10px'}}>Last Updated 06/21/2020</h6>
                          
                      
                         
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default (withRouter(AboutBigs))