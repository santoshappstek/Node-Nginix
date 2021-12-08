import React from 'react';
//import './Switch.css';
import Switch from "react-switch";

class  SwitchComp extends React.Component {
    constructor(){
        super()
        this.state={
            checked:false
        }
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(checked){
        this.setState({checked})
    }
    render(){
        return (
            <>
            <label className="lehead">Add to AgencyContacts: </label>
            <div>
            <label>
                <span>Yes</span>
                <Switch
                className="react-switch"
                onChange={this.handleChange}
                checked={this.state.checked}/>
                <span>No</span>
            </label>
            </div>
            </>
          );
    }  
};

export default SwitchComp;