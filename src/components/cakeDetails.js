import React from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import Loader from "react-loader-spinner";
import Img1 from '../images/4.jpg';
import Cake from './cake';
import "../css/styles.css";
import '../css/App.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import { CartListMiddleware } from '../reduxstore/middlewares'


 function CakeDetails(props) {
    const[cakedata,setCakeData] =React.useState({});
    const[cakelist,setCakeList] =React.useState({});

    const[isLoading,setLoading] =React.useState(true);
    let { cakeid } = useParams();
    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URI+'cake/'+cakeid)
                .then(res => {
                    const Data = res.data.data;
                   // console.log("data is",Data);
                    setCakeData(Data);
                    setLoading(false)
                    //console.log('result is',res.data.data)
                })
                   
      }, [cakeid]);

      React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URI+`searchcakes?q=${cakedata.flavour}`)
                .then(res => {
                    const Data = res.data.data;
                    setCakeList(Data);
                })

      }, [cakedata]);

      const  addToCart=(e)=>{
          if(props.token==undefined){
            props.history.push('/sign-in')
          }
          else{
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

                //console.log("result", res)
                //    props.dispatch({
                //        type:'ADDTOCART',
                //        payload:{
                //          cakedata:res.data.data
                //        }
                //    });
   
                 const token = props.token;
                 props.dispatch(CartListMiddleware(token)); 
                  //  setTimeout(function(){ 
                  //    props.history.push('/cart')
                  //  }, 1000);
           } ,(error)=>{
                   console.log(error)
           })
        }
   //alert(1)
         };

    let{image,name ,description,ratings, type, ingredients, flavour,price, weight} =   cakedata;
    //console.log("cakedata",cakedata);
    return (
    
        //     <p>Using useParams:{cakeid}</p>
        //     {/* {console.log('props are',props)} */}
        <div class="container ">
            {isLoading===true?<center>
            <Loader type="Bars" color="#00BFFF" height={80} width={80} />
            </center>:
            <>
               <center>
                     <i class="fa fa-home icon"></i> &nbsp;&nbsp;<i class="fa fa-angle-double-right"></i> Cakes  &nbsp;<i class="fa fa-angle-double-right"></i>&nbsp;{type} &nbsp;&nbsp;<i class="fa fa-angle-double-right"></i>{name}
                    
               </center> 
               <br />
                <div class="card mb-3 cakeDetails" style={{maxWidth: '540px;'}}>
                <div class="row g-0">
                <div class="col-md-5 cakeDetailsImage">
                    <img src={image} alt="..." style={{width:'100%',height:'100%'}}/>
                </div>
                <div class="col-md-7">
                    <div class="card-body form">
                    <h4 class="card-title myClass" style={{fontSize:'50px'}}>{name}</h4>
                    <p class="card-text myClass">{description}</p>
                    <p class="card-text myClass head"> Ingredients </p>
                    <ul>
                        {ingredients.map(x=> <li class="text-muted myClass">{x}</li>)}
                        
                    </ul>
                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                    <p class="card-text myClass head"> Flavour  <small class="text-muted">{flavour}</small> </p>
                    <p class="card-text myClass head"> Wight  <small class="text-muted">{weight}</small> </p>

                    <p class="card-text myClass head"> Price  <small class="text-muted"> &#8377;{price}</small> </p>
                    <p class="card-text myClass head"> Ratings 
                          <Rating name="half-rating-read" defaultValue={ratings} precision={0.5} readOnly />
                    </p>
                    {/* <Link to ='/cart'><button className="button" style={{borderRadius:'0px'}} onCleck={addToCart}> Add To Cart </button></Link> */}
                    <button className="button" style={{borderRadius:'0px'}} onClick={addToCart}> Add To Cart </button>

                    </div>

                    
                </div>
                </div>
                </div>

                <center><h4 class="card-title" style={{fontSize:'30px',marginTop:'50px'}}>RELATED PRODUCTS</h4>
                {cakelist&&cakelist.length>0?<div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
                <Cake data={cakelist}/></div>:<h4 style={{color:'#635a5b'}}>No related items :(</h4>}</center>
                </>}
        </div>
        // end of container
       
    )
}

function mapStateToProps(state){
    return{
      token:state.AuthReducer.token,
    }
  };
  
  export default connect(mapStateToProps)(withRouter(CakeDetails));