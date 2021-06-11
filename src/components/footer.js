import React from 'react';
import {withRouter} from 'react-router-dom';
import '../css/styles.css'
const Footer=(props)=>{
    return(
        <>
        <div class="push"></div>
        <nav className="navbar navbar-expand-lg sticky-bottom navbar-dark bg-warning footer">
            <div className="container-fluid">
              Cakefactory © 2020 All Rights Reserved.
            </div>
        </nav>
      </>
    );
}

export default withRouter(Footer);