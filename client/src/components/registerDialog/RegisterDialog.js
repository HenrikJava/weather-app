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
  const app = useContext(AppContext);
  const user = useContext(UserContext);
  const handleClose = () => {
    app.setRegisterDialogOpen(false);
  };

  const register = async (values) => {
    await registerUser(values);
    const loggedInUser = await loadUser();

    if (loggedInUser) {
      user.setFirstname(loggedInUser.data.firstname);
      user.setLastname(loggedInUser.data.lastname);
      user.setEmail(loggedInUser.data.email);
      user.setFavouriteCity(loggedInUser.data.favourite_city);
      user.setAvatar(loggedInUser.data.avatar);
      user.setAuthenticatedUser(true);
    }
    handleClose();
  };

  const openSignInDialog = () => {
    handleClose();
    app.setSignInDialogOpen(true);
  };

  return (
    <Dialog open={app.registerDialogOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the fields to create an account.
        </DialogContentText>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
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
            confirmPassword: Yup.string().oneOf(
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
                  id="firstname"
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
                  margin="dense"
                  id="lastname"
                  label="Last name"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                />
                <TextField
                  error={errors.email && touched.email}
                  margin="dense"
                  id="mail"
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
                  id="confirmPassword"
                  label="Confirm password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
                  }
                  type="password"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="favouriteCity"
                  label="Favourite city"
                  name="favouriteCity"
                  value={values.favouriteCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                />

                <DialogActions>
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
