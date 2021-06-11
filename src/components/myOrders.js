import React from 'react';
import{Redirect} from 'react-router-dom';
import "../css/cart.css";
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Empty from '../images/emty.png'
import axios from 'axios';
import Loader from "react-loader-spinner";



function Orders(props) {
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
                     <div class="card mb-3 cakeDetails" style={{ padding: '30px' }}>
                        <div class="table-responsive shopping-cart">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th class="text-center">Quantity</th>
                                        <th class="text-center">Price</th>
                                        <th class="text-center">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {props.cart.map((x)=>{ return <tr>
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
                                    </tr>})}
                                </tbody>
                            </table>
                        </div>
                       
                       
                        <div class="shopping-cart-footer">
                            <div class="column"><a class="btn btn-outline-secondary" href="/"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
                        </div>
                    </div>
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