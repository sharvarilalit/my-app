function CartReducer(state={
    cart:[],
    totalprice:0,
    totalorders:0,
    isLoading:true,
    orders:[],
    status:false,
    ordersuccess:false
 },action){
 switch(action.type){
     case "ADDTOCART":
         state ={...state};
         state["cart"]=[];
         state["totalprice"]=0;
         state["cart"] =[...state.cart, ...action.payload.cakedata];
         state["status"] =false;
         if( state["cart"].length>0){
             state["cart"].forEach(function(x, index, arry){
                //state["totalprice"] += x.price * x.quantity;
                state["totalprice"] += x.price;
               });
         }
         else{
            state["totalprice"]=-1;
         }
        // console.log("sum is,",state["totalprice"]);
        

         state["isLoading"] =false;
         return state;
 
     case "EMPTYCART":
             state={...state};
             state["cart"]=[];
             state["status"]=true;
             state["totalprice"] =0;
             return state;
 
     case "REMOVESPECIC":
         state={...state}
         state["status"]=action.payload.status;
         return state;
    
    case "REMOVESINGLECAKE":
            state={...state}
            state["status"]=action.payload.status;
            return state;

     case "ALLORDERS":
        state["orders"]=[];
       // console.log('orders', action.payload.orders)
        if(action.payload.orders.length>0){
            state["orders"] =[...state.orders, ...action.payload.orders];
        }
        state["totalorders"] =state["orders"].length;
        state["isLoading"] =false;
        return state;

     case "PLACEORDER":
            state={...state}
            state["ordersuccess"]=action.payload.status;
            return state;
 
     default:return state;
 }
 
 }
 export default CartReducer;