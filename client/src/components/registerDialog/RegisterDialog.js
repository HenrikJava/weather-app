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
        localStorage.setItem(
          "favouriteCity",
          loggedInUser.data.user.favourite_city
        );
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
      <DialogTitle id="dialog-title">{app.swedish ? 'Registrera' : 'Register'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="user-friendly-text">
        {app.swedish ? 'Var vänlig fyll i fälten för att skapa ett konto.' : 'Please enter the fields to create an account.'} 
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
            email: Yup.string().email().required(app.swedish ? 'Email nödvändigt' : 'Email required'),
            firstname: Yup.string()
              .required(app.swedish ? 'Förnamn nödvändigt' :"First name required")
              .min(3, app.swedish ? 'Namnet måste bestå av minst 3 bokstäver' :"Name must be at least 3 characters"),
            password: Yup.string()
              .required(app.swedish ? 'Lösenord nödvändigt' :"Password required.")
              .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                app.swedish ? 'Lösenordet måste bestå av minst 8 bokstäver, en versal, en gemen, ett nummer och ett specialtecken' :"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
              ),
            confirmPassword: Yup.string()
              .required(app.swedish ? 'Nödvändigt' :"Required")
              .oneOf([Yup.ref("password"), null], app.swedish ? 'Lösenorden måste matcha' :"Passwords must match"),
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
                  label={app.swedish ? 'Förnamn' :"First name"}
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.firstname  && touched.firstname && errors.firstname
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
                  helperText={errors.email && touched.email && errors.email}
             
                  type="email"
                  fullWidth
                />
                <TextField
                  error={errors.password && touched.password}
                  id="password"
                  label={app.swedish ? 'Lösenord' :"Password"}
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
                  id="confirm-password"
                  label={app.swedish ? 'Bekräfta lösenord' :"Confirm password"}
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
                  id="favourite-city"
                  label={app.swedish ? 'Favoritstad' :"Favourite city"}
                  name="favouriteCity"
                  value={values.favouriteCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                />

                <DialogActions id="dialog-button">
                  <Button onClick={handleClose} color="primary">
                  {app.swedish ? 'Ångra' :"Cancel"} 
                  </Button>
                  <Button type="submit" color="primary">
                  {app.swedish ? 'Registrera' :"Register"}  
                  </Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
        <DialogContentText className="link-between-dialogs-wrapper">
          <span onClick={() => openSignInDialog()} className="link-between-dialogs">
          {app.swedish ? 'Har du redan ett konto?' :" Already have an account?"}  
          </span>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
