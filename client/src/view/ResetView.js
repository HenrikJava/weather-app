import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import {
  updatePasswordUser,
  checkTokenUser,
} from "../shared/api/service/UserService";
import RoutingPath from "../routes/RoutingPath";
import { AppContext } from "../shared/global/provider/Provider";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { setAuthToken } from "../shared/global/functions";

import "./ResetView.css";
export const ResetView = (props) => {
  const [updated, setUpdated] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const app = useContext(AppContext);
  const history = useHistory();

  const updatePassword = async (values) => {
    const response = await updatePasswordUser(values, props.match.params.token);
    if (response.data.message.msgError === true) {
      setUpdated(false);
      setError(true);
      setIsLoading(false);
      setResponseMessage(response.data.message.msgBody);
    } else {
      setUpdated(true);
      setError(false);
      setIsLoading(false);
      setResponseMessage(app.swedish ? 'Lösenordet är uppdaterat' : response.data.message.msgBody);
      setAuthToken();
    }
  };

  useEffect(() => {
    const checkIfTokenIsValid = async () => {
      const response = await checkTokenUser(props.match.params.token);
      if (response.data.message.msgError === true) {
        setUpdated(false);
        setError(true);
        setIsLoading(false);
        setResponseMessage(response.data.message.msgBody);
      } else {
        setUpdated(false);
        setError(false);
        setIsLoading(false);
        setResponseMessage(response.data.message.msgBody);
      }
    };
    checkIfTokenIsValid();
  }, [props.match.params.token]);

  if (error) {
    return (
      <div className="reset-view">
        <div className="reset-wrapper">
          <p className="reset-header">
            {app.swedish ? "Återställ lösenord" : "Reset password"}
          </p>
          <div className="reset-error-wrapper">
            <p className="reset-error-message">{responseMessage}</p>
            <div className="reset-buttons-wrapper">
              <Button
                id="reset-home-button"
                onClick={() => {
                  history.push(RoutingPath.homeView);
                  app.setDisplayCurrent(true);
                  app.setMenuOpen(false);
                  app.setNoCityText("");
                }}
              >
                {app.swedish ? "Hem" : "Home"}
              </Button>{" "}
              <Button
                id="reset-forgot-button"
                onClick={() => {
                  history.push(RoutingPath.forgotView);
                }}
              >
                {app.swedish ? "Försök igen" : "Try again"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="reset-view">
        <div className="reset-wrapper">
          <p className="reset-header">
            {app.swedish ? "Återställ lösenord" : "Reset password"}
          </p>

          <p>{app.swedish ? "Laddar data" : "Loading data"}</p>
        </div>
      </div>
    );
  } else if (updated) {
    return (
      <div className="reset-view">
        <div className="reset-success-wrapper">
          <p className="reset-text-success">{responseMessage}</p>
          <div className="reset-buttons-wrapper">
            <Button
              id="reset-home-button"
              onClick={() => {
                history.push(RoutingPath.homeView);
                app.setDisplayCurrent(true);
                app.setMenuOpen(false);
                app.setNoCityText("");
              }}
            >
              {app.swedish ? "Hem" : "Home"}
            </Button>{" "}
            <Button
              id="reset-signin-button"
              onClick={() => {
                app.setSignInDialogOpen(true);
              }}
            >
              {app.swedish ? "Logga in" : "Log in"}
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="reset-view">
        <div className="reset-wrapper">
          <p className="reset-header">
            {app.swedish ? "Återställ lösenord" : "Reset password"}
          </p>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, actions) => {
              updatePassword(values);
              actions.resetForm();
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .required(
                  app.swedish ? "Lösenord nödvändigt" : "Password required."
                )
                .matches(
                  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                  app.swedish
                    ? "Lösenordet måste bestå av minst 8 bokstäver, en versal, en gemen, ett nummer och ett specialtecken"
                    : "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
                ),
              confirmPassword: Yup.string()
                .required(app.swedish ? "Nödvändigt" : "Required")
                .oneOf(
                  [Yup.ref("password"), null],
                  app.swedish
                    ? "Båda lösenorden måste vara identiska"
                    : "Both passwords need to be the same"
                ),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isValid,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form className="reset-form-wrapper" onSubmit={handleSubmit}>
                  <TextField
                    autoFocus
                    id="reset-pass"
                    error={errors.password && touched.password}
                    label={app.swedish ? "Nytt lösenord" : "New password"}
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

                  <TextField
                    error={errors.confirmPassword && touched.confirmPassword}
                    id="reset-confirm"
                    label={
                      app.swedish ? "Bekräfta lösenord" : "Confirm password"
                    }
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

                  <Button
                    id="reset-update-button"
                    type="submit"
                    disabled={!isValid}
                  >
                    {app.swedish ? "Uppdatera" : "Update"}
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }
};
