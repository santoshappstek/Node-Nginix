import React,{ Component } from 'react';
//import ImageUploader from 'react-images-upload';
//import ReactSelect from "react-select";
import './Signin.css';
import Form from 'react-validation/build/form';
//import Input from 'react-validation/build/input';
//import ImageUploader from 'react-images-upload';
// import Button from 'react-validation/build/button';
//import Textarea from 'react-validation/build/textarea';
//import Select from 'react-validation/build/select';
//import{required,CC,email,phone,ssn,Pincode,date,startdate,enddate} from './Field_Validators';
 class ImageUpload extends Component {
    constructor() {
        super();
        this.state = {
          input: {},
          pictures: [] ,
          form: {
            name: "",
            partnername:"",
            email: "",
            mobile: "",
            password: "",
            confirmPassword: "",
            status: null,
            language: [],
            country: null,
            zipCode: ""
          },
          formErrors: {
            name: null,
            partnername:null,
            email: null,
            mobile: null,
            password: null,
            confirmPassword: null,
            status: null,
            language: null,
            country: null
          }
        };
        this.onDrop = this.onDrop.bind(this);
        this.countryList = [
          { value: "india", label: "India" },
          { value: "us", label: "US" },
          { value: "australia", label: "Australia" }
        ];
        this.languageList = [
          { value: "english", label: "English" },
          { value: "hindi", label: "Hindi" },
          { value: "spanish", label: "Spanish" },
          { value: "arabic", label: "Arabic" }
        ];
      }
    
      validateNumber = evt => {
         var theEvent = evt || window.event;
    
      // Handle paste
         if (theEvent.type === "paste") {
          key = theEvent.clipboardData.getData("text/plain");
        } else {
         // Handle key press
          var key = theEvent.keyCode || theEvent.which;
         key = String.fromCharCode(key);
         }
         var regex = /[0-9]|\./;
         if (!regex.test(key)) {
           theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
       };
    
      changeHandler = (e) => {
        let input = this.state.input;
        input[e.target.name] = e.target.value;
      
        this.setState({
          input
        });
      //  console.log(input);
    
    }
    
      handleChange = e => {
        const { name, value, checked } = e.target;
        const { form, formErrors } = this.state;
        let formObj = {};
        if (name === "language") {
          // handle the change event of language field
          if (checked) {
            // push selected value in list
            formObj = { ...form };
            formObj[name].push(value);
          } else {
            // remove unchecked value from the list
            formObj = {
              ...form,
              [name]: form[name].filter(x => x !== value)
            };
          }
        } else {
          // handle change event except language field
          formObj = {
            ...form,
            [name]: value
          };
        }
        this.setState({ form: formObj }, () => {
          if (!Object.keys(formErrors).includes(name)) return;
          let formErrorsObj = {};
          if (name === "password" || name === "confirmPassword") {
            let refValue = this.state.form[
              name === "password" ? "confirmPassword" : "password"
            ];
            const errorMsg = this.validateField(name, value, refValue);
            formErrorsObj = { ...formErrors, [name]: errorMsg };
            if (!errorMsg && refValue) {
              formErrorsObj.confirmPassword = null;
              formErrorsObj.password = null;
            }
          } else {
            const errorMsg = this.validateField(
              name,
              name === "language" ? this.state.form["language"] : value
            );
            formErrorsObj = { ...formErrors, [name]: errorMsg };
          }
          this.setState({ formErrors: formErrorsObj });
        });
      };
    
      validateField = (name, value, refValue) => {
        let errorMsg = null;
        switch (name) {
          case "name":
            if (!value) errorMsg = "Please enter Discount program Name.";
            break;
            case "partnername":
              if (!value) errorMsg = "Please enter correct partner Name.";
              break;
          case "email":
            if (!value) 
            errorMsg = "Please enter Email.";
            else if (
              !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
              )
            )
              errorMsg = "Please enter valid Email.";
            break;
          case "mobile":
            if (!value) errorMsg = "Please enter Mobile.";
            break;
          case "country":
            if (!value) errorMsg = "Please select Country.";
            break;
          case "status":
            if (!value) 
            errorMsg = "Please select Status.";
            break;
            
    
          case "password":
            // refValue is the value of Confirm Password field
            if (!value) errorMsg = "Please enter Password.";
            else if (refValue && value !== refValue)
              errorMsg = "Password and Confirm Password does not match.";
            break;
          case "confirmPassword":
            // refValue is the value of Password field
            if (!value) errorMsg = "Please enter Confirm Password.";
            else if (refValue && value !== refValue)
              errorMsg = "Password and Confirm Password does not match.";
            break;
          case "language":
            if (value.length === 0) errorMsg = "Please select Language.";
            break;
          default:
            break;
        }
        return errorMsg;
      };
    
      validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        Object.keys(formErrors).map(x => {
          let refValue = null;
    
          if (x === "password" || x === "confirmPassword") {
            refValue = form[x === "password" ? "confirmPassword" : "password"];
          }
          const msg = validateFunc(x, form[x], refValue);
          if (msg) errorObj[x] = msg;
        });
        return errorObj;
      };
    
      handleSubmit = () => {
        const { form, formErrors } = this.state;
        const errorObj = this.validateForm(form, formErrors, this.validateField);
        this.form.validateAll();
        if (Object.keys(errorObj).length !== 0) {
          this.setState({ formErrors: { ...formErrors, ...errorObj } });
          return false;
        }
        console.log("Data: ", form);
      };
      onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    
     render(){
        const { form, formErrors } = this.state;
         return(
     <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit}>
             <div>
               <div className="container-fluid">
               <p className="title">Discount Programs / New Discount</p>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                           Discount Program Name:<span className="asterisk">*</span>
                      </label>
                      <input
                      className="form-control"
                      type="text"
                      placeholder="enter the discount program name"
                      name="Discount program name"
                      value={form.name}
                      onChange={this.handleChange}
                      onBlur={this.handleChange}
                      />
                      {formErrors.name && (
                      <span className="err">{formErrors.name}</span>
                      )}
                    </div>
                </div> 

                 <div className="col-sm-6">
                 <div className="form-group">
                <label>
                 Business/Partner Name:<span className="asterisk">*</span>
                </label>
                <input
                  className="form-control"
                  placeholder="enter the partner name"
                  type="text"
                  name="partnername"
                  value={form.partnername}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                />
                {formErrors.partnername && (
                  <span className="err">{formErrors.partnername}</span>
                )}
              </div>
            </div>
            <div className="col-sm-6">
            <div className="form-group">
                <label className="mr-3">
                  Status:<span className="asterisk">*</span>
                </label>
                <div className="form-control border-0 p-0 pt-1">
                  <label className="mr-2">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={form.status === "active"}
                      onChange={this.handleChange}
                    />{" "}
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={form.status === "inactive"}
                      onChange={this.handleChange}
                    />{" "}
                    InActive
                  </label>
                </div>
                {formErrors.status && (
                  <span className="err">{formErrors.status}</span>
                )}
              </div>
            </div>


                </div>

                </div>
               </div>
             
     </Form>
         );
     }
 }

 export default ImageUpload;