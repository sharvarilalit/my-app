import React , { useState, useEffect, useRef }from 'react';
import{Redirect} from 'react-router-dom';
import "../css/cart.css";
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Empty from '../images/emty.png'
import Loader from "react-loader-spinner";
import { AllCakesMiddleWare } from '../reduxstore/middlewares'
import Modal from './Modal';


function Allcakes(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      React.useEffect(() => {
        const token = props.token;
        props.dispatch(AllCakesMiddleWare(token)); 
    }, []);

        if(localStorage.getItem('token')){
            return<>   
                 <div class={`${props.show==false?null:'container'}`}>
                <div class="alert alert-dark" role="alert">
                       <h3>All Cakes 
                       <button type="button" class="btn btn-primary" style={{float:'right'}} onClick={handleClickOpen} >Add New</button>
                       </h3> 

                </div>
                {props.isLoading===true?<center>
                   <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
                </center>:
                <div class="row ">
                {props.cakes &&props.cakes.length>0?
                     <div class="card mb-3 cakeDetails" style={{ padding: '30px' }}>
                        <div class="table-responsive shopping-cart">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Cake Name</th>
                                        <th class="text-center">Quantity</th>
                                        <th class="text-center">Price</th>
                                        <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#" >Clear All</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {props.cakes.map((x)=>{ return <tr>
                                        <td>
                                            <div class="product-item">
                                                <a class="product-thumb" href={'/cake/'+x.cakeid}><img src={x.image} alt="Product" style={{width:'100px'}} /></a>
                                                <div class="product-info">
                                                    <h4 class="product-title"><a href={'/cake/'+x.cakeid}>{x.name}</a></h4><span><em>Weight:</em> {x.weight}</span><span><em>Flavour:</em> {x.name.split(" ")[0]}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center text-lg text-medium">1</td>
                                        <td class="text-center">
                                            <div class="count-input">
                                                <label> &#8377;{x.price} </label>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <a  href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-edit"></i></a>
                                            &nbsp;&nbsp;
                                            <a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a>
                                            </td>
                                    </tr>})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                :<center><img src={Empty} style={{width:'500px'}} />
                <p>No cake :(</p>
                </center>}
                </div>}
                {/* end of row */}
                <Modal  open={open} handleClose={handleClose} />
                </div>
                </>
        }
        else{
               return  <Redirect to='/sign-in' />
        }

}

function mapStateToProps(state,props){
    return{
      token:state.AuthReducer.token,
      totalcakes:state.AdminReducer.totalcakes,
      cakes:state.AdminReducer.cakes,
      isLoading:state.AdminReducer.isLoading
    }
  };
  
export default connect(mapStateToProps)(withRouter(Allcakes));