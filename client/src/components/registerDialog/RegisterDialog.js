import React, {  useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "../../shared/global/provider/AppProvider";
import {SignInDialogContext} from '../../shared/global/provider/AppProvider'

import { RegisterDialogContext } from "../../shared/global/provider/AppProvider";
export const RegisterDialog = () => {
    const [signInDialogOpen, setSignInDialogOpen] = useContext(SignInDialogContext)

  const [
    authenticatedUser,
    setAuthenticatedUser,
    username,
    setUsername,
    password,
    setPassword,
    mail,
    setMail,
    favoriteCity,
    setFavoriteCity,
  ] = useContext(UserContext);
  const [registerDialogOpen, setRegisterDialogOpen] = useContext(
    RegisterDialogContext
  );
  const register = () => {
    if (true) {
      setAuthenticatedUser(username)
      localStorage.setItem('username', username )
      handleClose();
    }
  };

  const handleClose = () => {
    setRegisterDialogOpen(false);
  };

  const openSignInDialog = () => {
    handleClose();
    setSignInDialogOpen(true);
  };

  return (
    <Dialog open={registerDialogOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the fields to create an account.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          margin="dense"
          id="mail"
          label="E-mail"
          type="email"
          fullWidth
          onChange={(event) => setMail(event.target.value)}
        />
        <TextField
          margin="dense"
          id="favoriteCity"
          label="Favorite city"
          type="text"
          fullWidth
          onChange={(event) => setFavoriteCity(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => register()} color="primary">
          Register
        </Button>
      </DialogActions>
      <DialogContentText className="link-between-dialogs">
        <span onClick={() => openSignInDialog()} >
          Already have an account?
        </span>
      </DialogContentText>
    </Dialog>
  );
};
