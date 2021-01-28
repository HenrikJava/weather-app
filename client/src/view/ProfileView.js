import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../shared/global/provider/Provider";
import { AppContext } from "../shared/global/provider/Provider";
import { Grid, TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";

import { DeleteConfirmDialog } from "../components/deleteConfirmDialog/DeleteConfirmDialog";
import * as Yup from "yup";
import {
  updateUser,
  loadUser,
  updateUserPhoto,
} from "../shared/api/service/UserService";
import "./ProfileView.css";
export const ProfileView = () => {
  const app = useContext(AppContext);
  const user = useContext(UserContext);

  const [responseMessage, setResponseMessage] = useState();
  const [hidePhotoInput, setHidePhotoInput] = useState(true);
  const [isLoading, setIsLoading] = useState();
  const loadUserAfterUpdate = async (responseFromUpdate) => {
    const loggedInUser = await loadUser();
    setIsLoading(false);
    if (loggedInUser.data.message.msgError === false) {
      user.setFirstname(loggedInUser.data.user.firstname);
      user.setEmail(loggedInUser.data.user.email);
      user.setFavouriteCity(loggedInUser.data.user.favourite_city);
      localStorage.setItem(
        "favouriteCity",
        loggedInUser.data.user.favourite_city
      );
      app.setCity(loggedInUser.data.user.favourite_city);
      if (loggedInUser.data.user.photo) {
        const b64encoded = new Buffer.from(
          loggedInUser.data.user.photo.data
        ).toString("base64");
        user.setPhoto(`data:image/png;base64,${b64encoded}`);
        
      }
      user.setAvatar(loggedInUser.data.user.avatar);
      user.setAuthenticatedUser(true);
      setResponseMessage(responseFromUpdate);
    } else {
      setResponseMessage(loggedInUser.data.message.msgBody);
      user.setAuthenticatedUser(false);
    }
  };
  const update = async (values) => {
    setResponseMessage('');

    setIsLoading(true);
    const response = await updateUser(values);
    loadUserAfterUpdate(response.data.message.msgBody);
  };
  const openDeleteConfirm = () => {
    app.setDeleteConfirmDialogOpen(true);
  };
  const uploadPhoto = async (event) => {
    setResponseMessage('');
    setIsLoading(true);
    let formData = new FormData();
    formData.append("photo", event.target.files[0]);
    event.target.value = null;
    setHidePhotoInput(true);
    const response = await updateUserPhoto(formData);
    loadUserAfterUpdate(response.data.message.msgBody);
  };
  useEffect(() => {
    // If user not logged the signin dialog should display
    !user.authenticatedUser
      ? app.setSignInDialogOpen(true)
      : app.setSignInDialogOpen(false);
  }, [app, user.authenticatedUser]);
  return (
    <div className="profile-view">
      <DeleteConfirmDialog></DeleteConfirmDialog>
      <Grid container id="profile-wrapper">
        <Grid item xs={12} id="profile-upper-wrapper">
          <Tooltip
            title={<p className="profile-delete-tooltip">Delete account</p>}
          >
            <DeleteIcon
              id="delete-icon"
              onClick={() => {
                openDeleteConfirm();
              }}
            ></DeleteIcon>
          </Tooltip>

          <span className="photo-wrapper">
            <img
              src={user.photo ? user.photo : user.avatar}
              alt="profile"
              className="profile-photo"
            />{" "}
            <span className="edit-icon-wrapper">
              <EditIcon
                id="edit-icon"
                onClick={() => {
                  setHidePhotoInput();
                }}
              />
            </span>
          </span>

          <form encType="multipart/form-data">
            <input
              hidden={hidePhotoInput}
              className="photo-input"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={uploadPhoto}
            ></input>
          </form>
        </Grid>
        {isLoading ? (
          <CircularProgress id="profile-progress-spinner"></CircularProgress>
        ) : (
          ""
        )}
        <Formik
          initialValues={{
            firstname: user.firstname,
            email: user.email,
            favouriteCity: user.favouriteCity ? user.favouriteCity : "",
            oldPassword: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, actions) => {
            update(values);
            actions.resetForm();
            actions.setFieldValue("firstname", values.firstname);
            actions.setFieldValue("email", values.email);

            actions.setFieldValue("favouriteCity", values.favouriteCity);
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
            password: Yup.string().when("oldPassword", {
              is: (oldPassword) => oldPassword && oldPassword.length > 0,
              then: Yup.string().required(
                "New password is required when entering an old one"
              ),
              otherwise: Yup.string(),
            }),
            confirmPassword: Yup.string().when("password", {
              is: (val) => val && val.length > 0,
              then: Yup.string()
                .oneOf(
                  [Yup.ref("password")],
                  "Both passwords need to be the same"
                )
                .required(),
            }),
            oldPassword: Yup.string().when("password", {
              is: (password) => password && password.length > 0,
              then: Yup.string().required(
                "Old password is required when entering a new one"
              ),
              otherwise: Yup.string(),
            }),
          },[['password', 'oldPassword']])}
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
              <form className="profile-lower-wrapper" onSubmit={handleSubmit}>
                <Grid item xs={12} id="name-city">
                  <Grid item xs={5}>
                    <TextField
                      error={errors.firstname && touched.firstname}
                      id="profile-first"
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
                      id="profile-city"
                      label="Favourite city"
                      name="favouriteCity"
                      value={
                        values.favouriteCity.charAt(0).toUpperCase() +
                        values.favouriteCity.slice(1).toLowerCase()
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} id="email-old">
                  <Grid item xs={5}>
                    <TextField
                      error={errors.email && touched.email}
                      id="profile-email"
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
                      error={errors.oldPassword && touched.oldPassword}
                      id="profile-old"
                      label="Old password"
                      type="password"
                      name="oldPassword"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.oldPassword &&
                        touched.oldPassword &&
                        errors.oldPassword
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} id="passwords">
                  <Grid item xs={5}>
                    <TextField
                      id="profile-pass"
                      error={errors.password && touched.password}
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
                      id="profile-confirm"
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
                  <p
                    className={
                      responseMessage === "Account successfully updated."
                        ? "update-success"
                        : "update-not-success"
                    }
                  >
                    {responseMessage}
                  </p>

                  <Button type="submit">Update profile</Button>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Grid>
    </div>
  );
};
