import React from 'react';
import { Link } from 'react-router-dom';


export default function Page(props) {
    return (
        <>
            <div class="container">
            <center>
            <p> Page not Found :( </p>
            <button className="btn btn-primary" onClick={()=>props.history.push('/')}>Click here to go back Home</button>    
            {/* <Link to="/" className="btn btn-primary">Click here to go back Home</Link> */}
            </center>
            </div>
        </>
    )
}
