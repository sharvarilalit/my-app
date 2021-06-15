import React, { Component } from 'react';
import FormErrors from './formErrors';
import "../css/styles.css";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import{loginMiddleware} from '../reduxstore/middlewares';
import Loader from "react-loader-spinner";
import Toaster from './toaster';


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
   const [toaster, setToasteropen] = React.useState(false);
   const [message, setMessage] = React.useState('');
   const [color, setColor] = React.useState('');


      const handleClickToast= () => {
        setToasteropen(true);
      };

      const handleCloseToast = () => {
        setToasteropen(false);
      };

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
          }, 3000);
        }
        if(props.messsage !== ''){
          setToasteropen(true);
          setMessage(props.messsage)
         
        }

        if(props.status==true){
          setColor('success');
        }
        else{
          setColor('warning');
        }
       }, [props.isLogedIn, props.message ,props.status]);

      const validateField=(fieldName, value)=> {
          
        let fieldValidationErrors = state.formErrors;
        let emailValid = state.emailValid;
        let passwordValid = state.passwordValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' Enter Valid Email';
            break;
          case 'password':
            passwordValid = value.length >0;
            fieldValidationErrors.password = passwordValid ? '': 'Please Enter password';
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
      
        {console.log("final state",props.message , props.isLoading)}
        return (
            <div className="container">
              {/* {state.formValid==true||state.formSubmit==true?<div class="alert alert-danger" role="alert">
                 {state.formSubmit===true?state.formMessage:null}
                 {state.formValid?"Form is Valid Please Login":null}
              </div>:null} */}
              
            {props.isLoading==true?<center> <Loader type="Bars" color="#00BFFF" height={80} width={80} /></center>:null}
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
                <div className="errors">{state.formErrors.email}</div>
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
                 <div className="errors">{state.formErrors.password}</div>
              </div>
             
              {state.formValid?<button className="button" disabled={!state.formValid}> Login </button>:
                  <button className="Disabled" disabled={!state.formValid}> Login </button>
              }
              {/* <p>{state.formValid?"Form is Valid":null}</p>
            
                <div className="panel panel-default">
                <FormErrors formErrors={state.formErrors} />
                </div>
              {state.formSubmit===true?state.formMessage:null} */}
            </form>
            {toaster===true?<Toaster toast={toaster} handleClickToast={handleClickToast} handleCloseToast={handleCloseToast} message={message} class={color} />:null}
          </div>
        )
}

SignIn = withRouter(SignIn);

function mapStateToProps(state,props){

 // alert('props are',props)
  return{
    isLogedIn:state.AuthReducer.isLogedIn,
    isLoading:state.AuthReducer.isLoading,
    messsage:state.AuthReducer.success,
    status:state.AuthReducer.status

  }
};

export default connect(mapStateToProps)(SignIn);
