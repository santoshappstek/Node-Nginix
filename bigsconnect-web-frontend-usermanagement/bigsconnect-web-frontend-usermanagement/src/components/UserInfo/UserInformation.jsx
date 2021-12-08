import React, { Component } from 'react';
import { userInfoInput, userInformationForm } from '../../Store/userprofile/userInformationaction';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import NumberFormat from 'react-number-format';
import HttpService from '../../Services/HttpService'
import { userdetailsData,userdeleteaction,passwordResetMail,ProfilePicUploadform } from  '../../Store/userprofile/userdetailsaction';

class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.state = {
          input: {},
          Uid:'',
          first_name:'',
          last_name:'',
          email:'',
          city:'',
          state:'',
          post_code:'',
          dateof_birth:'',
          phone_number:'',
          updateResponce: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }      
      componentDidMount() {
        if(this.props.userDetails.userdetails_res.user_details!=null){
       //   var user_id = this.props.userDetails.userdetails_res.user_details.user_id;
          this.setState({
            Uid : this.props.userDetails.userdetails_res.user_details.user_id,
           first_name : this.props.userDetails.userdetails_res.user_details.first_name,
            last_name :this.props.userDetails.userdetails_res.user_details.last_name,
            email : this.props.userDetails.userdetails_res.user_details.email,
            phone_number : this.props.userDetails.userdetails_res.user_details.phone_number,
            city : this.props.userDetails.userdetails_res.user_details.city,
            state : this.props.userDetails.userdetails_res.user_details.state,
            post_code : this.props.userDetails.userdetails_res.user_details.post_code,
            dateof_birth : this.props.userDetails.userdetails_res.user_details.dateof_birth
          
          });
         
        }
    
       }   

       handleChange = (e,key) => {
        const{ Uid } = this.state
        let infoInput = {
          key: key,
          value: e.currentTarget.value
        }        

        if (key==='first_name') {
          this.setState({
            first_name : e.currentTarget.value
          })
        }
        if (key==='last_name') {
          this.setState({
            last_name : e.currentTarget.value
          })
        }
         if (key==='email') {
          this.setState({
            email : e.currentTarget.value
          })
        }   
        if (key==='phone_number') {
          // const re = /^[0-9\b]+$/;
          // if (e.currentTarget.value === '' || re.test(e.currentTarget.value)) {
            this.setState({phone_number: e.currentTarget.value})
         // }           
      }
      if (key==='city') {
        this.setState({
          city : e.currentTarget.value
        })
      }   
      if (key==='state') {
        this.setState({
          state : e.currentTarget.value
        })
      }   
      if (key==='post_code') {
        this.setState({
          post_code : e.currentTarget.value
        })
      } 
      if (key==='dateof_birth') {
        this.setState({
          dateof_birth : e.currentTarget.value
        })
      }   
        this.props.userInfoInput(infoInput);    
      }   
      
      handleSubmit = (e) => {
        e.preventDefault();
        if( this.validator.allValid())
        {
          this.validator.hideMessages();
          const { userInfo } = this.props
          const { Uid } = this.state
          var data ={
            first_name: this.state.first_name,
            last_name: this.state.last_name,          
            email: this.state.email,
            phone_number: this.state.phone_number,
            city: this.state.city,
            state: this.state.state,
            post_code: this.state.post_code,
            dateof_birth: this.state.dateof_birth,           
            user_id:Uid           
          };        

          //this.props.userInformationForm(data);
          HttpService.userinfo(data)
          .then(response => {
              if(response.data.status==200){
                var  user_id= this.state.Uid
               this.props.userdetailsData({user_id});
                swal({
                  icon:'success',
                  text:response.data.message
                })

              }
              else{
                swal({
                  icon:'error',
                  text:response.data.message
                })
              }
           
              //dispatch(userInfoForm(response.data,info));
          })
          .catch(error => {
            swal({
              icon:'error',
              text:'Something went wrong please try again'
            })
              //dispatch(userInfoError());
          })


        
          this.props.userInformationForm(data);
          // swal({
          //   title: "User Information updated successfully",
          //   icon: "success"
          // })

          //this.form.reset();
        }
        else {
          this.validator.showMessages();          
        }
      };     
      componentWillReceiveProps(nextProps){
      }
      
      componentWillUpdate(prevProps){
       
        if(this.props.userDetails.userdetails_res!=prevProps.userdata){
          
           this.state.Uid = prevProps.userdata.user_id
           this.state.first_name = prevProps.userdata.first_name
           this.state.last_name = prevProps.userdata.last_name
           this.state.email = prevProps.userdata.email
           this.state.phone_number = prevProps.userdata.phone_number
           this.state.city = prevProps.userdata.city
           this.state.state = prevProps.userdata.state
           this.state.post_code = prevProps.userdata.post_code
           this.state.dateof_birth= prevProps.userdata.dateof_birth
           
        }
        // if(this.props.userDetails.userdetails_res==prevProps.userdata){
        //   this.setState({
        //     Uid : prevProps.userdata.user_id,
        //    first_name : prevProps.userdata.first_name,
        //     last_name : prevProps.userdata.last_name,
        //     email : prevProps.userdata.email,
        //     phone_number : prevProps.userdata.phone_number,
        //     city : prevProps.userdata.city,
        //     state : prevProps.userdata.state,
        //     post_code : prevProps.userdata.post_code,
        //    dateof_birth: prevProps.userdata.dateof_birth,
        //    })
        // }
      
          
        
      

        // const { history } = this.props;
        // if (nextProps.userInfo.userInfo_res.status) {
        //   swal({
        //     title: nextProps.userInfo.userInfo_res.message,
        //     icon: "success"               
        //   })
        //   nextProps.userInfo.userInfo_res.status = ''
        // }

        //if (nextProps.userInfo.userInfo_res.status === 200){
            //console.log('props',nextProps.userInfo.userInfo_res);
            //alert('User Information Updated Successfully');            
        // }
        // else if (nextProps.userInfo.userInfo_res.status === 222){
        //     //toast.error('Invalid Credentials');
        //     //alert('Please fill the required fields');
        // }
    }

    render() {
        return <form ref={c => { this.form = c }}>
          
          <div style={{marginTop:'-40px'}} className="userinfo-box p-5">            
            <div className="container-fluid">           
              {/* <h4 className="pagename">User Information</h4> */}
             <div className="row">
                <div className="col-sm-6">
                    <label className = "lehead">First Name <span>*</span></label>
                        <input 
                          type="text"
                          name="firstname"
                          className="form-control"
                          defaultValue={this.state.first_name}
                          onChange={(e) => this.handleChange(e, 'first_name')}/>     
                        <span className="text-danger">{this.validator.message("first_name", this.state.first_name, "required|alpha")} </span>                       
                </div>

                <div className="col-sm-6">
                    <label className = "lehead">Last Name <span>*</span></label>
                        <input
                          type="text"
                          name="lastname"
                          className="form-control"
                          defaultValue={this.state.last_name}
                          onChange={(e) => this.handleChange(e, 'last_name')}/>  
                        <span className="text-danger">{this.validator.message("last_name", this.state.last_name, "required|alpha")} </span>                  
                </div>

                  <div className="col-sm-6">
                    <label className = "lehead">Email Address <span>*</span></label>
                        <input
                          type="text"
                          name="email"                         
                          className="form-control"
                          defaultValue={this.state.email}
                          onChange={(e) => this.handleChange(e, 'email')}/>
                        <span className="text-danger">{this.validator.message("email", this.state.email, "required|email")} </span>                    
                  </div>

                <div className="col-sm-6">
                    <label className = "lehead">Phone Number<span>*</span></label>
                        <NumberFormat 
                        
                         //format="(###) ###-####"
                         format="(###) ###-####" mask =''
                         type ='tel'
                          
                          name="phone no"
                          className="form-control" 
                          value={this.state.phone_number}                         
                          
                          onChange={(e) => this.handleChange(e, 'phone_number')}/>
                        {/* <NumberFormat 
                        style={{display:'flex'}}
                          format="(###) ###-####" mask=""
                          name="phone no"
                          
                          onChange={(e) => this.handleChange(e, 'phone_number')}
                          defaultValue={this.state.phone_number}/> */}
                        <span className="text-danger">{this.validator.message("phone_number", this.state.phone_number, "required|min:14")} </span>               
                </div>

                <div className="col-sm-6">
                    <label className = "lehead">City</label>
                        <input                          
                          type="text"
                          name="city"
                          className="form-control"
                          defaultValue={this.state.city}
                          onChange={(e) => this.handleChange(e, 'city')}/>                    
                </div>

                <div className="col-sm-6">
                    <label className = "lehead">State</label>
                        <input
                          type="text"
                          name="state"
                          className="form-control"
                          defaultValue={this.state.state}
                          onChange={(e) => this.handleChange(e, 'state')}/>                    
                </div>               
                
                <div className="col-sm-6">
                    <label className = "lehead">Postcode</label>
                        <input
                          type="number"
                          name="Postcode No"
                          className="form-control"
                          defaultValue={this.state.post_code}
                          onChange={(e) => this.handleChange(e, 'post_code')}/>                   
                </div>  
                <div className="col-sm-6">
                    <label className = "lehead">Birthday</label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          defaultValue={this.state.dateof_birth}
                          onChange={(e) => this.handleChange(e, 'dateof_birth')}/>                    
                </div>                                     
            </div>
              <button className="btn btn-info btn-success mt-1" onClick={(e)=>this.handleSubmit(e)}>Update</button>
            </div>
                </div>                    
        </form>
    }
}

export const mapStateToProps = (state) =>{
  return{
    userInfo: state.userInfo,
    userDetails: state.userDetails,


  }
}

export default connect(mapStateToProps, { userInfoInput, userInformationForm,userdetailsData }) (UserInformation);









