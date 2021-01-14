import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { registerUser, loadUser } from "../../shared/api/service/UserService";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
export const RegisterDialog = () => {
  const [errorMessage, setErrorMessage] = useState();
  const app = useContext(AppContext);
  const user = useContext(UserContext);
  const history = useHistory();

  const register = async (values) => {
    const response = await registerUser(values);
    if (response.data.message.msgError === true) {
      setErrorMessage(response.data.message.msgBody);
    } else {
      const loggedInUser = await loadUser();
      if (loggedInUser.data.message.msgError === false) {
        user.setFirstname(loggedInUser.data.user.firstname);
        user.setEmail(loggedInUser.data.user.email);
        user.setFavouriteCity(loggedInUser.data.user.favourite_city);
        user.setAvatar(loggedInUser.data.user.avatar);
        user.setAuthenticatedUser(true);
        handleClose();
      } else {
        setErrorMessage(loggedInUser.data.message.msgBody);
      }
    }
  };

  const handleClose = () => {
    history.push("/");
    app.setRegisterDialogOpen(false);
    setErrorMessage();
  };

  const openSignInDialog = () => {
    app.setRegisterDialogOpen(false);
    setErrorMessage();
    app.setSignInDialogOpen(true);
  };

  return (
    <Dialog
      open={app.registerDialogOpen}
      onClose={handleClose}
      id="register-dialog-container"
    >
      <DialogTitle id="dialog-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText id="user-friendly-text">
          Please enter the fields to create an account.
        </DialogContentText>
        <DialogContentText id="error-message">{errorMessage}</DialogContentText>
        <Formik
          initialValues={{
            firstname: "",
            email: "",
            password: "",
            confirmPassword: "",
            favouriteCity: "",
          }}
          onSubmit={(values) => {
            register(values);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
            firstname: Yup.string()
              .required("First name required")
              .min(3, "Name must be at least 3 characters"),
            password: Yup.string()
              .required("Password required.")
              .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
              ),
            confirmPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <TextField
                autoFocus
                  error={errors.firstname && touched.firstname}
                  id="first-name"
                  label="First name"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.firstname
                  }
                  type="text"
                  fullWidth
                />

                <TextField
                  error={errors.email && touched.email}
                  id="email"
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email}
                  type="email"
                  fullWidth
                />
                <TextField
                  error={errors.password && touched.password}
                  id="password"
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password 
                  }
                  type="password"
                  fullWidth
                />
                <TextField
                  error={errors.confirmPassword && touched.confirmPassword}
                  id="confirm-password"
                  label="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.confirmPassword
                    }
                  type="password"
                  fullWidth
                />
                <TextField
                  id="favourite-city"
                  label="Favourite city"
                  name="favouriteCity"
                  value={values.favouriteCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                />

                <DialogActions id="dialog-button">
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Register
                  </Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
        <DialogContentText className="link-between-dialogs">
          <span onClick={() => openSignInDialog()}>
            Already have an account?
          </span>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
