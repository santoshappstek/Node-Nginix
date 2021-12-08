import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class GettingStarted extends Component {
    constructor(props){
        super(props)
    }

    backToHelpCenter=()=>{
        this.props.history.push('/dashboard/help_center');
    }
    aboutbigs=()=>{
        this.props.history.push('/dashboard/help_center/aboutbigs');
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
                                    <h3 className="pagename mb-3">Getting Started</h3>
                                </div>
                            </div>
                            {/* <h3 className="pagename">Resources {'>'} New Resources</h3> */}
                        </div>
                    </div>
                    <div className="push">
                        <div >
                            <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                            <input style={{ paddingLeft: '40px' }} type="text" className="form-control" placeholder="Search for help on specific topics..." onChange={(e) => this.searchHandler(e)} />
                        </div>
                    </div>
                </div>
                <div >
                    <div className="box">
                        <div class="row">
                            <div class="col-sm-3">
                                <h4 className="helphead">Articles</h4>
                                <ul >
                                    <li style={{fontSize:'11px',fontWeight:'500',marginTop:'2px',marginLeft:'5px',marginBottom:'-15px'}} className="pagename mb-3 resources-text" onClick={()=>this.aboutbigs()} >What is BIGS Connect</li>
                                    <li style={{marginTop:'-8px'}} className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default (withRouter(GettingStarted))