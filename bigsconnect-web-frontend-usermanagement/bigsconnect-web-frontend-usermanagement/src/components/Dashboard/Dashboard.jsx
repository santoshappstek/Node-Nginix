import React, { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Content from './Content';
import Footer from './Footer';
import NewDashBoard from './NewDashBoard';
import Home from '../Home/Home';
class Dashboard extends Component {
    render() {
        return (
            <div style={{background:'white'}}>
                <div>
                    <Header />
                    <SideBar />
                    <Content />
                    <Footer />               
                </div>          
            </div>
        );
    }
}

export default Dashboard;