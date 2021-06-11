import React from 'react';
import Summary from './summary';
import Confirm from './confirm';
import Address from './address';
import { Route ,Link, useRouteMatch} from 'react-router-dom'  

export default function Checkout() {
    const {path} = useRouteMatch();

    // {console.log('path in this',path)}
    return (
        <>
            My Cart
            <div class="container" >
            <div class="alert alert-dark" role="alert">
                       <h3>Your Orders </h3> 
            </div>
            <div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
                <div class="col-md-4">
                    <ul>
                        <Link to ={`${path}/summary`} >Summary</Link><br />
                        <Link to ={`${path}/confirm`}>Confirm</Link><br />
                        <Link to ={path+"/address"}>Address</Link>

                    </ul>
                </div>

                <div class="col-md-8">
                <Route path={path} exact component={Summary} /> 
                <Route path={`${path}/summary`} exact component={Summary} /> 
                <Route path={`${path}/confirm`} exact component={Confirm} /> 
                <Route path={path+"/address"} exact component={Address} /> 
                </div>
            </div>
            </div>

        </>

    )
}
