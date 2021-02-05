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
import RoutingPath from "../../routes/RoutingPath";
import { CircularProgress } from "@material-ui/core";
export const SignInDialog = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState();
  const user = useContext(UserContext);
  const app = useContext(AppContext);

  const login = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const response = await loginUser(email, password);
    if (response.data.message.msgError === true) {
      if (
        response.data.message.msgBody ===
          "The password or email is not valid" &&
        app.swedish
      ) {
        setErrorMessage("Lösenordet eller emailen är felaktig.");
      } else {
        setErrorMessage(response.data.message.msgBody);
      }
    } else {
      const loggedInUser = await loadUser();
      if (loggedInUser.data.message.msgError === false) {
        app.setFahrenheitOn(
          loggedInUser.data.user.fahrenheit_on
            ? loggedInUser.data.user.fahrenheit_on
            : false
        );
        app.setSwedish(
          loggedInUser.data.user.swedish
            ? loggedInUser.data.user.swedish
            : false
        );
        user.setFirstname(loggedInUser.data.user.firstname);
        user.setEmail(loggedInUser.data.user.email);
        user.setFavouriteCity(loggedInUser.data.user.favourite_city);
        localStorage.removeItem(
          "favouriteCity"
          
        );

        user.setAvatar(loggedInUser.data.user.avatar);
        if (loggedInUser.data.user.photo) {
          const b64encoded = new Buffer.from(
            loggedInUser.data.user.photo.data
          ).toString("base64");
          user.setPhoto(`data:image/png;base64,${b64encoded}`);
        }
        user.setAuthenticatedUser(true);
        handleClose();
      } else {
        setErrorMessage(loggedInUser.data.message.msgBody);
      }
    }
    setIsLoading(false);
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
  const openForgotPassword = () => {
    app.setSignInDialogOpen(false);
    history.push(RoutingPath.forgotView);
  };

  return (
    <Dialog
      open={app.signInDialogOpen}
      onClose={handleClose}
      id="sign-in-dialog-wrapper"
    >
      <form onSubmit={login}>
        <DialogTitle id="dialog-title">
          {app.swedish ? "Logga in" : "Log in"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="user-friendly-text">
            {app.swedish
              ? "Var vänlig skriv in email och lösenord."
              : "Please enter your email and password."}
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
            label={app.swedish ? "Lösenord" : "Password"}
            type="password"
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions id="dialog-button">
          <Button onClick={handleClose} color="primary">
            {app.swedish ? "Ångra" : "Cancel"}
          </Button>
          <Button color="primary" type="submit">
            {app.swedish ? "Logga in" : "Log in"}
          </Button>
        </DialogActions>
        <DialogContentText className="link-between-dialogs-wrapper">
          <span
            onClick={() => openForgotPassword()}
            className="link-between-dialogs"
          >
            {app.swedish ? "Glömt lösenord?" : "Forgot password?"}
          </span>
          <span
            onClick={() => openRegisterDialog()}
            className="link-between-dialogs"
          >
            {app.swedish
              ? "Har du inget konto än?"
              : "Don't have an account yet?"}
          </span>
        </DialogContentText>
      </form>
      {isLoading && (
        <CircularProgress id="sign-in-progress-spinner"></CircularProgress>
      )}
    </Dialog>
  );
};
