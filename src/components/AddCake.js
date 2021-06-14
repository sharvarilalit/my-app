import React, {useState, useEffect ,useReducer} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import FormErrors from './formErrors';
import "../css/styles.css";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Toaster from './toaster';
 function Addcake(props){
   const [state,setDefaultState]=useState({
                cakeimage:"",
                cakename:"",
                description:"",
                caketype:"",
                password:"",
                cnfpassword:"",
                ingredients:[""],
                eggless:true,
                flavour:"",
                price:"",
                weight:"",
            formErrors: {weight:"", cakename: '', description: '',password:'',cnfpassword:'',caketype:"",flavour:"",price:""},
            descriptionValid: false,
            passwordValid: false,
            cakenameValid:false,
            caketypeValid:false,
            cnfpasswordValid:false,
            ingredientsValid:true,
            flavourValid:false,
            priceValid:false,
            weightValid:false,
            formValid: false,
            formSubmit:false,
            formMessage:'',
            uploadedImage:'',
        });
        const [toaster, setToasteropen] = React.useState(false);
        const [message, setMessage] = React.useState('');

        const dispatch = useDispatch();
        const status = useSelector(state => state.AdminReducer.status);
        const response = useSelector(state => state.AdminReducer.message);

   

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
       if(state.formValid){
         alert(1)
       }
        dispatch({
          type:'ADD_CAKE',
          payload:{
            data:state,
            token:localStorage.token
          }
        })
          console.log(state)
         
      }

      React.useEffect(()=>{
        if(response!=''){
          if(status===true ){
            setTimeout(function(){ 
              window.location.reload();
          }, 1000);
             props.close();
          }
          setToasteropen(true);
          setMessage(response)

        }
      },[status,response])

     const validateField=(fieldName, value) =>{
        let fieldValidationErrors = state.formErrors;
        let descriptionValid = state.descriptionValid;
        let cakenameValid = state.cakenameValid;
        let caketypeValid = state.caketypeValid;
        let flavourValid = state.flavourValid;
        let priceValid = state.priceValid;
        let weightValid = state.weightValid;

        switch(fieldName) {
          case 'description':
            descriptionValid = value.length>=5;
            fieldValidationErrors.description = descriptionValid ? '' : 'is too Short';
            break;
          case 'flavour':
            flavourValid = value.length >= 1;
            fieldValidationErrors.flavour = flavourValid ? '': 'Please Enter Flavour';
            break;
          case 'price':
              priceValid = value.length >= 1;
              fieldValidationErrors.price = priceValid ? '': 'Please Enter Flavour';
              break;
          case 'weight':
                weightValid = value.length >= 1;
                fieldValidationErrors.weight = weightValid ? '': 'Please Enter Weight';
                break;
          case 'cakename':
            cakenameValid = value.length >= 1;
            fieldValidationErrors.cakename = cakenameValid ? '': 'Please Enter cake Name';
            break; 
          case 'caketype':
            caketypeValid = value!=='';
            fieldValidationErrors.cakename = caketypeValid ? '': 'Please Select the cake type';
                break;    
          default:
            break;
        }
        setDefaultState({...state,formErrors: fieldValidationErrors,
                        descriptionValid: descriptionValid,
                        cakenameValid: cakenameValid,
                        caketypeValid:caketypeValid,
                        flavourValid:flavourValid,
                        priceValid:priceValid,
                        weightValid:weightValid,
                        formValid: state.weightValid && state.flavourValid && state.priceValid && state.caketypeValid && state.descriptionValid  && state.cakenameValid
                      });
      }

      const fileUpload = (e) => {
        setDefaultState({...state,cakeimage:URL.createObjectURL(e.target.files[0])});
        let formData = new FormData()
        formData.append('file', e.target.files[0])
        axios({
            url: process.env.REACT_APP_BASE_URI+ 'upload',
            method: 'post',
            data: formData,
            headers:{
              authtoken:localStorage.token
           },
        }).then(res => {
           // console.log("res",res);
            setDefaultState({...state,uploadedImage:res.data.imageUrl});

        }, err => {})
    }

    const toggleChange = () => {
      setDefaultState({...state,eggless:!state.eggless});
    }

    
    
    const createUI=()=>{
      return  state.ingredients.map((el, i) => (
         <div className="form-controls" key={i}>
            <div class="row">
            <div class="col-sm-11">
            <input placeholder="Enter Ingredients" name="ingredients" value={el ||''} onChange={e=>handleChange(e, i)} />
            </div>
            <div class="col-sm-1">
            <i class="fa fa-minus-square" onClick={(e)=>removeClick(e, i)}></i>
            </div>
          </div>
         </div>          
       ))
    }
    const addClick=()=>{
      setDefaultState({...state, ingredients:[...state.ingredients, '']});
    }

    const handleChange=(e, i)=> {
       let values = [...state.ingredients];
       values[i] = e.target.value;
       setDefaultState({ ...state,ingredients:values });
    }
    
    const removeClick=(i)=>{
       let users = [...state.ingredients];
       users.splice(i, 1);
       setDefaultState({ ...state,ingredients:users });
    }
    
  
      console.log('props are',toaster)
        return (
          <>
            <div className="container" style={{marginTop:'0px'}}>

              {state.formSubmit===true?
              
              <div class="alert alert-danger" role="alert">
                 {state.formMessage}!
              </div>
              :null}

            <form id="form" className="form" onSubmit={handleInputSubmit}>
              {/* <h2>Add cake</h2> */}
              {state.uploadedImage!=''&&<img src={state.uploadedImage} alt="Uploads" style={{width:'200px'}}/>}
              <div class="mb-3">
                <label for="file" class="form-label">Choose File</label>
                <input class="form-control" type="file" name="files" id="file" onChange={fileUpload}/>
              </div>

              <div className="form-controls">
                <label htmlFor="cakename">Name *</label>
                <input
                  name="cakename"
                  onChange={handleInputChange}
                  value={state.cakename}
                  type="text"
                  id="cakename"
                  placeholder="Enter name"
                />
                <div>{state.formErrors.cakename}</div>
              </div>
              <div className="form-controls">
                <label htmlFor="description">Description *</label>
                <textarea
                  name="description"
                  onChange={handleInputChange}
                  id="description"
                  placeholder="Enter Description"
                  style={{
                    width:'100%',
                  }}
                  rows={4}
                >
                  {state.description}
                </textarea>
                <div>{state.formErrors.description}</div>
              </div>

              <div className="form-controls">
                <label htmlFor="caketype">Select Cake Type *</label>
                <select class="form-select" aria-label="Default select example"   name="caketype" value={state.caketype}
                  onChange={handleInputChange}>
                  <option value="" >Select Type</option>
                  <option value="Birtday">Birtday</option>
                  <option value="Aniversary">Aniversary</option>
                  <option value="Wedding">Wedding</option>
                </select>
                <div>{state.formErrors.caketype}</div>
              </div>
              <div class="form-check">
               <input class="form-check-input" type="checkbox" name="eggless" id="flexCheckDefault" 
                defaultChecked={state.eggless}
                onChange={toggleChange}
               />
                <label class="form-check-label" for="flexCheckDefault">
                  Eggless
                </label>
              </div>
              <div className="form-controls">
                <label htmlFor="flavour">Flavour *</label>
                <input
                  name="flavour"
                  onChange={handleInputChange}
                  value={state.flavour}
                  type="text"
                  id="flavour"
                  placeholder="Enter name"
                />
                <div>{state.formErrors.flavour}</div>
              </div>

              <div className="form-controls">
                <label htmlFor="price">Price* </label>
                <input
                  name="price"
                  onChange={handleInputChange}
                  value={state.price}
                  type="number"
                  id="price"
                  placeholder="Enter Price"
                />
                <div>{state.formErrors.price}</div>
              </div>

              <div className="form-controls">
                <label htmlFor="weight">Weight * </label>
                <input
                  name="weight"
                  onChange={handleInputChange}
                  value={state.weight}
                  type="number"
                  id="weight"
                  placeholder="Enter Weight"
                />
                <div>{state.formErrors.weight}</div>
              </div>

              <div className="form-controls" >
               <label htmlFor="flavour">Ingredients*   <i class="fa fa-plus-square" onClick={addClick}></i></label>
               {createUI()}     
              </div>
            
              {state.formValid?<button className="button" disabled={!state.formValid}> Login </button>:
                  <button className="Disabled" disabled={!state.formValid}> Login </button>
              }
            </form>

          </div>
          {toaster===true?<Toaster toast={toaster} handleClickToast={handleClickToast} handleCloseToast={handleCloseToast} message={message} />:null}
          </>
         
        )
    
}
export default (withRouter(Addcake));