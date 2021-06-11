//import logo from './logo.svg';
import React from 'react';
import './css/App.css';
import Navbar from './components/Navbar';
import  SignUpPrac from './components/signup';
import SignIn from './components/signIn';
// import  Cake from './components/cake';
//import CakeView from './components/cakeMain';
import CakeList from './components/cakeList'
import PageNotFound from './components/pageNotFound';
import CakeDetails from './components/cakeDetails'
import SearchCake from './components/search'
import Footer from './components/footer';
import Cart from './components/cart';
import CheckOut from'./components/checkout';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'  

function Welcome(){
  return <p>Wlcome To react js</p>
}

//const data =[{"owner":{"email":"ns32545@gmail.com","name":"Nitesh Solanki"},"description":"vanillaCake","createdat":"2021-03-10T04:07:55.562Z","likes":10,"ratings":4.5,"reviews":100,"type":"Anniversary","flavour":"butterscotch","eggless":true,"ingredients":["dcsvcs"],"_id":"60484ccd8cdca80024af6a64","name":"vanilla","price":500,"image":"https://res.cloudinary.com/ashudev/image/upload/v1615350980/mszejpaua0qr3ixkwukn.jpg","weight":1,"cakeid":1615350989324,"__v":0},{"owner":{"email":"ns32545@gmail.com","name":"Nitesh Solanki"},"description":"vanillaCake","createdat":"2021-03-10T04:07:55.562Z","likes":10,"ratings":4.5,"reviews":100,"type":"Anniversary","flavour":"butterscotch","eggless":true,"ingredients":["dcsvcs"],"_id":"604856f68cdca80024af6a69","name":"vanilla","price":236,"image":"https://res.cloudinary.com/ashudev/image/upload/v1615353582/wazbkxu9py8yztimxs3k.jpg","weight":3,"cakeid":1615353590517,"__v":0},{"owner":{"email":"shalini98.svms@gmail.com","name":"Shalini"},"description":"Tasty","createdat":"2021-03-26T02:27:39.322Z","likes":10,"ratings":4.5,"reviews":100,"type":"Celebration","flavour":"vanilla","eggless":true,"ingredients":["rich cream"],"_id":"605d71ad41ad3f00244f54c8","name":"Vanilla Treat","weight":3,"price":849,"image":"https://res.cloudinary.com/ashudev/image/upload/v1616736677/bgu4yt9uamzdlxdtuhn6.jpg","cakeid":1616736685712,"__v":0},{"owner":{"email":"ramyasidambaram@gmail.com","name":"Ramya"},"description":"Every cake we offer is handcrafted and since each chef has his/her own way of baking and designing a cake, there might be slight variation in the product in terms of design and shape.","createdat":"2021-03-26T02:27:39.322Z","likes":10,"ratings":4.5,"reviews":100,"type":"Birthday","flavour":"vanilla","eggless":true,"ingredients":["flour","sugar","vanilla extract","cream"],"_id":"605d865241ad3f00244f54f8","name":"Vanilla Photo Cake","weight":1,"price":1000,"image":"https://res.cloudinary.com/ashudev/image/upload/v1616741962/owld8ec9ecbbq0r64xis.jpg","cakeid":1616741970813,"__v":0},{"owner":{"email":"rathorericha647@gmail.com","name":"richaaa647"},"description":"this is very delicious cake","createdat":"2021-05-26T04:13:28.252Z","likes":10,"ratings":4.5,"reviews":100,"type":"Wedding","flavour":"vanilla","eggless":true,"ingredients":["almond"],"_id":"60ae1805586ba900246e4971","image":"https://res.cloudinary.com/ashudev/image/upload/v1622022114/jjpdy0ynrl1jijrvlqkq.jpg","name":"Vanilla cake","price":1300,"weight":4,"cakeid":1622022149886,"__v":0}]

function App() {

  let [button, setButton] =React.useState(false);
  let [disLike, setDislike] =React.useState(0);

  //let shouldSetStateToLoading = disLike && disLike<=10
  React.useEffect(() => {
    if(localStorage.token){
          axios({
            method:'get',
            url:process.env.REACT_APP_BASE_URI+'getuserdetails',
            headers:{
              authtoken:localStorage.token
            }
          }).then(res => {
            //const Data = res.data.data;
            //setData(Data);
            console.log('result is',res)
        })
    }        
  }, [])

  const handleClick =()=>{
    //alert(1)
    setButton(!button)
    setDislike(disLike++)
  }

  return (
    // <div className="App">
    //   <Navbar p1="10" p2="20" click={handleClick} button={button}><p>Sharvari</p></Navbar>
    //   <SignUpPrac click={handleClick}/>
    //   <CakeList />
    //   <SignIn />
    //   {/* <CakeView /> */}
    //   {/* {Welcome()} */}
    //   {/* <button onClick={handleClick}>ffdddg</button> */}
    // </div>
      <Router>  
          <Navbar p1="10" p2="20" click={handleClick} button={button}><p>Sharvari</p></Navbar>
          <Switch>
          <Route path="/" exact component={CakeList} />  
          <Route path="/sign-up" exact><SignUpPrac click={handleClick}></SignUpPrac> </Route>
          {/* <Route path="/sign-up" exact component={(props)=><SignUpPrac {...props} click={handleClick}/>}/>   */}
         {localStorage&&<Route path="/sign-in" exact component={SignIn} />} 
          <Route path="/cake/:cakeid" exact component={CakeDetails} /> 
          <Route path="/searchdetails" exact component={SearchCake} /> 
          {localStorage&&<Route path="/cart" exact component={Cart} /> }
          {localStorage&&<Route path="/checkout" component={CheckOut} /> }
          <Route path="/*" exact component={PageNotFound} />  

          </Switch>
          <Footer  />
      </Router> 

  );
}

export default App;
