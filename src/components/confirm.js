import React from 'react'

export default function confirm(props) {
    console.log('props',props)
    return (
        <div>
            <center><h3>Confirm Details</h3></center>
            <div class="container ">
                <div class="card mb-3 cakeDetails" style={{maxWidth: '540px;'}}>
                <div class="row g-0">
                <div class="col-md-12">
                    <div class="card-body">
                   
                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                    <p class="card-text myClass2 head"> Name : <small class="text-muted">{props.data.username}</small> </p>
                    <p class="card-text myClass2 head"> Phone Number: <small class="text-muted"> {props.data.phone}</small> </p>

                    <p class="card-text myClass2 head"> Delivery Area:  <small class="text-muted"> {props.data.address}</small> </p>
                    <p class="card-text myClass2 head"> Payment Mode : <small class="text-muted"> Cash on Delivery</small> </p>
                    <p class="card-text myClass2 head"> Total Amount : <small class="text-muted"> &#8377;{props.total}</small> </p>


                    <button className="button" style={{borderRadius:'0px'}} onClick={(e)=>props.click()}> Place order </button>

                    </div>
                </div>
                </div>
                </div>
        </div>
        </div>
    )
}
