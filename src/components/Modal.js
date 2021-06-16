import React,{Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddCake from './AddCake';
import "../css/styles.css";
export default class Addcake extends Component {


render() {
  return (
   
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle> <h2 style={{fontWeight:'bold'}}>Add cake</h2></DialogTitle>
        <DialogContent>
            <AddCake close={this.props.handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}
}