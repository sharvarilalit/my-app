import axios from "axios";
export function loginMiddleware(data){

    return function(dispatch){
        let  apiurl =process.env.REACT_APP_BASE_URI+"login";

        dispatch({
          type:"LOGIN_STARTED"
        });

        axios({method:"post",url:apiurl,data:{
          email:data.email,
          password:data.password
        }}).then((res)=>{
              //message= "Success";
             // console.log(res)
              localStorage.setItem('token',res.data.token);
              localStorage.setItem('email',res.data.email);

              dispatch({
                  type:'LOGIN',
                  payload:{
                    token:res.data.token,
                    isLogedIn:true
                  }
              });

              // setTimeout(function(){ 
              //   props.history.push('/')
              // }, 1000);
      } ,(error)=>{
              // message = error;
              dispatch({
                type:"LOGIN_FAIL"
              });
      });
    }
         
}

export function CartListMiddleware(data){
  //alert(1)
   // alert(data)
    return function(dispatch){
        axios(
            {
                method:"post",
                url:process.env.REACT_APP_BASE_URI+'cakecart',
                headers:{
                   authtoken:data
                },
                data:{}})
                    .then(res => {
                        const Data = res.data.data;
                        dispatch({
                            type:'ADDTOCART',
                            payload:{
                              cakedata:Data
                            }
                        });
                        //setcartList(Data);
                        //setLoading(false)
                        //setLoading(false)
                        //console.log('result is',res.data.data)
                    });
    }
   

}


export function RemoveCartMiddleware(data){
  // alert(data)
   return function(dispatch){
    let  apiurl =process.env.REACT_APP_BASE_URI+"clearcart";
 
           axios({
           method:"post",
           url:apiurl,
           headers:{
              authtoken:data
           },
           data:{}}).then((res)=>{
            dispatch({
              type:'EMPTYCART',
           });
         } ,(error)=>{
                 //console.log(error)
         });
      
   }
}


export function RemoveSpecificakeMiddleware(token,id,URI){
  // alert(data)
   return function(dispatch){
    let  apiurl =process.env.REACT_APP_BASE_URI+URI;
 
           axios({
           method:"post",
           url:apiurl,
           headers:{
              authtoken:token
           },
           data:{
             cakeid:id
           }}).then((res)=>{
          
            dispatch({
              type:'REMOVESPECIC',
              payload:{
                status:true
              }
           });
           
        //  CartListMiddleware(token)
         } ,(error)=>{
                 //console.log(error)
         });
      
   }
}

export function OrderMiddleware(data){
   return function(dispatch){
       axios(
           {
               method:"post",
               url:process.env.REACT_APP_BASE_URI+'cakeorders',
               headers:{
                  authtoken:data
               },
               data:{}})
                   .then(res => {
                    // console.log('orders',res.data.cakeorders)
                       const Data = res.data.error!=null?[]:res.data.cakeorders;
                       //console.log('result is',res)
                       dispatch({
                           type:'ALLORDERS',
                           payload:{
                            orders:Data
                           }
                       });
                   });
   }
  

}


export function PlaceOrderMiddleware(token,data,cart,price){
  return function(dispatch){
      axios(
          {
              method:"post",
              url:process.env.REACT_APP_BASE_URI+'addcakeorder',
              headers:{
                 authtoken:token
              },
              data:{
                city:data.city,
                name:data.username,
                address:data.address,
                pincode:data.pincode,
                phone:data.phone,
                cakes:cart,
                price:price
              }})
                  .then(res => {
                      const Data = res.data.error!=null?[]:res.data.data;
                      dispatch({
                          type:'PLACEORDER',
                          payload:{
                           success:true
                          }
                      });
                  });
  }
 

}

export function AllCakesMiddleWare(data){
    return function(dispatch){
        axios(
            {
                method:"get",
                url:process.env.REACT_APP_BASE_URI+'allcakes',
                })
                    .then(res => {
                        const Data = res.data.data;
                        dispatch({
                            type:'ALLCAKES',
                            payload:{
                              cakedata:Data
                            }
                        });
                    });
    }
}
