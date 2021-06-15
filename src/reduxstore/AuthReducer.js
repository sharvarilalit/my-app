function AuthReducer(state={
    //laptops:undefined,
    //mobile:10,
    isLoading:false,
    isLogedIn:localStorage.token?true:false,
    token:localStorage.token,
    username:localStorage.email,
    success:"",
    status:false,
},action){
switch(action.type){
    // case "BUY_LAPTOPS":
    //     state.laptops=action.payload?.laptop;
    //     return state;
    // case "BUY_MOBILE":
    //         state.mobile=state.mobile-1;
    //         return state;
    case "LOGIN_STARTED" :{
        state = {...state}
        state["isloading"]  = true
        return state
    }
    case "LOGIN":
        state={...state}
        state["token"]=action.payload?.token;
        state["isLogedIn"] = action.payload?.isLogedIn;
        state["isLoading"] =true;
        state["success"] ="Login Successful !";
        state["status"] =true;
        //alert(state.token)
        return state;

    case "LOGIN_FAIL" :{
            state = {...state}
            state["isLogedIn"]=false;
            state["isloading"] = false;
            state["success"] ="Login Failed !";
            state["status"] =false;
            return state;
          }
          
    case "LOGOUT":
        state={...state}
        state["token"]=undefined;
        state["isLogedIn"] = false;
        state["isLoading"] =false;
        state["success"] ='';
        state["status"] =false;
        localStorage.clear();
        return state;

    default:return state;
}

}
export default AuthReducer;