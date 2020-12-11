import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../shared/global/provider/Provider";
import { AppContext } from "../shared/global/provider/Provider";
import { Grid, TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import {updateUser, loadUser} from '../shared/api/service/UserService'
import "./ProfileView.css";
export const ProfileView = () => {
  const app = useContext(AppContext);
  const user = useContext(UserContext);
  
  const update = async (values) => {
    
    await updateUser(values);
    const loggedInUser = await loadUser();

    if (loggedInUser) {
      user.setFirstname(loggedInUser.data.firstname);
      user.setLastname(loggedInUser.data.lastname);
      user.setEmail(loggedInUser.data.email);
      user.setFavouriteCity(loggedInUser.data.favourite_city);
      user.setAvatar(loggedInUser.data.avatar);
      user.setAuthenticatedUser(true);
    }
   
  };
  useEffect(() => {
    !user.authenticatedUser
      ? app.setSignInDialogOpen(true)
      : app.setSignInDialogOpen(false);
  }, []);
  return (
    <div className="profile-view">
      <Grid container id="main-grid">
        <Grid item xs={12} id="profile-image-cointainer">
          <img src={user.avatar} alt="profile" className="profile-image" />
        </Grid>

        <Formik
          initialValues={{
            firstname: user.firstname,
            lastname: user.lastname? user.lastname : '',
            email: user.email,
            favouriteCity: user.favouriteCity? user.favouriteCity : '',
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            update(values);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
            firstname: Yup.string()
              .required("Required")
              .min(3, "Name must be at least 3 characters"),
            password: Yup.string()
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
              <form className="profile-form" onSubmit={handleSubmit}>
                <Grid item xs={12} id="first-last">
                  <Grid item xs={5}>
                    <TextField
                      error={errors.firstname && touched.firstname}
                      inputProps={{ style: { fontSize: 20 } }}
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      label="First name"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.firstname &&
                        touched.firstname &&
                        errors.firstname
                      }
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={5} className="align-right">
                    <TextField
                      inputProps={{ style: { fontSize: 20 } }}
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      label="Last name"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} id="mail-city">
                  <Grid item xs={5}>
                    <TextField
                      error={errors.email && touched.email}
                      inputProps={{ style: { fontSize: 20 } }}
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      label="Email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email && errors.email}
                      fullWidth
                    />
                  </Grid>{" "}
                  <Grid item xs={2}></Grid>
                  <Grid item xs={5} className="align-right">
                    <TextField
                      inputProps={{ style: { fontSize: 20 } }}
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      label="Favourite city"
                      name="favouriteCity"
                      value={values.favouriteCity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} id="passwords">
                  <Grid item xs={5}>
                    <TextField
                      error={errors.password && touched.password}
                      inputProps={{ style: { fontSize: 20 } }}
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      label="New password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={5} className="align-right">
                    <TextField
                      error={errors.confirmPassword && touched.confirmPassword}
                      inputProps={{ style: { fontSize: 20 } }}
                      InputLabelProps={{ style: { fontSize: 15 } }}
                      label="Confirm password"
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} id="profile-button">
                  <Button type="submit" variant="contained" color="primary">
                    Update profile
                  </Button>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Grid>
    </div>
  );
};
