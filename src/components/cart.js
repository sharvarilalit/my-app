import React from 'react';
import{Redirect} from 'react-router-dom';
import "../css/cart.css";
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Empty from '../images/emty.png'
import axios from 'axios';
import Loader from "react-loader-spinner";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { CartListMiddleware , RemoveCartMiddleware, RemoveSpecificakeMiddleware} from '../reduxstore/middlewares'



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

    const  Emptycart=(e)=>{
               const token = props.token;
               props.dispatch(RemoveCartMiddleware(token)); 
      };

      //remove cake
      const  Remove=(e,cakeid,URI)=>{
        const token = props.token;
        //const URI= "removecakefromcart"
        if(URI== "removecakefromcart"){
            props.dispatch(RemoveSpecificakeMiddleware(token,cakeid,URI)); 
            return;
        }
        props.dispatch(RemoveSpecificakeMiddleware(token,cakeid,URI)); 

    };

    //add cake
    const  AddCake=(e,cakedata)=>{
        let  apiurl =process.env.REACT_APP_BASE_URI+"addcaketocart";
   
        axios({
        method:"post",
        url:apiurl,
        headers:{
           authtoken:props.token
        },
        data:{
           cakeid:cakedata.cakeid,
           name:cakedata.name,
           image:cakedata.image,
           price:cakedata.price,
           weight:cakedata.weight
        }}).then((res)=>{

            const token = props.token;
            props.dispatch(CartListMiddleware(token)); 
          
      } ,(error)=>{
             // console.log(error)
      })
    };

    const changeTab=()=>{
        props.click();
        props.history.push('/checkout/address');
    }

        React.useEffect(() => {
            if(props.status == true){
                props.history.push('/cart');
            }
        }, [props.status ]);

        React.useEffect(() => {
            if(props.status == true){
            props.history.push('/my-orders');
            }
        }, [props.ordersuccess ]);

        if(localStorage.getItem('token')){
            return<>   
                 <div class={`${props.show==false?null:'container'}`}>
                {props.show==false?null:<div class="alert alert-dark" role="alert">
                       <h3>Your cart </h3> 
                </div>}
                {props.isLoading===true?<center>
                    {props.show==false?null:<Loader type="TailSpin" color="#00BFFF" height={80} width={80} />}
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
                                        <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#" onClick={Emptycart}>Clear All</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {props.cart.map((x)=>{ return <tr>
                                        <td>
                                            <div class="product-item">
                                            {/* <Link to={'/cake/'+key.cakeid}><img  src={key.image} style={{height:'250px'}}class="card-img-top" alt="..." /></Link> */}

                                                <a class="product-thumb" href={'/cake/'+x.cakeid}><img src={x.image} alt="Product" /></a>
                                                <div class="product-info">
                                                    <h4 class="product-title"><a href={'/cake/'+x.cakeid}>{x.name}</a></h4><span><em>Weight:</em> {x.weight}</span><span><em>Flavour:</em> {x.name.split(" ")[0]}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <AddBoxOutlinedIcon style={{cursor:'pointer'}}  onClick={(e)=>AddCake(e,x)}/>
                                            <div class="count-input">
                                                <label> {x.quantity} </label>
                                            </div>
                                            <IndeterminateCheckBoxOutlinedIcon style={{cursor:'pointer'}} onClick={(e)=>Remove(e,x.cakeid,"removeonecakefromcart")} />
                                        </td>
                                        <td class="text-center text-lg text-medium"> &#8377;{x.price/x.quantity}</td>
                                        <td class="text-center text-lg text-medium">&#8377;{x.price}</td>
                                        <td class="text-center"><a class="remove-from-cart" href="#" onClick={(e)=>Remove(e,x.cakeid,"removecakefromcart")} data-toggle="tooltip" title="" data-original-title="Remove item"><i class="fa fa-trash"></i></a></td>
                                    </tr>})}
                                </tbody>
                            </table>
                        </div>
                        <div class="shopping-cart-footer">
                            <div class="column text-lg">Total: <span class="text-medium">&#8377;{
                             Number(parseFloat(props.total).toFixed(2)).toLocaleString('en', {
                                minimumFractionDigits: 2
                            })
                            }</span></div>
                        </div>           
                        {props.show==false?
                        <div class="shopping-cart-footer">
                            <center>
                            <div class="column"><a class="btn btn-outline-primary" onClick={changeTab}><i class="icon-arrow-left"></i>&nbsp;Proceed</a></div>
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
      token:state.AuthReducer.token,
      total:state.CartReducer.totalprice,
      status:state.CartReducer.status,
      ordersuccess:state.CartReducer.ordersuccess
    }
  };
  
export default connect(mapStateToProps)(withRouter(Cart));