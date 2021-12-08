import React,{ Component } from 'react';
import '../../assets/css/Login.css';
import { Container, Row, Col, Form} from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { fetchLoginInput, loginUser } from '../../Store/Actions/login';
import { toast } from 'react-toastify';
 
//const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

toast.configure()
class Login extends Component{

    handleUserInput = (event, key) => {
        // let user = {
        //     key: key,
        //     value: event.currentTarget.value
        // }
        // this.props.fetchLoginInput(user);
    }
    render(){
        return(
            <Container fluid className='ContainerDiv' >
                <Row>
                    <Col >
                        <div className="Form">
                        <div className="FormDiv">
                            <div className="Heading">
                                <span>LOGIN</span>
                            </div>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="3">
                                        Email
                                    </Form.Label>
                                    <Col sm="9">
                                            <Form.Control type="text" autoComplete='off'  placeholder="username"
                                        onChange={(event)=>{this.handleUserInput(event, 'username')}} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="3">
                                        Password
                                     </Form.Label>
                                    <Col sm="9">
                                        <Form.Control type="password" placeholder="Password"
                                            onChange={(event) => { this.handleUserInput(event, 'password') }} />
                                    </Col>
                                </Form.Group>
                                {/* <Form.Group as={Row} >
                                    <Col sm="12"  className="ButtonParent">
                                        <Button variant="primary"
                                                onClick={this.handleLoginButton}>Login</Button>
                                    </Col>
                                </Form.Group> */}
                            </Form>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}









//     state = {
//         nameError: "",
//         passwordError: ""
//     }
//     validate = () => {
//        let nameError= " ";
//        let passwordError= " ";

//        let test = reg.test(this.props.login.loginDetails.password);

//          if (!this.props.login.loginDetails.username) {
//             nameError = "Name cannot be blank";
//         }
//         if (!this.props.login.loginDetails.password) {
//             passwordError = "Please enter password";
//         }
        
//          else if (!test) {
//             passwordError = "Weak Password"
//         } 
//         else if(test) {
//             passwordError = "Strong Password"
//         }

//         if (nameError || passwordError) {
//             this.setState({ nameError, passwordError });
//             return false;
//         }
        
//         return true;
       
    
//     };

//     navigateTo=() =>{
//         this.props.history.push('/dashboard')
//     }

//     handleUserInput = (event, key) => {
//         let user = {
//             key: key,
//             value: event.currentTarget.value
//         }
//         this.props.fetchLoginInput(user);
//     }
//     handleLoginButton =() => {
//         this.props.loginUser(this.props.login.loginDetails)
//       //  console.log(this.props.login.loginDetails);
//        // const isValid = this.validate();
//        this.validate();
      
//     }
//     componentWillReceiveProps(nextProps){
//         if (nextProps.login.loginCheck === true){
//             this.props.history.push('/dashboard')
//             toast.success('welcome to dashboard')
//         }
//         else if (nextProps.login.loginCheck === false){
//             toast.error('Invalid Credentials');
//         }
//         nextProps.login.loginCheck =null;
//     }
//     render(){
//         return(
//             <Container className="ContainerDiv">
//                 <Row>
//                     <Col >
//                         <div className="Form">
//                         <div className="FormDiv">
//                             <div className="Heading">
//                                 <span>LOGIN</span>
//                             </div>
//                             <Form onSubmit={this.handleLoginButton}>
//                                 <Form.Group as={Row} controlId="formPlaintextEmail">
//                                     <Form.Label column sm="3">
//                                         Email*
//                                     </Form.Label>
//                                     <Col sm="9">
//                                             <Form.Control type="text" autoComplete='off'  placeholder="username"
//                                         onChange={(event)=>{this.handleUserInput(event, 'username')}} />

//                                          {this.state.nameError ? (
//                                        <div style={{fontSize:12, color: "red"}}>
//                                         {this.state.nameError}
//                                     </div>) : null }
//                                     </Col>
                                  
//                                 </Form.Group>
                                

//                                 <Form.Group as={Row} controlId="formPlaintextPassword">
//                                     <Form.Label column sm="3">
//                                         Password*
//                                      </Form.Label>
//                                     <Col sm="9">
//                                         <Form.Control type="password" placeholder="Password"
//                                             onChange={(event) => { this.handleUserInput(event, 'password') }} />

//                                              {this.state.passwordError ? (
//                                        <div style={{fontSize:12, color: "red"}}>
//                                         {this.state.passwordError}
//                                     </div>) : null }
                                            
//                                     </Col>

                                   
//                                 </Form.Group>
                               
//                                 <Form.Group as={Row} >
//                                     <Col sm="12"  className="ButtonParent">
//                                         <Button variant="primary"
//                                                 onClick={this.handleLoginButton}>Login</Button>
//                                     </Col>
//                                 </Form.Group>
                                

//                             </Form>
//                         </div>
//                     </div>
//                     </Col>
//                 </Row>
//             </Container>
//         );
//     }
// }

// export const mapStateToProps = (state) =>{
//     return{
//         login: state.login
//     }


export default Login
// export default connect(mapStateToProps, { fetchLoginInput, loginUser}) (Form);