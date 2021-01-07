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
import { UserContext } from "../../shared/global/provider/Provider";
import { AppContext } from "../../shared/global/provider/Provider";
export const RegisterDialog = () => {
  const [errorMessage, setErrorMessage] = useState();
  const app = useContext(AppContext);
  const user = useContext(UserContext);
  const handleClose = () => {
    app.setRegisterDialogOpen(false);
    setErrorMessage()

  };

  const register = async (values) => {
    const response = await registerUser(values);
    if (response.data.message.msgError === true) {
      setErrorMessage(response.data.message.msgBody);
    } else {
      const loggedInUser = await loadUser();
      if (loggedInUser.data.message.msgError===false) {
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

  const openSignInDialog = () => {
    handleClose();
    app.setSignInDialogOpen(true);
  };

  return (
    <Dialog open={app.registerDialogOpen} onClose={handleClose} id="register-dialog-container">
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText id="user-friendly-text">
          Please enter the fields to create an account.
        </DialogContentText>
        <DialogContentText id="errorMessage">{errorMessage}</DialogContentText>
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
              .required("Required")
              .min(3, "Name must be at least 3 characters"),
            password: Yup.string()
              .required("No password provided.")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
              ),
            confirmPassword: Yup.string().required("Required").oneOf(
              [Yup.ref("password"), null],
              "Passwords must match"
            ),
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
                  error={errors.firstname && touched.firstname}
                  margin="dense"
                  id="first-name"
                  label="First name"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.firstname && touched.firstname && errors.firstname
                  }
                  type="text"
                  fullWidth
                />
                
                <TextField
                  error={errors.email && touched.email}
                  margin="dense"
                  id="email"
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                  type="email"
                  fullWidth
                />
                <TextField
                  error={errors.password && touched.password}
                  margin="dense"
                  id="password"
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  type="password"
                  fullWidth
                />
                <TextField
                  error={errors.confirmPassword && touched.confirmPassword}
                  margin="dense"
                  id="confirm-password"
                  label="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  }
                  type="password"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="favourite-city"
                  label="Favourite city"
                  name="favouriteCity"
                  value={values.favouriteCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                />

                <DialogActions id="dialog-buttons">
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
