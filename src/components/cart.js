import React from 'react';
import{Redirect} from 'react-router-dom';
import "../css/cart.css";
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Empty from '../images/emty.png'
import axios from 'axios';
import Loader from "react-loader-spinner";
import { CartListMiddleware } from '../reduxstore/middlewares'



function Cart(props) {
    //const[cartList,setcartList] =React.useState({});
    //const[isLoading,setLoading] =React.useState(true);

   // React.useEffect(() => {
        //commented by SNT 10062021
        // axios(
        // {
        //     method:"post",
        //     url:process.env.REACT_APP_BASE_URI+'cakecart',
        //     headers:{
        //        authtoken:props.token
        //     },
        //     data:{}})
        //         .then(res => {
        //             const Data = res.data.data;
        //             console.log("data is",Data);
                   
        //             props.dispatch({
        //                 type:'ADDTOCART',
        //                 payload:{
        //                   cakedata:Data
        //                 }
        //             });
        //             setcartList(Data);
        //             setLoading(false)
        //             //setLoading(false)
        //             //console.log('result is',res.data.data)
        //         })
        //const token = props.token;
        //props.dispatch(CartListMiddleware(token));     
    //  }, []);

      //called when get cart from backend
    //   React.useEffect(() => {
    //      // alert(3)
    //     if(props.cart.length>0){
    //         setLoading(false)
    //     }
 
    //    }, [props.cart ]);

        if(localStorage.getItem('token')){
            return<>   
                <div class="container" >
                {props.show==false?null:<div class="alert alert-dark" role="alert">
                       <h3>Your cart </h3> 
                </div>}
                {props.isLoading===true?<center>
                    <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
                </center>:
                <div class="row ">
                {props.cart &&props.cart.length>0?
                     <div class="card mb-3 cakeDetails" style={{ padding: '30px' }}>
                        <div class="table-responsive shopping-cart">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th class="text-center">Quantity</th>
                                        <th class="text-center">Price</th>
                                        <th class="text-center">Amount</th>
                                        <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#">Clear Cart</a></th>
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
                                                <input class="form-control" type="number" min="0" value={x.quantity} />
                                            </div>
                                        </td>
                                        <td class="text-center text-lg text-medium">${x.price}</td>
                                        <td class="text-center text-lg text-medium">${x.price * x.quantity}</td>
                                        <td class="text-center"><a class="remove-from-cart" href="#" data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>
                                    </tr>})}
                                </tbody>
                            </table>
                        </div>
                        <div class="shopping-cart-footer">
                            <div class="column text-lg">Subtotal: <span class="text-medium">$289.68</span></div>
                        </div>           
                        {props.show==false?
                        <div class="shopping-cart-footer">
                            <center>
                            <div class="column"><a class="btn btn-outline-primary" href="/"><i class="icon-arrow-left"></i>&nbsp;Proceed</a></div>
                            </center>
                        </div>
                        :
                        <>
                       
                        <div class="shopping-cart-footer">
                            <div class="column"><a class="btn btn-outline-secondary" href="/"><i class="icon-arrow-left"></i>&nbsp;Back to Shopping</a></div>
                            <div class="column"><a class="btn btn-success" href="/checkout">Checkout</a></div>
                        </div>
                        </>
                        }
                    </div>
                :<center><img src={Empty} style={{width:'500px'}} />
                <p>Your Cart is Empty. <Link to="/"><strong>Click here </strong></Link>to see Cakes</p>
                </center>}
                </div>}
                {/* end of row */}
                </div>
                </>
        }
        else{
               return  <Redirect to='/sign-in' />
        }

}

function mapStateToProps(state,props){
    return{
      cart:state.CartReducer.cart,
      isLoading:state.CartReducer.isLoading,
      token:state.AuthReducer.token
    }
  };
  
export default connect(mapStateToProps)(withRouter(Cart));