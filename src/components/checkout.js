import React from 'react';
import Summary from './summary';
import Confirm from './confirm';
import Address from './address';
import {connect} from 'react-redux';
import {withRouter, Route ,Link, useRouteMatch, Redirect} from 'react-router-dom'  
import { PlaceOrderMiddleware ,CartListMiddleware,OrderMiddleware} from '../reduxstore/middlewares'

 function Checkout(props) {
    const {path} = useRouteMatch();
    const[tab1,settab1] = React.useState(true);
    const[tab2,settab2] = React.useState(false);
    const[tab3,settab3] = React.useState(false);
    const [data,setdata]= React.useState([]);

    React.useEffect(() => {
        if(props.total==-1){
           props.history.push('/')
        }
      }, [props.total]);

    const handletabChange=()=>{
        settab2(true)
    }


    const handletabChange2=(data)=>{
        setdata(data);
        settab3(true)
    }

    const handletabChange3=()=>{
        const token = props.token;
         props.dispatch(PlaceOrderMiddleware(token,data,props.cart,props.total)); 
    }
    
    React.useEffect(()=>{
        if(props.status==true){
         // alert("i am called")
          const token = props.token;
          props.dispatch(CartListMiddleware(token)); 
          props.dispatch(OrderMiddleware(token)); 
          props.history.push('/my-orders')
        }
      },[props.status])

    console.log('datathis',data)
    return (
        <>
            <div class="container" >
            <div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
                <div class="col-md-4 col-sm-12">
                    
                        {/* <Link to ={`${path}/summary`} >Order Summary</Link><br />
                        <Link to ={path+"/address"}>Address</Link><br />
                        <Link to ={`${path}/confirm`}>Place Order</Link> */}
    {/* <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href={`${path}/summary`} role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                    <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a> */}
                   
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <Link class={`${tab1==true?'nav-link active':'nav-link disabled'}`} style={{marginBottom:'5px'}} to ={`${path}/summary`}  data-toggle="pill" role="tab"  aria-selected="true">Order Summary</Link>
                        <Link  class={`${tab2==true?'nav-link active':'nav-link disabled'}`} style={{marginBottom:'5px'}} to ={path+"/address"}  data-toggle="pill" role="tab"  aria-selected="false">Address</Link>
                        <Link class={`${tab3==true?'nav-link active':'nav-link disabled'}`} style={{marginBottom:'5px'}} to ={`${path}/confirm`}  data-toggle="pill" role="tab" aria-selected="false">Place Order</Link>
                    </div>
                </div>

                <div class="col-md-8  col-sm-12">
                <Route path={path} exact ><Summary click={handletabChange}></Summary></Route>
                <Route path={`${path}/summary`} exact> <Summary click={handletabChange}></Summary></Route>
                <Route path={path+"/address"} exact >  <Address click={handletabChange2}></Address></Route>
                <Route path={`${path}/confirm`} exact > <Confirm click={handletabChange3} data={data} total={props.total}></Confirm></Route>
                </div>
            </div>
            </div>

        </>

    )
}

function mapStateToProps(state,props){
    return{
      total:state.CartReducer.totalprice,
      cart:state.CartReducer.cart,
      success:state.CartReducer.ordersuccess
    }
  };
  
export default connect(mapStateToProps)(withRouter(Checkout));
