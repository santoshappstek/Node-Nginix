import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userdetailsData, userdeleteaction, passwordResetMail, ProfilePicUploadform } from '../../Store/userprofile/userdetailsaction';
import swal from 'sweetalert';

import * as moment from 'moment';

class AccountView extends Component {
    constructor() {
        super();
        this.state = {
            user_id: '',
            userdetails: '',
            picture: null,
            imagePreviewUrl: '',
            user_type: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('view next:- ',nextProps)
        console.log('view props:- ',this.props)
        if (this.props.userDetails.userdetails_res.user_details !== nextProps.userDetails.userdetails_res.user_details) {
            this.setState({
                userdetails: nextProps.userDetails.userdetails_res.user_details
            })
        }
        if (this.props.userInfo.userInfo_res.user_update !== nextProps.userInfo.userInfo_res.user_update) {
            this.setState({
                userdetails: nextProps.userInfo.userInfo_res.user_update
            })
        }

        if (this.props.accountSettings.userTypeName !== nextProps.accountSettings.userTypeName) {
            this.setState({
                user_type: nextProps.accountSettings.userTypeName.usertype_name.user_type
            })
            this.props.accountSettings.userTypeName = ''
        }
        if (this.props.userDetails.userdetails_res !== nextProps.userDetails.userdetails_res) {
            this.setState({
                user_type: nextProps.userDetails.userdetails_res.user_details.user_type
            })
        }
    }

    changePicture(e) {
        this.setState({
            imagePreviewUrl: URL.createObjectURL(e.target.files[0]),
            picture: e.target.files[0],
        }, () => this.handleImageUpload());
    };

    handleImageUpload(e) {
        var data = new FormData();
        data.append('user_id', this.state.userdetails.user_id);
        data.append('profile_pic', this.state.picture);
        this.props.ProfilePicUploadform(data);
        swal({
            title: "Profice picture updated Successfully",
            icon: "success"
        })       
    }

    onDeleteuser(user_id) {
        swal({
            title: "Delete User Account",
            text: "Are you sure you want to delete this\n user account?",
            buttons: ["No, Cancel", "Yes, Delete"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var user = {
                        user_id: this.state.userdetails.user_id,
                        action_type: "deleteuser"
                    };
                    this.props.userdeleteaction(user);
                    swal({
                        title: "User Deleted Successfully",
                        icon: "success"
                    })
                    this.setState({
                        spinner: false
                    });
                }
            });
    }

    onDeactivateuser(user_id) {
        swal({
            title: "Deactivate User Account",
            text: "Are you sure you want to deactivate this\n user account?",
            buttons: ["No, Cancel", "Yes, Deactivate"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var user = {
                        user_id: this.state.userdetails.user_id,
                        action_type: "deactivateuser"
                    };
                    this.props.userdeleteaction(user);
                    swal({
                        title: "User Deactivated Successfully",
                        icon: "success"
                    })
                    this.setState({
                        spinner: false
                    });
                }
            });
    }


    sendPassword(email) {
        swal({
            title: "Are you sure?",
            text: "You want to reset password.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var email = {
                        email: email,
                    };
                    this.props.passwordResetMail(email);
                    swal({
                        title: "Password Reset link sent to your mail Successfully",
                        icon: "success"
                    })
                    this.setState({
                        spinner: false
                    });
                }
            });
    }
    componentDidMount() {
    }

    handleSubmit(){
        swal({
            icon:'success',
            title:'Invitation link has been sent to email'})
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img for="photo-upload" className="img-circle elevation-2" src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<img for="photo-upload" className="img-circle elevation-2" src={this.state.userdetails.profile_pic} />);
        }
        return (
            <div className="col-md-4 col-lg-3">
                <div className="useracount-sec">
                    <div style={{ marginTop: '50px' }}>
                        {$imagePreview}
                        {/* <img for="photo-upload" className="img-circle elevation-2" src={this.state.file}/> */}
                        <div>
                            <label htmlFor="photo-upload" className="useredit-icon">
                                <span className="camera-icon"><i class="fas fa-camera"></i></span>
                                <input id="photo-upload" style={{ display: 'none' }} type="file" onChange={(e) => this.changePicture(e, 'picture')} />
                            </label>
                        </div>
                        <div style={{ marginBottom: '20px', marginTop: '-30px', wordBreak: 'break-all', marginLeft: '10px', marginRight: '10px' }}>
                            <h4 style={{ color: '#4D4F5C' }} className="mb-0 border-0 fontbold" key={this.state.userdetails.user_id}>{this.state.userdetails.display_name}</h4>
                            <h8 style={{ fontSize: '14px', color: 'gray' }}>{this.state.user_type}</h8>
                        </div>
                        <hr className="hr-gray" />
                        {this.state.userdetails.lastapp_activity !== null ||this.state.userdetails.lastapp_activity=='undefined' ?
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                    <h8 style={{ width: '50%', display: 'flex', marginLeft: '10px' }}>Active Since </h8>
                                    {this.state.userdetails.active_since !== null ? <h8 style={{ width: '50%' }} className="text-green"> {moment(this.state.userdetails.active_since).format('MM/DD/YYYY')}</h8> : <h8 style={{ width: '50%', float: 'right' }} className="text-green">-</h8>}
                                </div>
                                <hr className="hr-gray" />
                                <div style={{ display: 'flex', margin: '10px' }}>
                                    <h8 style={{ width: '50%', display: 'flex', marginLeft: '10px' }}>Last App Activity</h8>
                                    {this.state.userdetails.lastapp_activity !== null ? <h8 style={{ width: '50%' }} className="text-green"> {moment(this.state.userdetails.lastapp_activity).format('MM/DD/YYYY')}</h8> : <h8 style={{ width: '50%', float: 'right' }} className="text-green">-</h8>}
                                </div>
                                <hr className="hr-gray" />
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                    <h8 style={{ width: '50%', display: 'flex', marginLeft: '10px' }}>Activities Completed </h8>
                                    <h8 style={{ width: '50%' }} className="text-green">2</h8>
                                </div>
                                <hr className="hr-gray" />
                                <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                                    <h8 style={{ width: '50%', display: 'flex', marginLeft: '10px' }}>Events Attended </h8>
                                    <h8 style={{ width: '50%' }} className="text-green">0</h8>
                                </div>
                                <hr className="hr-gray" />
                                <div style={{ marginTop: '10px', marginBottom: '10px' }} className="userdatabtn-sec">
                                    <a onClick={() => this.sendPassword(this.state.userdetails.email)}
                                        className="btn-user-data mb-3">
                                        Send Password Reset Email</a>

                                     {this.state.userdetails.usertype_id==1 ||
                                     this.state.userdetails.usertype_id==2||
                                     this.state.userdetails.usertype_id==3 ||this.state.userdetails.usertype_id==undefined? 
                                     <div>
                                    <a onClick={() => this.onDeactivateuser(this.state.userdetails.user_id)}
                                        className="btn-user-data text-red deleteuserline mb-3"
                                        data-toggle="popover">
                                        Deactivate User Account</a>

                                    <a onClick={() => this.onDeleteuser(this.state.userdetails.user_id)}
                                        className="btn-user-data text-red deleteuserline mb-3"
                                        data-toggle="popover"
                                        title="Popover Delete"
                                        data-content="Some content inside the popover">
                                        Delete User Account</a>
                                        </div>:null}
                                </div>
                            </div>:
                            <div>
                                <h4 style={{ color: '#43425d', fontSize: '15px', marginTop: '34px' }} className="mb-0 border-0 fontbold"  >User Invitation Pending</h4>
                                <p style={{ marginLeft: '28px', marginRight: '28px', textAlign: 'center', color: '#4d4f5c', fontSize: '13px', fontFamily: 'Source Sans Pro', marginTop: '15px' }}>
                                    An invitation has been sent to this user<br></br>but has not been accepted. Click below to<br></br>resend the account invitation email.</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }} className="form-group mt-4">
                                    <input
                                        type="button"
                                        className="btn btn-info btn-resend mt-1"                                       
                                        value="Resend Invite"
                                        onClick={this.handleSubmit}
                                    />
                                </div>
                                <hr style={{ marginTop: '31px' }} className="hr-gray" />
                                <div style={{ marginTop: '10px', marginBottom: '10px' }} className="userdatabtn-sec">
                                    <a onClick={() => this.onDeleteuser(this.state.userdetails.user_id)}
                                        className="btn-user-data text-red deleteuserline mb-3"
                                        data-toggle="popover"
                                        title="Popover Delete"
                                        data-content="Some content inside the popover">
                                        Delete User Account</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
        userInfo: state.userInfo,
        accountSettings: state.accountSettings
    }
}

export default connect(mapStateToProps, { userdetailsData, userdeleteaction, passwordResetMail, ProfilePicUploadform })(AccountView)
