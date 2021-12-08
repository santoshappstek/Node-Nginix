import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import { littleFetchInput, addLittleForm } from '../../Store/mylittle/myLittleaction';
import HttpService from '../../Services/HttpService';
import { userdetailsData,userdeleteaction,passwordResetMail,ProfilePicUploadform } from  '../../Store/userprofile/userdetailsaction';
import NumberFormat from 'react-number-format';

class MyLittle extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      input: {},
      Uid: '',
      littleId: '',
      first_name: '',
      last_name: '',
      match_start: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var user_id = this.props.userId;
    var little_id = this.props.littleId;
    this.setState({ Uid: user_id, littleId: little_id });
    console.log('my little:- ', this.props.littleData)
    if (this.props.littleData != '') {
      this.setState({
        first_name: this.props.littleData.first_name,
        last_name: this.props.littleData.last_name,
        phone_number: this.props.littleData.phone_number,
        match_start: this.props.littleData.match_start,
        dateof_birth: this.props.littleData.dateof_birth,
        guardian_name: this.props.littleData.guardian_name,
        guardian_number: this.props.littleData.guardian_number,
        emergency_name: this.props.littleData.emergency_name,
        emergency_number: this.props.littleData.emergency_number,
        phone_type:this.props.littleData.phone_type,
        user_id: this.props.userId
      })

    }
  }

  handleChange = (e, key) => {
    const { Uid } = this.state

    let littleInput = {
      key: key,
      value: e.currentTarget.value
    }
    if (key === 'first_name') {
      this.setState({
        first_name: e.currentTarget.value
      })
    }
    if (key === 'last_name') {
      this.setState({
        last_name: e.currentTarget.value
      })
    }

    if (key === 'phone_number') {
      this.setState({
        phone_number: e.currentTarget.value
      })
    }

    if (key === 'phone_type') {
      this.setState({
        phone_type: e.currentTarget.value
      })
    }

    if (key === 'match_start') {
      this.setState({
        match_start: e.currentTarget.value
      })
    }
    if (key === 'dateof_birth') {
      this.setState({
        dateof_birth: e.currentTarget.value
      })
    }
    if (key === 'guardian_name') {
      this.setState({
        guardian_name: e.currentTarget.value
      })
    }

    if (key === 'guardian_number') {
      this.setState({
        guardian_number: e.currentTarget.value
      })
    }

    if (key === 'emergency_name') {
      this.setState({
        emergency_name: e.currentTarget.value
      })
    }
    if (key === 'emergency_number') {
      this.setState({
        emergency_number: e.currentTarget.value
      })
    }

    //this.props.littleFetchInput(littleInput);    
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validator.allValid()) {
      this.validator.hideMessages();

      const { Uid } = this.state
      if (this.props.littleData!='') {
        var data = {
          mylittle_id: this.props.littleData.mylittle_id,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone_number: this.state.phone_number,
          phone_type: this.state.phone_type,
          match_start: this.state.match_start,
          dateof_birth: this.state.dateof_birth,
          guardian_name: this.state.guardian_name,
          guardian_number: this.state.guardian_number,
          emergency_name: this.state.emergency_name,
          emergency_number: this.state.emergency_number,
          user_id: this.props.userId
        };

        HttpService.mylittleEdit(data)
          .then(response => {
            console.log('response', response);
            if (response.data.status == 200) {

              var  user_id= this.props.userId
              console.log('little user_id', user_id);
            this.props.userdetailsData({user_id});
              swal({
                title: response.data.message,
                icon: "success"
              })
            
            }
            else {
              swal({
                icon: 'error',
                text: response.data.message
              })
            }

            // dispatch(littleForm(response.data));
          })
          .catch(error => {
            swal({
              icon:'error',
              text:'Something went wrong please try again!'
            })
            // dispatch(littleErrorForm());
          })


        // this.props.addLittleForm(data);


      }
      else {
        var data = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone_number: this.state.phone_number,
          phone_type: this.state.phone_type,
          match_start: this.state.match_start,
          dateof_birth: this.state.dateof_birth,
          guardian_name: this.state.guardian_name,
          guardian_number: this.state.guardian_number,
          emergency_name: this.state.emergency_name,
          emergency_number: this.state.emergency_number,
          user_id: this.props.userId
        };

        HttpService.mylittle(data)
          .then(response => {
            console.log('add little response', response);
            if (response.data.status == 200) {
              var  user_id= this.props.userId
            
            this.props.userdetailsData({user_id});
              swal({
                title: response.data.message,
                icon: "success"
              })
             
            }
            else {
              swal({
                icon: 'error',
                text: response.data.message
              })
            }

            // dispatch(littleForm(response.data));
          })
          .catch(error => {
            swal({
              icon: 'error',
              text: "Something went wrong please try agian!"
            })
            // dispatch(littleErrorForm());
          })

      }
    } else {
      this.validator.showMessages();
    }

  };

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    // if (nextProps.myLittle.addlittle_res.status === 200){
    //     swal('MyLittle Added Successfully');
    //     this.littleform.reset();
    //     this.props.myLittle.littleDetails = {};
    // }
    // else if (nextProps.myLittle.addlittle_res.status === 222){
    //   swal('please fill the required fields');
    // }
  }

  render() {
    const { errors } = this.state;
    // if (this.state.littleId != null) {
    //   return (
    //     <div style={{ marginTop: '-40px' }} className="tabs-photgallery-sec">
    //       <div className="App">
    //         <h1>User Already have Little!!</h1>
    //       </div>
    //     </div>
    //   )
    // }
    //else {
      return (
        <form ref={form => this.littleform = form} onSubmit={this.handleSubmit}>
          <div style={{ marginTop: '-40px' }} className="mylittle-box p-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  <label className="lehead">First Name<span>*</span></label>
                  <input
                    type="text"
                    name="First name"
                    className="form-control"
                    defaultValue={this.state.first_name}
                    onChange={(e) => this.handleChange(e, 'first_name')} />
                  <span className="text-danger">{this.validator.message("first_name", this.state.first_name, "required|alpha")} </span>
                </div>

                <div className="col-sm-6">
                  <label className="lehead">Last Name<span>*</span></label>
                  <input
                    type="text"
                    name="Last Name"
                    className="form-control"
                    defaultValue={this.state.last_name}
                    onChange={(e) => this.handleChange(e, 'last_name')} />
                  <span className="text-danger">{this.validator.message("last_name", this.state.last_name, "required|alpha")}</span>
                </div>
                <div className="col-sm-6">
                  <label className="lehead">Primary Phone Number</label>
                  <NumberFormat
                     format="(###) ###-####" mask =''
                     type ='tel'
                    name="phone"
                    className="form-control"
                    value={this.state.phone_number}
                    onChange={(e) => this.handleChange(e, 'phone_number')} />
                    <span className="text-danger">{this.validator.message("phone_number", this.state.phone_number, "min:14")} </span>
                </div>
                <div className="col-sm-6">
                  <label className="lehead">Primary Phone Type</label>
                  <select 
                    name="phonetype"
                    className="form-control"
                    value={this.state.phone_type}
                    onChange={(e) => this.handleChange(e, 'phone_type')}>
                    <option value='cell'>Cell</option>
                    <option value='land'>Land</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="lehead">Match Start Date<span>*</span></label>
                  <input
                    type="date"
                    name="Match Start Date"
                    className="form-control"
                    defaultValue={this.state.match_start}
                    onChange={(e) => this.handleChange(e, 'match_start')} />
                  <span className="text-danger">{this.validator.message("match_start", this.state.match_start, "required")} </span>
                </div>
                <div className="col-sm-6">
                  <label className="lehead">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    className="form-control"
                    defaultValue={this.state.dateof_birth}
                    onChange={(e) => this.handleChange(e, 'dateof_birth')} />
                </div>
                <div className="col-sm-6">
                  <label className="lehead">Parent/Guardian Name</label>
                  <input
                    type="text"
                    name="parentname"
                    className="form-control"
                    defaultValue={this.state.guardian_name}
                    onChange={(e) => this.handleChange(e, 'guardian_name')} />
                </div>
                <div className="col-sm-6">
                  <label className="lehead">Parent/Guardian Phone Number</label>
                  <NumberFormat
                     format="(###) ###-####" mask =''
                     type ='tel'
                    name="parent phone no"
                    className="form-control"
                    value={this.state.guardian_number}
                    onChange={(e) => this.handleChange(e, 'guardian_number')} />
                    <span className="text-danger">{this.validator.message("guardian_number", this.state.guardian_number, "min:14")} </span>
                </div>

                <div className="col-sm-6">
                  <label className="lehead">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="parentname"
                    className="form-control"
                    defaultValue={this.state.emergency_name}
                    onChange={(e) => this.handleChange(e, 'emergency_name')} />
                </div>
                <div className="col-sm-6">
                  <label className="lehead">Emergency Contact Phone Number</label>
                  <NumberFormat
                    format="(###) ###-####" mask =''
                    type ='tel'
                    name="parent phone no"
                    className="form-control"
                    value={this.state.emergency_number}
                    onChange={(e) => this.handleChange(e, 'emergency_number')} />
                </div>
              </div>
              <button className="btn btn-info btn-success mt-1">Update</button>
            </div>
          </div>
        </form>
      );
    //}
  }
}

export const mapStateToProps = (state) => {
  return {
    myLittle: state.myLittle,
    userDetails: state.userDetails,

  }
}

export default connect(mapStateToProps, { littleFetchInput, addLittleForm ,userdetailsData})(MyLittle);






