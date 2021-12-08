import React , {Component} from 'react'
import validator from 'react-validation';



export const required = (value,type) => {
   var Field = type.name;
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return <p style={{fontSize:15, color: "red"}} >{Field} is required</p>;
    }
  };
  
  export const email = (value) => {
      if (!validator.isEmail(value)) {
        return <div style={{fontSize:15, color: "red"}}>{value} is not a valid email.</div>
      }
    }; 
   export const CC = (value) => {
        if(!validator.isCreditCard(value)){
            return <div style={{fontSize:15, color: "red"}}> Please enter valid CC number.</div>
        }
    }
    export const date = (value) => {
      if(!validator.isDate(value)){
          return <div style={{fontSize:15, color: "red"}}> Please enter valid date.</div>
      }
  }
    export const phone =(value) => {
    //  isMobilePhone(str [, locale [, options]])
    if(!validator.isMobilePhone(value))
    {
      return <div style={{fontSize:15, color: "red"}}> Please enter valid phone number.</div>

    }
      /* if (value !== "undefined") {         
          var pattern = new RegExp(/^[0-9\b]+$/);
          if (!pattern.test(value)) {
            return <div style={{fontSize:15, color: "red"}}> Please enter only number.</div>
          }else if(value.length != 10){
            return <div style={{fontSize:15, color: "red"}}> Please enter valid phone number.</div>
          }
        } */
    }

    export const startdate = (value) => {
      if(!validator.isDate(value)){
          return <div style={{fontSize:15, color: "red"}}> Please enter valid date.</div>
      }
  }
  export const enddate = (value) => {
    if(!validator.isDate(value)){
        return <div style={{fontSize:15, color: "red"}}> Please enter valid date.</div>
    }
}
    
export const ssn = (value) => {
  if (value !== 'undefined') {
      // var regexp = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
     // var regexp = /^\d{3}-?\d{2}-?\d{4}$/;
     // var pin1=/^\d{6}$/;
   const  expression = /^(?!666|000|9\d{2})\d{3}[- ]{0,1}(?!00)\d{2}[- ]{0,1}(?!0{4})\d{4}$/;
      if(!expression.test(value)) {
          return <div style={{fontSize:15, color: "red"}}> Please enter valid SSN number</div>
      }
  }
}
export const Pincode = (value) => {
  if (value !== 'undefined') {
      var pin_code=/^\d{6}$/;
      if(!pin_code.test(value)) {
          return <div style={{fontSize:15, color: "red"}}> Please enter valid Pin code number</div>
      }
  }
}

    export class Field_Validators extends Component {
      render() {
          return (
              
                 <div>
                    
                  </div>
              
          );
      }
  }