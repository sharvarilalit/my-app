import React from 'react';
import{Redirect} from 'react-router-dom';
import "../css/cart.css";
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Empty from '../images/emty.png'
import axios from 'axios';
import Loader from "react-loader-spinner";
import moment from "moment";


function Orders(props) {

    console.log('data is',props.orders)
        if(localStorage.getItem('token')){
            return<>   
                 <div class={`${props.show==false?null:'container'}`}>
                <div class="alert alert-dark" role="alert">
                       <h3>My Orders </h3> 
                </div>
                {props.isLoading===true?<center>
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                </center>:
                <div class="row ">
                {props.orders &&props.orders.length>0?
                    <>
                    {props.orders &&props.orders.map((x)=>
                    <>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Order Id: {x.orderid} <label style={{float:"right",width:"80%",textAlign:"right"}}>Order Placed:{moment(x.orderdate).format('D-MM-YYYY')}</label>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                            <div class="table-responsive shopping-cart">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th class="text-center">Payment Mode</th>
                                        <th class="text-center">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                                <td>
                                                    
                                                        <div class="product-item">
                                                        {x.cakes.map(i=>{
                                                            return    <>                                                 
                                                            <a class="product-thumb1" href={'/cake/'+i.cakeid}><img src={i.image} style={{width:'80px'}} alt="Product" /></a>
                                                                            <div class="product-info">
                                                                            <h6 class="product-title"><a href="#">cake id:{i.cakeid}</a></h6><span><em>name:</em> {i.name}</span><span><em>Quantity:</em> {i.quantity}</span>
                                                                           </div></>
                                                                })}        
                                                                    <div class="product-info">
                                                                        <h4 class="product-title">Contact Details</h4><span><em>Phone:</em> {x.phone}</span><span><em>Email:</em> {x.email}</span><span><em>Address:</em> {x.address}</span>
                                                                    </div>
                                                                </div>
                                                   
                                                </td>
                                                <td class="text-center text-lg text-medium"> {x.mode}</td>
                                                <td class="text-center text-lg text-medium">&#8377;{x.price}</td>
                                </tr>                           
                              

                                    {/* {props.orders &&props.orders.map((x)=>
                                        x.cakes.map((x)=>{ return <tr>
                                            <td>
                                                <div class="product-item">
                                                    <a class="product-thumb" href="#"><img src={x.image} alt="Product" /></a>
                                                    <div class="product-info">
                                                        <h4 class="product-title"><a href="#">{x.name}</a></h4><span><em>Weight:</em> {x.weight}</span><span><em>Flavour:</em> {x.name.split(" ")[0]}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-center">
                                                <div class="count-input">
                                                    <input class="form-control" type="number" min="0" value={x.quantity} disabled/>
                                                </div>
                                            </td>
                                            <td class="text-center text-lg text-medium"> &#8377;{x.price}</td>
                                            <td class="text-center text-lg text-medium">&#8377;{x.price * x.quantity}</td>
                                        </tr>})
                                    )}; */}
                                </tbody>
                            </table>
                        </div>

                            </div>
                        </div>
                        </div>
                        
                    </div> </> )}
                        <div class="shopping-cart-footer">
                            <div class="column"><a class="btn btn-outline-secondary" href="/"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
                        </div>
                    </>
                :<center><img src={Empty} style={{width:'500px'}} />
                <p>No Orders Place yet. <Link to="/"><strong>Click here </strong></Link>to Continue Shopping!</p>
                </center>}
                </div>}
                {/* end of row */}
                </div>
                </>
        }
        else{
               return  <Redirect to='/' />
        }

}

function mapStateToProps(state,props){
    return{
      orders:state.CartReducer.orders,
      isLoading:state.CartReducer.isLoading,
      token:state.AuthReducer.token,
    }
  };
  
export default connect(mapStateToProps)(withRouter(Orders));