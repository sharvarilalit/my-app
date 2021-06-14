function AdminReducer(state={
    cakes:[],
    totalcakes:0,
    isLoading:true,
    message:'',
    status:false,
 },action){
 switch(action.type){
     case "ALLCAKES":
         state ={...state};
         state["cakes"]=[];
         state["totalcakes"]=0;
         state["cakes"] =[...state.cakes, ...action.payload.cakedata];
         state["status"] =false;
         if( state["cakes"].length>0){
             state["cakes"].forEach(function(x, index, arry){
                state["totalcakes"] += x.price;
               });
         }
         else{
            state["totalcakes"]=-1;
         }
        // console.log("sum is,",state["totalcakes"]);
         state["isLoading"] =false;
         return state;
    

     case 'ADD_CAKE_SUCCESS':
        state ={...state};
        state["message"]="cake added Success...";
        state["status"] = true;
     return state; 
     
     case 'ADD_CAKE_FAIL':
        state ={...state};
        state["message"]="Failed...";
        state["status"] = false;
        return state; 
        
     default:return state;

 }
 
 }
 export default AdminReducer;