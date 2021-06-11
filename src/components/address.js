import React, { Component } from 'react';
import FormErrors from './formErrors';
import "../css/styles.css";
import {withRouter} from 'react-router-dom';
import axios from 'axios';

 class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
                username:"",
                address:"",
                phone:"",
                city:"",
                pincode:"",
            formErrors: {username: '', address: '',phone:'',city:'',pincode:''},
            addressValid: false,
            phoneValid: false,
            usernameValid:false,
            cityValid:false,
            pincodeValid:false,
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
         // this.setState({...this, username:"",
         // email:"",
         // password:"",
         // cnfpassword:""});
         //alert(1)
          this.props.click(this.state) ; 
          this.props.history.push('/checkout/confirm');
          this.setState({formSubmit:true});
          this.setState({formMessage:'Form is valid Proceed for Next!'});
      }

      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let addressValid = this.state.addressValid;
        let phoneValid = this.state.phoneValid;
        let usernameValid = this.state.usernameValid;
        let cityValid = this.state.cityValid;
        let pincodeValid = this.state.pincodeValid;
      
        switch(fieldName) {
          case 'address':
            addressValid = value.length >= 10;
            fieldValidationErrors.address = addressValid ? '' : ' is invalid';
            break;
          case 'phone':
            phoneValid = value.length >= 10&& value.length<=15;
            fieldValidationErrors.password = phoneValid ? '': ' is too short';
            break;
          case 'username':
            usernameValid = value.length >= 6;
            fieldValidationErrors.username = usernameValid ? '': ' is too short';
            break; 
          case 'pincode':
            pincodeValid = value.length >= 6&&value.length<=10;
            fieldValidationErrors.pincode = pincodeValid? '': ' Please Enter valid Pincode';
                break;
         case 'city':
            cityValid = value.length >5;
            fieldValidationErrors.city = cityValid? '': ' Please Enter valid Pincode';
                break;       
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        addressValid: addressValid,
                        phoneValid: phoneValid,
                        usernameValid: usernameValid,
                        cityValid: cityValid,
                        pincodeValid:pincodeValid
                      }, this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.addressValid && this.state.phoneValid && this.state.cityValid && this.state.usernameValid && this.state.pincodeValid});
      }
     
      
    render() {
       console.log('props are',this.state)
        return (
            <>

              {this.state.formSubmit===true?
              
              <div class="alert alert-danger" role="alert">
                 {this.state.formErrors!=''?this.state.formErrors:'Form is Valid Proceed next'}!
              </div>
              :null}

            <form id="form" className="form" onSubmit={this.handleInputSubmit}>
              <h2>Fill Delivery Details</h2>
              <div className="form-controls">
                <label htmlFor="username">Name*</label>
                <input
                  name="username"
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  type="text"
                  id="username"
                  placeholder="Enter name"
                />
                <div>{this.state.formErrors.username}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="phone">Phone Number*</label>
                <input
                  name="phone"
                  onChange={this.handleInputChange}
                  value={this.state.phone}
                  type="number"
                  id="email"
                  placeholder="Enter Phone"
                />
                <div>{this.state.formErrors.phone}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="city">City*</label>
                <input
                  name="city"
                  onChange={this.handleInputChange}
                  value={this.state.city}
                  type="text"
                  id="city"
                  placeholder="Enter City"
                />
                 <div>{this.state.formErrors.city}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="pincode">Pincode*</label>
                <input
                  type="number"
                  name="pincode"
                  onChange={this.handleInputChange}
                  value={this.state.pincode}
                  id="pincode"
                  placeholder="Enter Pincode"
                />
                <div>{this.state.formErrors.pincode}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="address">Address*</label>
                <textarea
                  type="number"
                  name="address"
                  onChange={this.handleInputChange}
                  id="address"
                  placeholder="Enter Address"
                  style={{border:'none',width:'100%',padding:'15px'}}
                  rows={6}
                >
                    {this.state.address}
                </textarea>
                <div>{this.state.formErrors.pincode}</div>
              </div>
              <div class="shopping-cart-footer">
                  <center>
              {!this.state.formValid?
               <div class="column"><a class="btn btn-outline-primary disabled" href="#"><i class="icon-arrow-left"></i>&nbsp;Proceed</a></div>
              :
              <button  disabled={!this.state.formValid} className="button"> Proceed</button>
              }
              </center>  
            </div>
            </form>
          </>
        )
    }
}
export default withRouter(Address);