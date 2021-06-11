import React, { Component } from 'react';
import FormErrors from './formErrors';
import "../css/styles.css";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import{loginMiddleware} from '../reduxstore/middlewares';
import Loader from "react-loader-spinner";


function SignIn(props) {
      const[state,setDefaultState]=React.useState({
        email:"",
        password:"",
        formErrors: {password: '', email: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false,
        formSubmit:false,
        formMessage:''
   });

   

     const handleInputChange=(e)=>{
          const name = e.target.name;
          const value = e.target.value;
          state[name] = value;
          setDefaultState({ ...state });
          validateField(e.target.name, e.target.value);
      }

     const  handleInputSubmit=(e)=>{
          e.preventDefault();
          let message ="";
          //console.log(this.state)
        
        //commented SNT 10062021 used thunk insted of normal dispatch
        //   let  apiurl =process.env.REACT_APP_BASE_URI+"login";

        //   axios({method:"post",url:apiurl,data:{
        //     email:state.email,
        //     password:state.password
        //   }}).then((res)=>{
        //         message= "Success";
        //        // console.log(res)
        //         localStorage.setItem('token',res.data.token);
        //         props.dispatch({
        //             type:'LOGIN',
        //             payload:{
        //               token:res.data.token,
        //               isLogedIn:true
        //             }
        //         });

        //         setTimeout(function(){ 
        //           props.history.push('/')
        //         }, 1000);
        // } ,(error)=>{
        //          message = error;
        // })
      
        props.dispatch(loginMiddleware(state));
        setDefaultState({...state,
          email:"",
          password:"", 
          formSubmit:true,
          formMessage:message
        }); 
      };

      //called when user is loged in
      React.useEffect(() => {
        if(props.isLogedIn === true){
          setTimeout(function(){ 
            props.history.push('/')
          }, 1000);
        }
 
       }, [props.isLogedIn ]);

      const validateField=(fieldName, value)=> {
          
        let fieldValidationErrors = state.formErrors;
        let emailValid = state.emailValid;
        let passwordValid = state.passwordValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        setDefaultState({...state,formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        formValid: emailValid && passwordValid
                      });
      }
      
        //  {console.log("final state",state)}
        return (
            <div className="container">
            {props.isLoading && <center> <Loader type="Bars" color="#00BFFF" height={80} width={80} /></center>}
            <form id="form" className="form" onSubmit={handleInputSubmit}>
              <h2>Sign In</h2>
             
              <div className="form-controls">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  onChange={handleInputChange}
                  value={state.email}
                  type="text"
                  id="email"
                  placeholder="Enter email"
                />
                <div>{state.formErrors.email}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="passowrd">Password</label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  value={state.password}
                  type="password"
                  id="password"
                  placeholder="Enter password"
                />
                 <div>{state.formErrors.password}</div>
              </div>
             
              <button className="button" disabled={!state.formValid}> Login </button>
              <p>{state.formValid?"Form is Valid":null}</p>
            
                <div className="panel panel-default">
                <FormErrors formErrors={state.formErrors} />
                </div>
              {state.formSubmit===true?state.formMessage:null}
            </form>
          </div>
        )
}

SignIn = withRouter(SignIn);

function mapStateToProps(state,props){

 // alert('props are',props)
  return{
    isLogedIn:state.AuthReducer.isLogedIn,
    isLoading:state.AuthReducer.isLoading
  }
};

export default connect(mapStateToProps)(SignIn);
