import React from 'react';
import AllCakes from './AllCakes';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export default function Toaster(props) {
  return (
    <>
      <Snackbar open={props.toast} autoHideDuration={6000} 
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={props.handleClose}>
        <MuiAlert onClose={props.handleCloseToast} severity={props.class}>
          {props.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}
