import React, { Component } from 'react';
import { Button, Row, Col, Form, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchLoginInput, loginUser } from '../../Store/login/login';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import HttpService from './../../Services/HttpService'
import {withCookies,Cookies} from 'react-cookie'
import {instanceOf} from 'prop-types'
toast.configure()

class Login extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.state = {
            errorMessage: '',
            username: '',
            password: '',
            spinner: false
        }
    }
    static propTypes={
        cookies: instanceOf(Cookies).isRequired
            };
            state ={
                user: this.props.cookies.get("cookiedata")||""
            };
    navigateTo = () => {
        this.props.history.push('/dashboard/newdashboard');

    }

    handleUserInput = (event, key) => {
        let user = {
            key: key,
            value: event.currentTarget.value
        }
        if (key === "username") {
            this.setState({ email: event.currentTarget.value });
        }
        else {
            this.setState({ password: event.currentTarget.value });
        }
       // this.props.fetchLoginInput(user);
    }

    handleLoginButton = (e) => {
        const {cookies} = this.props;
        e.preventDefault();
        this.setState({
            spinner: true
        })
        var logindetails = {
            username:this.state.email,
            password:this.state.password,
            login_from:"web"
        }
                  

        if (this.validator.allValid()) {

            HttpService.login(logindetails)
            .then(response =>{            
                if(response.status==200){
                    cookies.set('cookiedata',response.data.user.token,{path:"/"})
                    this.setState({user:cookies.get('cookiedata')});
                    localStorage.setItem("userdata", JSON.stringify(response.data.user));
                    localStorage.setItem("chapter_id", JSON.stringify(response.data.user.chapter_id));
                    this.setState({
                                 spinner: false
                             })
                             this.props.history.push('/dashboard/newdashboard');
                }
                else{
                    this.setState({
                                 spinner: false
                             })
                             swal({
                                 title:'Error!',
                                  text:response.data.message              
                             })    
                }
            })
            .catch(error =>{
                this.setState({
                    spinner:false
                })
                swal({
                    title:'Error!',
                    text:"Something went wrong please try again!"
                })
                
                  
            })


            //this.props.loginUser(logindetails);
        }
        else {
            this.setState({
                spinner: false
            })
            this.validator.showMessages();
        }
    }

    componentDidMount(){
        if(this.props.cookies.get("cookiedata")!=undefined){
            this.navigateTo()
        }

    }
    componentWillReceiveProps(nextProps) {
       
    }

    render() {
        const {user} = this.state;
        const bigsLogo = {
            height: "100px",
            margin: "20px"
        };
        return (

            <div class="wrapper wrapper-login">
                <div class="row">
                    <div class="col-md-12">
                    </div>
                </div>

                <div className="login-sec">
                    <center>
                        {this.state.spinner && 
                            <Spinner className="App text-center" style={{ display: "block" }}
                            animation="border"
                            role="status"
                            variant="light">
                        </Spinner>}
                    </center>
                    <center>
                        <img class="img-fluid"
                            src={`${process.env.PUBLIC_URL}/img/bigsconnect.png`}
                            alt="logo" style={{ height: '100px', margin: '20px' }} />
                    </center>
                    <p>{user}</p>

                    <div className="FormDiv">
                        <form class="col" onSubmit={this.handleLoginButton}>
                            <div class="login-details-fields-new" >
                                <label className="login-labels" >
                                User Name
                                    </label>
                                <div>
                                    <div className="mb-4">
                                        <input style={{ width: "60vh" }} type="text" class="form-control mb-0" placeholder="User Name" name="username" value={this.state.email}
                                            onChange={(event) => { this.handleUserInput(event, 'username') }} />
                                        <span className="text-danger">{this.validator.message("username", this.state.email, "required")}</span>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="login-details-fields-new ">
                                    <label className="login-labels">
                                         Password
                                    </label>

                                    <div style={{ width: "60vh",marginLeft:'10px' }} className="mb-4">
                                        <input  type="password" placeholder="Password" class="form-control mb-0" name="password" value={this.state.password}
                                            onChange={(event) => { this.handleUserInput(event, 'password') }} />
                                        <span className="text-danger">{this.validator.message("password", this.state.password, "required")}</span>

                                    </div>
                                </div>

                            </div>
                            <div class="login-details-fields-new col" style={{ margin: "10px" }}>
                                <div class="app col">
                                    <div class="ButtonParent" >
                                        <button type="submit" class="btn btn-info btn-login">
                                            Login
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        );
    }
}

export const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps, { fetchLoginInput, loginUser })(withCookies(Login));
