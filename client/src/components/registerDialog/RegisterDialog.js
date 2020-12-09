import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { registerUser } from "../../shared/api/service/User";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignInDialogContext } from "../../shared/global/provider/AppProvider";
import { UserContext } from "../../shared/global/provider/AppProvider";

import { RegisterDialogContext } from "../../shared/global/provider/AppProvider";
export const RegisterDialog = () => {
  const [signInDialogOpen, setSignInDialogOpen] = useContext(
    SignInDialogContext
  );
  const [registerDialogOpen, setRegisterDialogOpen] = useContext(
    RegisterDialogContext
  );
  const user = useContext(UserContext);
  const handleClose = () => {
    setRegisterDialogOpen(false);
  };

  const register = async (values) => {
    const res = await registerUser(values);
    user.setAuthenticatedUser(res.status===200);
    handleClose();
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
        <Formik
          initialValues={{
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
            favouriteCity: "",
          }}
          onSubmit={(values) => {
            /*   setAuthenticatedUser(values.username); */
            /*             localStorage.setItem("username", values.username);
             */ register(values);
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
            password2: Yup.string().oneOf(
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
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                />
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
                  label="E-mail"
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
                  error={errors.password2 && touched.password2}
                  margin="dense"
                  id="password2"
                  label="Password2"
                  name="password2"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password2 && touched.password2 && errors.password2
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
