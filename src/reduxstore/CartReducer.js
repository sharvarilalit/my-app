function CartReducer(state={
    cart:[],
    totalprice:0,
    isLoading:true
 },action){
 switch(action.type){
     case "ADDTOCART":
         state ={...state};
         state["cart"]=[];
         state["cart"] =[...state.cart, ...action.payload.cakedata];
         state["isLoading"] =false;

         return state;
 
     case "EMPTYCART":
             state={...state};
             return state;
 
     case "REMOVEFROMCART":
         state={...state}
         return state;
 
     default:return state;
 }
 
 }
 export default CartReducer;