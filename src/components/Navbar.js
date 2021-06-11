import React from 'react';
// import Img1 from '../images/4.jpg';
// import Img2 from '../images/5.jpg';
// import Img3 from '../images/3.jpg';
// import Img5 from '../images/6.jpg';
import Logo from '../images/logo1.png';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {  Link } from 'react-router-dom'  
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { CartListMiddleware } from '../reduxstore/middlewares'


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

  React.useEffect(()=>{
    if(props.isLogedIn ==true){
     // alert("i am called")
      const token = props.token;
      props.dispatch(CartListMiddleware(token)); 
    }

  },[props.isLogedIn])

//alert(props.isLogedIn);
  const changeOn=(e)=>{
    searchInput = e.target.value;
    {console.log("searchInput onchane", searchInput)}
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
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark" style={{padding:"20px",background:'#4e4344 !important'}}>
        <div className="container-fluid">
           <a className="navbar-brand" href="/">
            <img src={Logo} alt="" width="120" height="35"></img>
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
            {props.isLogedIn&&<Badge badgeContent={props.count.length==0?4:props.count.length} color="secondary">
              <ShoppingCartIcon  onClick={goToCart} style={{color:'#fff',cursor:'pointer'}}/>
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
    token:state.AuthReducer.token
  }
};

export default connect(mapStateToProps)(withRouter(Navbar));