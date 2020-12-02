import React,{useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {SignInDialogContext} from '../../shared/global/provider/AppProvider'
import {UserContext} from '../../shared/global/provider/AppProvider'
import {RegisterDialogContext} from '../../shared/global/provider/AppProvider'
import { useHistory } from 'react-router-dom';
export const SignInDialog = () =>{
  const history = useHistory()
  const [signInDialogOpen, setSignInDialogOpen] = useContext(SignInDialogContext)
  const [loginUsername, setLoginUsername] = useState()
  const [loginPassword, setloginPassword] = useState()
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
  const [registerDialogOpen, setRegisterDialogOpen] = useContext(RegisterDialogContext)
  const login = () => {
    if (true) {setAuthenticatedUser(loginUsername)
      localStorage.setItem('username', loginUsername)
  handleClose()}
    }
  
  const handleClose = () => {
   history.push('/')
    setSignInDialogOpen(false);
  };

  const openRegisterDialog = () => {
    handleClose()
    setRegisterDialogOpen(true)
  }

  return (
    
      <Dialog  open={signInDialogOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Log in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your username and password to log in.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            onChange={event=> setLoginUsername(event.target.value) }
          />
          <TextField
            
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={event=> setloginPassword(event.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => login()} color="primary">
            Log in
          </Button>
        </DialogActions>
        <DialogContentText className="link-between-dialogs"><span onClick={()=> openRegisterDialog()} >Don't have an account yet?</span></DialogContentText>
      </Dialog>
    
  );
}