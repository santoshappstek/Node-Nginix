import React, { Component } from 'react';
import '../../Signin.css';
import SwitchComp from "../../SwitchComp";
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import { getPermissions } from '../../Store/permissions/permissionsaction';
import { settingsInput, postsettingsForm, usertype } from '../../Store/accountsettings/accountsettingsaction';
import HttpService from '../../Services/HttpService'
import Switch from "react-switch";
import { getChapters } from '../../Store/chapters/chapterListAction'
import { Multiselect } from 'multiselect-react-dropdown';
import { userdetailsData,userdeleteaction,passwordResetMail,ProfilePicUploadform } from  '../../Store/userprofile/userdetailsaction';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      input: {},
      Uid: '',
      checked: false,
      permissions: [],
      user_permissions: [],
      user_type: '',
      addto_agency: false,
      case_manager: false,
      updateResponce: '',
      userDetails: '',
      addToAgencyValue: 0,
      caseManagerValue: 0,
      caseMangersData: [],
      casemanagerid: 0,
      selectedCaseManager: 0,
      user_id: '',
      hideCaseManager: false,
      chaptersList: [],
      bigsChapterSelected: [],
      selectedChapter: [],
      SelectedChapterNames: [],
      selectedChapterIds: [],
      chapter_ids: [],
      dataChapters: [],
      testarray: [],
      settings_Updated_Data:{},
      user_type_name:''

      // OnAddToAgency:false,
      //  OnCaseManger:false
    };
    this.handleChange = this.handleChange.bind(this);
    console.log('user details 1:- ',this.props.userDetails.userdetails_res)

    this.state.user_type = this.props.userDetails.userdetails_res.user_details.usertype_id
    if (this.state.user_type == 3) {
      this.state.user_type = 2
      this.props.userDetails.userdetails_res.permissions = []
      HttpService.caseManager()
        .then(response => {
          this.setState({
            caseMangersData: response.data.case_managers
          })
        })
        .catch(error => {
        })
    }
    if (this.props.userDetails.userdetails_res.user_details.usertype_id == 2) {
      this.props.userDetails.userdetails_res.permissions = []
      HttpService.caseManager()
        .then(response => {
          this.setState({
            caseMangersData: response.data.case_managers
          })
        })
        .catch(error => {
        })
    }
    this.state.user_permissions = this.props.userDetails.userdetails_res.permissions?.map(id => (
      id.permissionid
    ))
    this.state.bigsChapterSelected = this.props.userDetails.userdetails_res.chapters?.map(id => (
      id.chapterid
    ))
    console.log("this.state.bigsChapterSelected:- ",this.state.bigsChapterSelected)


    if (this.state.user_type == 1) {
      this.state.addToAgencyValue = this.props.userDetails.userdetails_res.user_details.addto_agency
      this.state.caseManagerValue = this.props.userDetails.userdetails_res.user_details.case_manager
    }
    else {
      this.state.addToAgencyValue = 0
      this.state.caseManagerValue = 0
    }
    this.state.casemanagerid = this.props.userDetails.userdetails_res.user_details.casemanagerid
    
    this.state.SelectedChapterNames = this.props.userDetails.userdetails_res.chapters?.map((name) => {
      return {
        chapter_name: name.chapter_name
      }
    })
    this.state.selectedChapterIds = this.props.userDetails.userdetails_res.chapters?.map((name) => {
      return {
        chapterid: name.chapterid
      }
    })

    if (this.state.addToAgencyValue == 1) {
      this.state.addto_agency = true
    }

    if (this.state.caseManagerValue == 1) {
      this.state.case_manager = true
    }
  }

  componentDidMount() {
    var user_id = this.props.userId;
    this.setState({ Uid: user_id });
    if (this.state.user_type == 1) {
      this.props.getPermissions();
    }

    //this.props.getChapters();
    HttpService.chapterslist()
      .then(response => {
        console.log("chapters responce:- ", response)
        this.setState({
          chaptersList: response.data.chapters_list
        })
        // this.state.chaptersList=response.data.chapters_list

        //dispatch(chaptersData(response.data));
      })
      .catch(error => {
        // dispatch(chapterserror());
      })
  }


  componentWillReceiveProps(nextProps) {
    console.log('user details 2:- ',nextProps.accountSettings)

    this.state.permissions = nextProps.permissionsList.permissions.permissions

  }

  componentDidUpdate(prevprops) {
    // this.state.user_permissions = this.props.userDetails.userdetails_res.permissions?.map(id=>(
    //   id.permissionid
    // ))
  }
  handleChange = (e, key) => {
    const { Uid } = this.state;

    // current array of options
    const user_permissions = this.state.user_permissions;
    let settingsInput
    let index
    if (key === 'user_type') {
      // this.setState({
      //   user_type : e.currentTarget.value
      // })
      this.state.user_type = e.currentTarget.value
      // this.props.userDetails.userdetails_res.user_details.usertype_id
      if (this.state.user_type == 1) {
        this.props.getPermissions();
      }
      if (this.state.user_type == 4) {
        this.state.hideCaseManager = true
      }
      else {
        this.state.permissions = []
        HttpService.caseManager()
          .then(response => {
            this.setState({
              caseMangersData: response.data.case_managers
            })
          })
          .catch(error => {
          })
      }
    }
    // check if the check box is checked or unchecked
    if (key == 'user_permissions') {
      if (e.target.checked) {
        // add the numerical value of the checkbox to options array
        user_permissions.push(+e.target.value)
      } else {
        // or remove the value from the unchecked checkbox from the array
        index = user_permissions.indexOf(+e.target.value)
        user_permissions.splice(index, 1)
      }
      this.state.user_permissions = user_permissions
      //   this.setState({ user_permissions: user_permissions })
      settingsInput = {
        key: key,
        value: this.state.user_permissions,
      }
      this.props.settingsInput(settingsInput);
    }
    if (key == "casemanager") {
      this.state.casemanagerid = e.currentTarget.value
    }
    if (key == 'bigsuserchapters') {

      this.state.bigsChapterSelected = [e.currentTarget.value]
      // this.setState({
      //   bigsChapterSelected:this.state.testarray
      // })

      //this.state.bigsChapterSelected = this.state.testarray

    }

    if (key == 'addto_agency') {
      if (this.state.addto_agency == true) {
        this.state.addto_agency = false
        this.state.addToAgencyValue = 0
      }
      else {
        this.state.OnAddToAgency = true
        this.state.addToAgencyValue = 1
      }
    }

    if (key === 'case_manager') {
      if (this.state.case_manager == true) {
        this.state.case_manager = false
        this.state.caseManagerValue = 0
      }
      else {
        this.state.case_manager = true
        this.state.caseManagerValue = 1
      }
    }
    else {
      settingsInput = {
        key: key,
        value: e.target.value,
      }
      this.props.settingsInput(settingsInput);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.validator.hideMessages();
      const { accountSettings } = this.props
      const { Uid } = this.state
      const { UP } = this.state
      if (this.state.user_type == 2) {
        this.state.user_permissions = []
        this.props.userDetails.userdetails_res.user_details.usertype_id = 2
      }
      else {
        this.props.userDetails.userdetails_res.user_details.usertype_id = 1
      }

      if (this.state.user_type == 2) {
        this.state.dataChapters = this.state.bigsChapterSelected
      }
      if (this.state.user_type == 1) {
        this.state.dataChapters = this.state.selectedChapterIds
      }
      var data = {
        user_type: this.state.user_type,
        user_permissions: this.state.user_permissions,
        user_id: this.props.userId,
        casemanagerid: this.state.casemanagerid,
        case_manager: this.state.caseManagerValue,
        addto_agency: this.state.addToAgencyValue,
        user_chapters: this.state.dataChapters

      };
    //  this.props.postsettingsForm(data);

      HttpService.accountsettings(data)
        .then(response => {
          
          if (response.data.status == 200) {
            var  user_id= this.props.userId

            this.props.userdetailsData({user_id});
            console.log('bigsChapterSelected:- ',this.state.bigsChapterSelected)
            this.state.settings_Updated_Data = response.config
            console.log('settings update:- ',response.config)
            swal({
              title: response.data.message,
              icon: "success"
            })
          }
          else {
            swal({
              title: response.data.message,
            })
          }
        })
        .catch(error => {
          swal({
            text: error.message,
            icon: "error"
          })
        })
      this.props.usertype(this.state.user_type);
      this.props.accountSettings.settingsin = {};
    }
    else {
      this.validator.showMessages();
    }
  };
  handleSwitchChange(checked) {
    this.setState({ checked })
  }
  onSelectItem = (selectedusers, ii) => {
    const user_ids = this.state.selectedChapterIds;

    if (user_ids == null) {
      this.state.selectedChapterIds = selectedusers.map(id => (
        id.chapter_id
      ))
    }
    else {
      user_ids.push(+ii.chapter_id)
      this.state.selectedChapterIds = user_ids
    }
  }
  onRemove = (removeusers, removeitem, yyy) => {
    const remove_user_ids = this.state.selectedChapterIds
    let index
    index = remove_user_ids.indexOf(-removeitem.chapter_id)
    remove_user_ids.splice(index, 1)
    this.state.selectedUserId = remove_user_ids
  }

  render() {
    this.currentuser = JSON.parse(localStorage.getItem('userdata'));

    this.state.usertypeid = this.currentuser.user.usertypeid
    console.log('user name:- ' ,this.props.userDetails.userdetails_res.user_details.user_type)
    this.state.user_type_name = this.props.userDetails.userdetails_res.user_details.user_type
    return (
      <div>
        <form ref={form => { this.form = form }} onSubmit={this.handleSubmit} >
          <div className="p-5">
            {/* <h4 className="pagename">Account Settings</h4> */}
            <div style={{ marginTop: '-40px' }} className="accountsettings-box">
              <div className="mb-3">
                <div style={{ marginBottom: '-5px' }} name="User type">
                  <label className="lehead">User Type *</label>
                </div>
                <div style={{ marginLeft: '-15px' }} className="custom-control custom-radio custom-control-inline">

                  <label style={{marginLeft:'-20px'}} className="checkbox-container" >{this.state.user_type_name}</label>
                </div>
                {/* <div style={{ marginLeft: '-15px' }} className="custom-control custom-radio custom-control-inline">
                  <input type="radio" className="radio" id="agency_user" name="user_type" value="1" checked={this.state.user_type == '1'}

                    onChange={(e) => this.handleChange(e, 'user_type')} />
                  <label className="custom-control-label" htmlFor="agency_user"> Agency User</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" className="radio" id="big_user" name="user_type" value="2" checked={this.state.user_type == '2'}
                    onChange={(e) => this.handleChange(e, 'user_type')} />
                  <label className="custom-control-label" htmlFor="big_user">Bigs User</label>
                </div>
                {this.state.usertypeid == 5 ? <div style={{ marginLeft: '10px' }} className="custom-control custom-radio custom-control-inline">
                  <input type="radio" className="radio" id="organization" name="user_type" value='4' checked={this.state.user_type == '4'}
                    onChange={(e) => { this.handleChange(e, 'user_type') }} />
                  <label className="custom-control-label" htmlFor="organization">Organization User</label>
                </div> : null} */}




                {/* {this.state.usertypeid == 1 || this.state.usertypeid == 4 ? <div className="custom-control custom-radio custom-control-inline">
                  <input type="radio" className="radio" id="big_user" name="user_type" value="2" checked={this.state.user_type == '2'}
                    onChange={(e) => this.handleChange(e, 'user_type')} />
                  <label className="custom-control-label" htmlFor="big_user">Bigs User</label>
                </div> : null} */}


                <span className="text-danger">{this.validator.message("user_type", this.state.user_type, "required")} </span>
              </div>
              {this.state.user_type == '1' ? <div className="mb-3">
                <label style={{ marginTop: '10px' }} className="lehead">User Permissions*</label>
                <div className="row">
                  {this.state.permissions?.map((x, i) => {
                    return (
                      <div className="usermgmt-checkbox accountsettings-checkbox pr-0 pl-1">
                        <label key={i} className="checkbox-container">
                          <input
                            type="checkbox"
                            className='checkbox'
                            name="user_permissions[]"
                            value={x.permission_id}

                            checked={this.state.user_permissions?.map(id => (
                              id
                            )).includes(x.permission_id)}
                            onChange={(e) => this.handleChange(e, 'user_permissions')}
                          />{" "}
                          <span class="checkmark"></span>
                          {x.permission_name}
                        </label>
                      </div>
                    );
                  })}
                  <span className="text-danger">{this.validator.message("user_permissions", this.state.user_permissions, "required")} </span>
                </div>
                <div className="row">
                  <div className="col-12 mb-5">
                    <label className="lehead">Chapters*</label>
                    <div >

                      <div style={{ marginLeft: '-15px' }} className="col-md-3 addadency-sec">
                        <div>
                          <Multiselect
                            placeholder="Select Chapters"
                            options={this.state.chaptersList}
                            displayValue={'chapter_name'}
                            onSelect={this.onSelectItem}
                            onRemove={this.onRemove}
                            selectedValues={this.state.SelectedChapterNames}
                            style={{
                              chips: {
                                border: 'none',
                                'border-radius': '15px',
                                //  background: 'white'
                              },
                              multiselectContainer: {
                                color: '#8f9199'
                              },
                              searchBox: {
                                border: 'none',
                                'border': '1px solid gray',
                                'border-radius': '5px',
                                'width': '200px'
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* <span style={{marginLeft:'15px',marginBottom:'10px',marginTop:'-10px'}} 
                className="text-danger">{this.validator.message("Chapters", this.state.selectedChapterIds, "required")}</span> */}

                </div>
                <div className="row my-3">
                  <div style={{ marginTop: '-10px' }} className="col-md-6 addadency-sec">
                    {/* <label className="lehead">Add to AgencyContacts: <i  title="Enabling this setting will display this agency user in the mobile app contacts list for BIGS to contact!" style={{ color: "#cecfd0", margin: "10px" }} class="fa fa-info-circle" aria-hidden="true"></i></label> */}
                    <label style={{ width: '60%' }} data-tooltip="Enabling this setting will display this   agency user in the mobile app contacts list for BIGS to contact!"
                      data-tooltip-location="right" className="lehead">Add to AgencyContacts: <i style={{ color: "#cecfd0", marginLeft: "10px" }} class="fa fa-info-circle" aria-hidden="true"></i></label>

                    <div>
                      <label>
                        <span>No</span>
                        <label class="switch">
                          <input type="checkbox"
                            defaultChecked={this.state.addto_agency}
                            onChange={(e) => this.handleChange(e, 'addto_agency')}
                          />
                          <span class="slider round"></span>
                        </label>
                        <span>Yes</span>
                      </label>
                    </div>
                    {/* <SwitchComp name="addto_agency" value="yes" onChange={(e) => this.handleChange(e, 'addto_agency')} /> */}
                  </div>
                </div>
                <div className="row my-3">
                  <div style={{ marginTop: '10px' }} className="col-md-6 addadency-sec">
                    <label className="lehead">Case Manager: </label>
                    <div>
                      <label>
                        <span>No</span>
                        <label class="switch">
                          <input type="checkbox"
                            onChange={(e) => this.handleChange(e, 'case_manager')}
                            defaultChecked={this.state.case_manager} />
                          <span class="slider round"></span>
                        </label>
                        <span>Yes</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div> : null}

              {this.state.user_type == '4' || this.state.user_type == '1' ? null : <div className="row my-3">
                <div style={{ marginTop: '10px' }} className="col-md-6 addadency-sec">
                  <label className="lehead">Case Manager: </label>
                  <div>
                    <select value={this.state.casemanagerid} onChange={(e) => this.handleChange(e, 'casemanager')} style={{ width: '200px', height: '40px', marginTop: '-5px', padding: '5px' }} >
                      <option value="">Select Case Manager</option>
                      {this.state.caseMangersData.map(e => (
                        <option value={e.user_id}>{e.display_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>}
              {this.state.user_type == 2 || this.state.user_type == 3 ?
                <div className="row my-3">
                  <div style={{ marginTop: '10px' }} className="col-md-6 addadency-sec">
                    <label className="lehead">Chapters: </label>
                    <div>

                      <select value={this.state.bigsChapterSelected} onChange={(e) => this.handleChange(e, 'bigsuserchapters')} style={{ width: '200px', height: '40px', padding: '5px' }} >
                        <option value="">Select Chapters</option>
                        {this.state.chaptersList?.map((e) => {
                          return <option value={e.chapter_id}>{e.chapter_name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div> : null}
            </div>
            {this.state.user_type==4?null:
            <div className="form-group mt-4">
              <input
                type="button"
                className="btn btn-info btn-success mt-1"
                value="Update"
                onClick={this.handleSubmit}
              />
            </div>
            }
          </div>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  permissionsList: state.permissionsList,
  accountSettings: state.accountSettings,
  userDetails: state.userDetails,
  permissions: state.permissions,
  chaptersList: state.chaptersList
});

export default connect(mapStateToProps, { getPermissions, settingsInput, postsettingsForm, usertype, getChapters,userdetailsData })(AccountSettings)