import React from 'react';
import Cart from './cart';

export default function  Summary(props) {
    return (
       
             <Cart show={false} click={props.click}/>
    )
}
