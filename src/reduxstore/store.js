import {combineReducers, createStore, applyMiddleware} from 'redux';
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


let middle = store => next=>action=> {

    //alert(1)
    next(action);
}
var reducers = combineReducers({AuthReducer, CartReducer})
// let store = createStore(AuthReducer);
// const store = createStore(reducers, composeWithDevTools( ));
const store = createStore(reducers, composeWithDevTools( applyMiddleware(middle,thunk)));

export default store


// store.dispatch({
//     type:"BUY_MOBILE"
// });

//console.log("state of store",store.getState())

// store.dispatch({
//     type:"BUY_LAPTOPS",
//     payload:{
//         laptop:80
//     }
// });

// store.dispatch({
//     type:"LOGOUT"
// });

console.log("state of store after update",store.getState())

