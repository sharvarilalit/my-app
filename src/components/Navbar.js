import React from 'react';
// import Img1 from '../images/4.jpg';
// import Img2 from '../images/5.jpg';
// import Img3 from '../images/3.jpg';
// import Img5 from '../images/6.jpg';
import Logo from '../images/logo4.png';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShopIcon from '@material-ui/icons/Shop';
import {  Link } from 'react-router-dom'  
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { CartListMiddleware , OrderMiddleware} from '../reduxstore/middlewares';


const Navbar=(props)=>{
  //const[searchInput, setSearchInput]=React.useState("kuch bhi")
  let [button, setButton] =React.useState(false);
  let searchInput ="";


  const search=(e)=>{
   // alert(2)
    e.preventDefault();
    if(searchInput&&searchInput.length>0){
      //alert(searchInput);
      let url="/searchdetails?q="+searchInput
      //{console.log(searchInput)}
      props.history.push(url)
    }
    else{
      props.history.push('/')
    }
    
  }

  const goToCart=(e)=>{
     props.history.push('/cart')
  }
  const goToOrders=(e)=>{
    props.history.push('/my-orders')
 }

  React.useEffect(()=>{
    if(props.isLogedIn ==true || props.status==true){
     // alert("i am called")
      const token = props.token;
      props.dispatch(CartListMiddleware(token)); 
      props.dispatch(OrderMiddleware(token)); 
    }

  },[props.isLogedIn,props.status])

//alert(props.isLogedIn);
  const changeOn=(e)=>{
    searchInput = e.target.value;
    // eslint-disable-next-line no-lone-blocks
    //{console.log("searchInput onchane", searchInput)}
   // setSearchInput(e.target.value)
  }

  const logOut =()=>{
    props.dispatch({
      type:'LOGOUT',
    });
    //localStorage.clear()
    props.history.push('/')
  }

  const handleClick =()=>{
    setButton(!button)
    props.click();
  }
  console.log('props in this',props)
    return(
        <>
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark" style={{background:'#4e4344 !important'}}>
        <div className="container-fluid">
           <a className="navbar" href="/" >
            <img src={Logo} alt=""  height="58"></img>
           </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
               {localStorage.getItem("token")===null?<Link to='/sign-in' style={{color:'#fff'}}>SignIn | </Link>:null}
               {localStorage.getItem("token")===null?<Link to='/sign-up' style={{color:'#fff'}}>SignUp </Link>:null}
                {props.isLogedIn?<Link to='/' style={{color:'#fff'}} onClick={logOut}>LogOut</Link>:null}
              </li>
              {/* <button onClick={handleClick}>{props.button&&props.button==true?"Logout":"Login"}</button> */}
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={changeOn} />
              {/* <button className="btn btn-outline-success" type="submit" onClick={(e)=>alert("hii")}>Search</button> */}
              <button type="button" class="btn btn-warning" type="submit" onClick={search}>Search</button>
            </form>
            &nbsp;
            {props.isLogedIn&&<Badge badgeContent={props.count.length==0?0:props.count.length} color="secondary">
              <ShoppingCartIcon  onClick={goToCart} style={{color:'#fff',cursor:'pointer'}}/>
            </Badge> }&nbsp;&nbsp;

            {props.isLogedIn&&<Badge badgeContent={props.count.ordercount==0?1:props.ordercount.length} color="secondary">
              <ShopIcon  onClick={goToOrders} style={{color:'#fff',cursor:'pointer'}}/>
            </Badge>}
          </div>
        </div>
      </nav>
        {/* {searchInput} */}
       
      </>
    );
}

function mapStateToProps(state,props){
  //alert(JSON.stringify(state) )
  return{
    isLogedIn:state.AuthReducer.isLogedIn,
    count:state.CartReducer.cart,
    ordercount:state.CartReducer.totalorders,
    token:state.AuthReducer.token,
    status:state.CartReducer.status
  }
};

export default connect(mapStateToProps)(withRouter(Navbar));