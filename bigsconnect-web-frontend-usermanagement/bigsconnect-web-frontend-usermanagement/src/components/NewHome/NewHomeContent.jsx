import React, { Component } from 'react';

class NewHomeContent extends Component {

    render() {
        localStorage.setItem("activescreen", JSON.stringify('home'));
        console.log('active screen:- ',JSON.parse(localStorage.getItem('activescreen')))
        return (
            <div style={{display:'flex',justifyContent:'center'}} className="container">
                <h3 style={{display:'flex',alignItems:'center'}} className="pagename">No Data Available</h3>         
            </div>           
        )
    }
}

export default NewHomeContent;
