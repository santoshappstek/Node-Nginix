import React, { Component } from 'react';
import { connect } from 'react-redux';
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';
import { getActiveUsers, getAgencyUsers, getBigsUsers, getInActiveUsers,getOrganiseUsers } from '../../Store/UserManagement/userManagementAction';
import { userdetailsData, userdeleteaction, useractivateaction } from '../../Store/userprofile/userdetailsaction';
import ReactPagenate from 'react-paginate'
import '../../App.css';
import { Button, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import HttpService from '../../Services/HttpService'


class UserManagement extends Component {
    constructor(props) {
        super();
        this.state = {
            userType: 'ActiveUsers',
            currentPage: 1,
            startCount: 0,
            endCount: 8,
            offset: 0,
            perPage: 8,
            currentPage: 0,
            filterUsers: [],
            slice: [],
            spinner: true,
            users: [],
            deleteSuccessData: "",
            userTypeToDelete: '',
            SearchList: [],
            searchInput: '',
            DefaultMessage: '',
            token:'',
            chapter_id:'',
            usertypeid:''

        }
    }
    listUser = (event, userType) => {
        this.state.userTypeToDelete = userType

        var data ={
            chapter_id:this.state.chapter_id
        }
        if (userType === 'ActiveUsers') {
            this.setState({
                users:[]
            })
            this.state.searchInput = ""
            this.clearSearchText.value = ""
            this.props.getActiveUsers(data);
            this.setState({ activeId: 'active' });
        } else if (userType === 'AgencyUsers') {
            this.setState({
                users:[]
            })
            this.state.searchInput = ""
            this.clearSearchText.value = ""
            this.props.getAgencyUsers(data);
            this.setState({ activeId: 'active' });
        } else if (userType === "BigSUsers") {
            this.setState({
                users:[]
            })
            this.state.searchInput = ""
            this.clearSearchText.value = ""
            this.props.getBigsUsers(data);
            this.setState({ activeId: 'active' });
        } else if (userType === "InactiveUsers") {
            this.setState({
                users:[]
            })
            this.state.searchInput = ""
            this.clearSearchText.value = ""
            this.props.getInActiveUsers(data);
            this.setState({ activeId: 'active' });
        }
        
        else if(userType === "OrganizationUser"){
            this.setState({
                users:[]
            })
           // this.state.users = ""
            this.state.searchInput = ""
            this.clearSearchText.value = ""
            this.props.getOrganiseUsers();
            this.setState({ activeId: 'organise' });
        }
        this.setState({
            userType: userType,
            startCount: 0,
            endCount: 8,
            spinner: !this.state.spinner
        })
    }
    handleClick(event, number) {
        this.setState({
            startCount: number * 8 - 8,
            endCount: number * 8
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log("selectedPage:- ", selectedPage)
        const offset = selectedPage * this.state.perPage;
        console.log("offset 1 :- ", offset)

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        })
    };
    componentDidMount() {
    var data ={
        chapter_id:this.state.chapter_id
    }
        this.state.userTypeToDelete = "ActiveUsers"
        this.props.getActiveUsers(data);
    }
    componentWillReceiveProps(nextProps) {
        this.state.users = nextProps.userManagementDetails.data
        console.log('user management:- ',nextProps)
        this.setState({
            spinner: false,
            users: nextProps.userManagementDetails.data
        })
        if (nextProps.userManagementDetails.data.length === 0) {
            this.setState({
                spinner: false,
                DefaultMessage: "No Users Found."
            })
        }
        else {
            this.state.users = nextProps.userManagementDetails.data
            this.state.filterUsers = this.props.userManagementDetails.data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = this.state.filterUsers.map(pd => <React.Fragment>
            </React.Fragment>)
            this.setState({
                spinner: false,
                pageCount: Math.ceil(this.state.users.length / this.state.perPage),
                postData
            })
        }

    }

    onnewUser() {
        this.props.history.push({
            pathname: '/dashboard/user_management/new_user_management'
        })
    }
    onUser(item) {
        this.props.history.push({
            pathname: '/dashboard/user_management/user_data',
            state: { detail: item }
        })
    }
    onDeleteuser(user_id, usertype) {
        swal({
            title: "Delete User Account",
            text: "Are you sure you want to delete this\n user account?",          
            buttons: ["No, Cancel", "Yes, Delete"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var user = {
                        user_id: user_id,
                        action_type: "deleteuser"
                    };                    
                    this.state.spinner = true
                    HttpService.deleteuser(user)
                        .then(response => {
                            this.state.deleteSuccessData = response.data
                            if (this.state.deleteSuccessData.status === 200) {
                                var data = {
                                    chapter_id:this.state.chapter_id
                                }
                                swal({
                                    title:this.state.deleteSuccessData.message, 
                                    icon: "success"
                                });

                                if (this.state.userTypeToDelete === 'ActiveUsers') {
                                    this.state.users = ""
                                    this.props.getActiveUsers(data);
                                    this.setState({ activeId: 'active' });
                                } else if (this.state.userTypeToDelete === 'AgencyUsers') {
                                    this.state.users = ""
                                    this.props.getAgencyUsers(data);
                                    this.setState({ activeId: 'active' });
                                } else if (this.state.userTypeToDelete === "BigSUsers") {
                                    this.state.users = ""
                                    this.props.getBigsUsers(DataTransferItem);
                                    this.setState({ activeId: 'active' });
                                } else if (this.state.userTypeToDelete === "InactiveUsers") {
                                    this.state.users = ""
                                    this.props.getInActiveUsers(data);
                                    this.setState({ activeId: 'active' });
                                }
                                else if (this.state.userTypeToDelete === "OrganizationUser") {
                                    this.state.users = ""
                                    this.props.getOrganiseUsers();
                                    this.setState({ activeId: 'active' });
                                }
                            }
                            else {
                                swal("Something went wrong, Please try again after sometime.");
                            }

                        })
                        .catch(error => {
                            swal("Something went wrong, Please try again after sometime.");
                        })
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
                        user_id: user_id,
                        action_type: "deactivateuser"
                    };

                 
                    HttpService.deleteuser(user)
                        .then(response => {
                            this.state.deleteSuccessData = response.data
                            if (this.state.deleteSuccessData.status === 200) {
                                var data ={
                                    chapter_id:this.state.chapter_id
                                }
                                swal({
                                    title:this.state.deleteSuccessData.message,
                                    icon: "success"});
                                this.state.users = ""
                                if (this.state.userTypeToDelete === 'ActiveUsers') {
                                    this.state.users = ""
                                    this.props.getActiveUsers(data);
                                    this.setState({ activeId: 'active' });
                                } else if (this.state.userTypeToDelete === 'AgencyUsers') {
                                    this.state.users = ""
                                    this.props.getAgencyUsers(data);
                                    this.setState({ activeId: 'active' });
                                } else if (this.state.userTypeToDelete === "BigSUsers") {
                                    this.state.users = ""
                                    this.props.getBigsUsers(DataTransferItem);
                                    this.setState({ activeId: 'active' });
                                } else if (this.state.userTypeToDelete === "InactiveUsers") {
                                    this.state.users = ""
                                    this.props.getInActiveUsers(data);
                                    this.setState({ activeId: 'active' });
                                }
                                else if (this.state.userTypeToDelete === "OrganizationUser") {
                                    this.state.users = ""
                                    this.props.getOrganiseUsers();
                                    this.setState({ activeId: 'active' });
                                }
                               
                                this.setState({
                                    spinner: false,
                                });
                            }
                            else {
                                swal("Something went wrong, Please try again after sometime.");
                            }

                        })
                        .catch(error => {
                            swal("Something went wrong, Please try again after sometime.");
                        })
                    this.setState({
                        spinner: false
                    });
                }
            });
    }

    onActivateuser(user_id) {
        swal({
            title: "Activate User Account",
            text: "Are you sure you want to Activate this\n user account?",           
            buttons: ["No, Cancel", "Yes, Activate"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    var user = {
                        user_id: user_id,
                        action_type: "activateuser"
                    };

                  
                    HttpService.activateuser(user)
                        .then(response => {
                            this.state.deleteSuccessData = response.data
                            if (this.state.deleteSuccessData.status === 200) {
                                var data ={
                                    chapter_id:this.state.chapter_id
                                }
                                swal({
                                    title:this.state.deleteSuccessData.message,
                                    icon: "success"});
                                this.state.users = ""
                                this.props.getInActiveUsers(data);
                                this.setState({
                                    spinner: false,
                                });
                            }
                            else {
                                this.setState({
                                    spinner: false,
                                });
                                swal("Something went wrong, Please try again after sometime.");
                            }

                        })
                        .catch(error => {
                            this.setState({
                                spinner: false,
                            });
                            swal("Something went wrong, Please try again after sometime.");
                        })
                   
                }
            });
    }
    receivedData() {
        this.state.slice = this.props.userManagementDetails.data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = this.state.slice.map(pd => <React.Fragment>
            <img src={pd.thumbnailUrl} alt="" />
        </React.Fragment>)
        this.setState({
            pageCount: Math.ceil(this.props.userManagementDetails.data.length / this.state.perPage),
            postData
        },)
    }

    searchHandler = (event) => {
        if (event.target.value.length === 0) {
            var data ={
                chapter_id:this.state.chapter_id
            }
            this.props.getActiveUsers(data);
            this.setState({ spinner: !this.state.spinner, SearchList: [], searchInput: '' ,DefaultMessage:''})
        }
        else {
            let searcjQery = event.target.value,
                displayedUserManagement = this.state.users.filter((el) => {
                    let searchValue = el.display_name;
                    if (searchValue != null) {
                        return searchValue.toString().toLowerCase().indexOf(searcjQery.toLowerCase()) !== -1;
                    }
                })
            if (displayedUserManagement.length > 0) {              
                this.setState({ DefaultMessage: '', SearchList: displayedUserManagement, pageCount: Math.ceil(displayedUserManagement.length / this.state.perPage), searchInput: event.target.value })
            }
            else {  
                this.setState({ users:[], SearchList: [], DefaultMessage: 'No Users Found',searchInput:'' })            
            }        
        }
    }


    render() {

        localStorage.setItem("activescreen", JSON.stringify('usermanagmentlist'));
        this.currentuser = JSON.parse(localStorage.getItem('userdata'));
        var user_id = this.currentuser.user.user_id;
        if(JSON.parse(localStorage.getItem('chapter_id'))!=null){
           this.state.chapter_id = JSON.parse(localStorage.getItem('chapter_id'))
        }
        if (this.state.users.length > 0) {
            this.state.spinner = false
            return (
                <div className="container">
                    <div style={{marginRight:'-25px'}}className="usermanagement-header">
                        <div className="row mt-3 mb-0">
                            <div className="col-12 col-sm-5 d-flex align-items-center">
                                <h3 className="pagename">User Management</h3>
                            </div>

                            <div className="col-12 col-sm-7">
                                <div className="row">
                                    <div className="col-12 col-lg-6 offset-lg-2">
                                        <div>
                                            <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                                            <input style={{ paddingLeft: '40px' }} type="text" ref={ref => this.clearSearchText = ref} className="form-control" placeholder="Search Name..." onChange={(e) => this.searchHandler(e)} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewUser()}>New User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft:'-20px'}}className="userManagement-page">
                        <div style={{marginLeft:'10px'}} className="tabs-sec">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" onClick={(event) => { this.listUser(event, 'ActiveUsers') }} href="#">Active Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'AgencyUsers') }} href="#">Agency Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'BigSUsers') }} href="#">Bigs Users</a>
                                </li>
                                {user_id==5?
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'OrganizationUser') }} href="#">Organization Users</a>
                                </li>:null}
                               
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'InactiveUsers') }} href="#">Inactive Users</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="App">
                            {this.state.spinner && <Spinner
                                animation="border"
                                role="status" >
                                <span className="sr-only">Loading...</span>
                            </Spinner>}

                        </div>

                        {
                            this.state.searchInput.length ? this.state.SearchList.length ? this.state.SearchList?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                              
                                <div className="col-md-6" key={item.user_id}>
                                    <div className="user-details">
                                        <div className="media border p-3 media-sec">
                                            <img src={item.profile_pic} className="mr-3 mt-3 rounded-circle" width="70px" height="70px" onClick={() => this.onUser(item)} />
                                            <div className="media-body" style={{marginLeft:'10px'}}>
                                                <h4 className="media-heading">
                                                    {item.display_name}
                                                    {item.usertypeid==4? null:<div className="float-right">
                                                       {item.active_status==0?<span className="pr-2" onClick={() => this.onDeactivateuser(item.user_id)}><LockIcon /></span>:
                                                        <span style={{color:'#ff6565'}} className="pr-2" onClick={() => this.onActivateuser(item.user_id)}><LockIcon /></span>
                                                        }
                                                        
                                                        <span onClick={() => this.onDeleteuser(item.user_id, item.user_type)}><CloseIcon /></span>
                                                       
                                                    </div>}
                                                </h4>

                                                <h8 className="mediatext" style={{display:'block',color:'#a1a0ae'}}>User Type: {item.user_type}</h8>
                                                <h8 className="mediatext" style={{display:'block',color:'#a1a0ae'}}>Mobile: {item.phone_number}</h8>
                                                <h8 className="mediatext" style={{display:'block',color:'#a1a0ae'}}>Email: {item.email}</h8>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )) : <div style={{ width: '100%' }}><h3 style={{ textAlign: 'center' }}>No Users Found.</h3></div> :
                                this.state.users ? this.state.users?.slice(this.state.offset, this.state.offset + this.state.perPage).map(item => (
                                   
                                    <div className="col-md-6" key={item.user_id}>
                                        <div className="user-details">
                                            <div className="media border p-3 media-sec">
                                                <img src={item.profile_pic} className="mr-3 mt-3 rounded-circle" width="70px" height="70px" onClick={() => this.onUser(item)} />
                                                <div style={{marginLeft:'10px'}} className="media-body">
                                                    <h4 className="media-heading">
                                                        {item.display_name}
                                                        {item.usertypeid==4 ? null : <div className="float-right">
                                                            {item.active_status==0?
                                                            <span className="pr-2" onClick={() => this.onDeactivateuser(item.user_id)}><LockIcon /></span>:
                                                            <span style={{color:'#ff6565'}} className="pr-2" onClick={() => this.onActivateuser(item.user_id)}><LockIcon /></span>
                                                        }
                                                            
                                                            <span style={{color:'#a4afb7'}} onClick={() => this.onDeleteuser(item.user_id, item.user_type)}><CloseIcon /></span>
                                                        </div>}
                                                    </h4>

                                                    <h8 style={{display:'block',color:'#a1a0ae'}} className="mediatext">User Type: {item.user_type}</h8>
                                                    <h8 style={{display:'block',color:'#a1a0ae'}} className="mediatext">Mobile: {item.phone_number}</h8>
                                                    <h8 style={{display:'block',color:'#a1a0ae'}} className="mediatext">Email: {item.email}</h8>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )) : <h3>No Users Found.</h3>

                        }

                        {!this.state.DefaultMessage ? <div className="col-md-12">
                            <div className="pagination">
                                {this.state.postData}
                                <ReactPagenate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={8}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>

                        </div> : null
                        }
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <div style={{marginRight:'-25px'}}className="usermanagement-header">
                        <div style={{marginRight:'0px'}} className="row mt-3 mb-0">
                            <div className="col-12 col-sm-6 d-flex align-items-center">
                                <h3 className="pagename">User Management</h3>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="row">
                                    <div className="col-12 col-lg-6 offset-lg-2">
                                        <div>
                                            <span style={{ position: 'absolute', padding: '15px', zIndex: '2', display: 'block', color: '#aaa' }} className="fa fa-search"></span>
                                            <input style={{ paddingLeft: '40px' }} type="text" ref={ref => this.clearSearchText = ref} className="form-control" placeholder="Search Name..." onChange={(e) => this.searchHandler(e)} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4">
                                        <button type="button" className="btn btn-info btn-success mt-1" onClick={() => this.onnewUser()}>New User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="userManagement-page">
                        <div className="tabs-sec">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" onClick={(event) => { this.listUser(event, 'ActiveUsers') }} href="#">Active Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'AgencyUsers') }} href="#">Agency Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'BigSUsers') }} href="#">Bigs Users</a>
                                </li>
                                {user_id==5?  <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'OrganizationUser') }} href="#">Organization Users</a>
                                </li>:null}
                              
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" onClick={(event) => { this.listUser(event, 'InactiveUsers') }} href="#">Inactive Users</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {this.state.spinner && <Spinner
                                animation="border"
                                role="status" >
                                <span className="sr-only">Loading...</span>
                            </Spinner>}

                        </div>
                        <div className="tabs-photgallery-sec">
                            <div className="mb-3 col-12 text-center">
                                <div className="table-responsive">
                                    <h1>{this.state.DefaultMessage}</h1>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }
}
export const mapStateToProps = (state) => {
    console.log(state.userManagementDetails)
    return {
        userManagementDetails: state.userManagementDetails
    }
}
export default connect(mapStateToProps, { 
    getActiveUsers, 
    getAgencyUsers, 
    getBigsUsers, 
    getInActiveUsers, 
    userdetailsData, 
    userdeleteaction, 
    useractivateaction,
    getOrganiseUsers })(UserManagement)


