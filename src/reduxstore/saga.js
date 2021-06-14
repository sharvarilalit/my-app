import {takeEvery, put, call, all} from 'redux-saga/effects';
import axios from 'axios';

function AddCake(action){
    const {description,eggless,weight, price,ingredients,cakename,caketype,flavour,uploadedImage} = action.payload.data;
    return axios({
        method:'POST',
        url:process.env.REACT_APP_BASE_URI+'addcake',
        data:{
            description:description,
            eggless:eggless,
            weight:weight,
            price:price,
            ingredients:ingredients,
            name:cakename,
            type:caketype,
            flavour:flavour,
            image:uploadedImage
        },
        headers:{
            authtoken:action.payload.token
         },
    })
}

export function *AddCakeGenerator(action,props){

        var result = yield(call(AddCake,action))
        if(result.data){
            yield put({ type:'ADD_CAKE_SUCCESS',payload:result.data})
        }
        else{
            yield put({ type:'ADD_CAKE_FAIL'})
        }
}

export default function *Rootsaga(){
    yield takeEvery('ADD_CAKE',AddCakeGenerator);
}