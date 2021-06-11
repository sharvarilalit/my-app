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