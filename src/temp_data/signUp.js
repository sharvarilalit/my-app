import React, { Component } from 'react';
import FormErrors from '../components/formErrors';
import "../css/styles.css";
export default class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFields:{
                username:"",
                email:"",
                password:"",
                cnfpassword:""
            },
            formErrors: {username: '', email: '',password:'',cnfpassword:''},
            emailValid: false,
            passwordValid: false,
            usernameValid:false,
            cnfpasswordValid:false,
            formValid: false
        };
      }

     handleInputChange=(e)=>{
            this.setState({inputFields:{...this.state.inputFields,[e.target.name]: e.target.value }},() => { this.validateField(e.target.name,e.target.value) })
      }

      handleInputSubmit=(e)=>{
          e.preventDefault();
          console.log("form Submitted");
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
        return (
            <div className="container">
            <form id="form" className="form" onSubmit={this.handleInputSubmit}>
              <h2>Register with Us</h2>
              <div className="form-controls">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  onChange={this.handleInputChange}
                  value={this.state.inputFields.username}
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
                  value={this.state.inputFields.email}
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
                  value={this.state.inputFields.password}
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
                  value={this.state.inputFields.cnfpassword}
                  id="password2"
                  placeholder="Enter passowrd again"
                />
                <div>{this.state.formErrors.cnfpassword}</div>
              </div>
              <button  disabled={!this.state.formValid}> Submit</button>
              <p>{this.state.formValid?"Form is Valid":null}</p>
            
                <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
                </div>

              { console.log(this.state)}
            </form>
          </div>
        )
    }
}
