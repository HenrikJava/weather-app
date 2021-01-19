import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { loginUser, loadUser } from "../../shared/api/service/UserService";
import { UserContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
import { useHistory } from "react-router-dom";
export const SignInDialog = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const user = useContext(UserContext);
  const app = useContext(AppContext);

  const login = async (event) => {
    event.preventDefault();
    const response = await loginUser(email, password);
    if (response.data.message.msgError === true) {
      setErrorMessage(response.data.message.msgBody);
    } else {
      const loggedInUser = await loadUser();
      if (loggedInUser.data.message.msgError === false) {
        user.setFirstname(loggedInUser.data.user.firstname);
        user.setEmail(loggedInUser.data.user.email);
        user.setFavouriteCity(loggedInUser.data.user.favourite_city);
        user.setAvatar(loggedInUser.data.user.avatar);
        if (loggedInUser.data.user.photo) {
          /* const b64encoded = new Buffer.from(
            loggedInUser.data.user.photo.data
          ).toString("base64");
          user.setPhoto(`data:image/png;base64,${b64encoded}`); */
          user.setPhoto(loggedInUser.data.user.photo)

        }
        user.setAuthenticatedUser(true);
        handleClose();
      } else {
        setErrorMessage(loggedInUser.data.message.msgBody);
      }
    }
  };

  const handleClose = () => {
    history.push("/");
    app.setSignInDialogOpen(false);
    setErrorMessage();
  };

  const openRegisterDialog = () => {
    app.setSignInDialogOpen(false);
    setErrorMessage();
    app.setRegisterDialogOpen(true);
  };

  return (
    <Dialog
      open={app.signInDialogOpen}
      onClose={handleClose}
      id="sign-in-dialog-wrapper"
    >
      <form onSubmit={login}>
        <DialogTitle id="dialog-title">Log in</DialogTitle>
        <DialogContent>
          <DialogContentText id="user-friendly-text">
            Please enter your email and password to log in.
          </DialogContentText>
          <DialogContentText id="error-message">
            {errorMessage}
          </DialogContentText>
          <TextField
            autoFocus
            id="email"
            label="Email"
            type="email"
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions id="dialog-button">
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Log in
          </Button>
        </DialogActions>
        <DialogContentText className="link-between-dialogs">
          <span onClick={() => openRegisterDialog()}>
            Don't have an account yet?
          </span>
        </DialogContentText>
      </form>
    </Dialog>
  );
};
