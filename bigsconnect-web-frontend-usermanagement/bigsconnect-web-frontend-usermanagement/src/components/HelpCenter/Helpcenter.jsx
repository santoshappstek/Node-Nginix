import React, { Component } from 'react';
//import '../../assets/css/style.css';
import ReactFormInputValidation from "react-form-input-validation";

class Helpcenter extends Component {
    constructor(props) {
        super(props)

    }
    getStarted = () => {
        this.props.history.push({
            pathname: '/dashboard/help_center/getting_started'
        })
    }


    render() {
        return (
            <div className="container">
                <div className="head">
                    <div className="col-md-6">
                        <div className="row mt-3 mb-4">
                            <div className="horizontal-container">
                                <h3 className="pagename mb-3">Help Center</h3>
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
                <div>
                    <div className="box">
                        <div class="row">

                            <div class="col-sm-3">
                                <h4 className="helphead">Get Started</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <a><h6  onClick={() => this.getStarted()} className='helpshowall'>Show all</h6></a>
                                </ul>
                            </div>

                            <div class="col-sm-3">
                                <h4 className="helphead">Getting to know Your Dashboard</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>

                            <div class="col-sm-3">
                                <h4 className="helphead">User Management </h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>

                            <div class="col-sm-3">
                                <h4 className="helphead">Activities</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>

                            <div style={{ height: '200px' }}></div>

                            <div class="col-sm-3">
                                <h4 className="helphead">Resources</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>

                            <div class="col-sm-3">
                                <h4 className="helphead">Events</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>

                            <div class="col-sm-3">
                                <h4 className="helphead">Messaging  Notifications</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>

                            <div class="col-sm-3">
                                <h4 className="helphead">Discount Programs</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>

                            <div style={{ height: '200px' }}></div>

                            <div class="col-sm-3">
                                <h4 className="helphead">Photo Gallery</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>
                            <div class="col-sm-3">

                                <h4 className="helphead">Account  Settings</h4>
                                <ul >
                                    <li className="helpcenterlist" >What is BIGS Connect</li>
                                    <li className="helpcenterlist">How to Begin</li>
                                    <li className="helpcenterlist" >Navigation Basics</li>
                                    <h6 className='helpshowall'>Show all</h6>
                                </ul>
                            </div>
                            <div class="col-sm-3">
                                <h4 className="helphead">Contact Support</h4>
                                <ul >
                                    <li className="helpcenterlist" >Call us: (800) 123-4567</li>
                                    <li className="helpcenterlist">Email us: <u style={{color:'#3B86FF'}}>support@bigsconnect.com</u> </li>
                                    <li className="helpcenterlist" >Chat with us: <u style={{color:'#3B86FF'}}>Chat Now</u> </li>
                                </ul>
                            </div>
                            <div style={{ height: '200px' }}></div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Helpcenter;