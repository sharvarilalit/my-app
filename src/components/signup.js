import React, { Component } from 'react';
import FormErrors from './formErrors';
import "../css/styles.css";
import {withRouter} from 'react-router-dom';
import axios from 'axios';

 class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
                username:"",
                email:"",
                password:"",
                cnfpassword:"",
            formErrors: {username: '', email: '',password:'',cnfpassword:''},
            emailValid: false,
            passwordValid: false,
            usernameValid:false,
            cnfpasswordValid:false,
            formValid: false,
            formSubmit:false,
            formMessage:''
        };
      }

   

     handleInputChange=(e)=>{
            this.setState({[e.target.name]: e.target.value },() => { this.validateField(e.target.name,e.target.value) })
      }

      handleInputSubmit=(e)=>{
          e.preventDefault();
          this.setState({...this, username:"",
          email:"",
          password:"",
          cnfpassword:""});

          this.setState({formSubmit:true});
          //console.log(this.state)
          //this.props.click();
          console.log("form Submitted");
          let  apiurl =process.env.REACT_APP_BASE_URI+"register";

          axios({method:"post",url:apiurl,data:{
            name:this.state.username,
            email:this.state.email,
            password:this.state.password
          }}).then((res)=>{
           // console.log("in this",res)
            this.setState({formMessage:res.data.message});
            this.props.history.push('/sign-in')
        } ,(error)=>{
          //console.log(error);
          this.setState({formMessage:'Form Submitted Fail'});
        })
      }

      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
        let cnfpasswordValid = this.state.cnfpasswordValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          case 'username':
            usernameValid = value.length >= 6;
            fieldValidationErrors.username = usernameValid ? '': ' is too short';
            break; 
          case 'cnfpassword':
            cnfpasswordValid = value.length >= 6;
            fieldValidationErrors.cnfpassword = cnfpasswordValid && cnfpasswordValid=== passwordValid? '': ' is too short';
                break;    
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        usernameValid: usernameValid,
                        cnfpasswordValid: cnfpasswordValid
                      }, this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.cnfpasswordValid && this.state.usernameValid});
      }
     
      
    render() {
      // console.log('props are',this.props)
        return (
            <div className="container">

              {this.state.formSubmit===true?
              
              <div class="alert alert-danger" role="alert">
                 {this.state.formMessage}!
              </div>
              :null}

            <form id="form" className="form" onSubmit={this.handleInputSubmit}>
              <h2>Register with Us</h2>
              <div className="form-controls">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  type="text"
                  id="username"
                  placeholder="Enter username"
                />
                <div>{this.state.formErrors.username}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  type="text"
                  id="email"
                  placeholder="Enter email"
                />
                <div>{this.state.formErrors.email}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="passowrd">Password</label>
                <input
                  name="password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  type="password"
                  id="password"
                  placeholder="Enter password"
                />
                 <div>{this.state.formErrors.password}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="password2">Confirm Passowrd</label>
                <input
                  type="password"
                  name="cnfpassword"
                  onChange={this.handleInputChange}
                  value={this.state.cnfpassword}
                  id="password2"
                  placeholder="Enter passowrd again"
                />
                <div>{this.state.formErrors.cnfpassword}</div>
              </div>
              <button  disabled={!this.state.formValid} className="button"> Submit</button>
              <p>{this.state.formValid?"Form is Valid":null}</p>
            
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
                </div>

              {/* { console.log(this.state)} */}
              
            </form>
          </div>
        )
    }
}
export default withRouter(signUp);