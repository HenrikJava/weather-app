import React, { useContext, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import RoutingPath from "../routes/RoutingPath";
import { Formik } from "formik";
import { AppContext } from "../shared/global/provider/Provider";
import { forgotPasswordUser } from "../shared/api/service/UserService";
import * as Yup from "yup";
import "./ForgotView.css";
export const ForgotView = () => {
  const [showError, setShowError] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const [success, setSuccess] = useState(false);
  const app = useContext(AppContext);
  const history = useHistory();

  const sendResetEmail = async (email) => {
    const response = await forgotPasswordUser({ email: email });
    if (response.data.message.msgError === true) {
      setResponseMessage(response.data.message.msgBody);
      setShowError(true);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="forgot-view">
      {!success ? (
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            sendResetEmail(values.email);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(
                app.swedish
                  ? "Det måste vara en giltig emailadress"
                  : "It must be a valid email address"
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
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <p className="forgot-header">
                  {app.swedish
                    ? "Var vänlig och skriv in din registrerade email"
                    : "Please enter your registred email"}
                </p>
                <TextField
                  error={errors.email && touched.email}
                  name="email"
                  id="forgot-email"
                  label="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={errors.email && touched.email && errors.email}
                  type="email"
                  fullWidth
                />
                {!showError && (
                  <Button
                    type="submit"
                    id="forgot-reset-button"
                    disabled={!isValid}
                  >
                    {app.swedish ? "Skicka" : " Send"}
                  </Button>
                )}

                {showError && (
                  <div className="forgot-error-wrapper">
                    <p className="forgot-error-message">{responseMessage}</p>
                    {responseMessage !==
                    "Something wrong at server, please try again later." ? (
                      <div className="forgot-buttons-wrapper">
                        <Button
                          type="button"
                          id="forgot-try-again-button"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowError(false);
                          }}
                        >
                          {app.swedish ? "Försök igen" : "Try again"}
                        </Button>
                        <Button
                          onClick={() => {
                            app.setRegisterDialogOpen(true);
                          }}
                          id="forgot-register-button"
                        >
                          {app.swedish ? "Registrera" : "Register"}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        id="forgot-home-button"
                        onClick={() => {
                          history.push(RoutingPath.homeView);
                          app.setDisplayCurrent(true);
                          app.setMenuOpen(false);
                          app.setNoCityText("");
                        }}
                      >
                        {app.swedish ? "Hem" : "Home"}
                      </Button>
                    )}
                  </div>
                )}
              </form>
            );
          }}
        </Formik>
      ) : (
        <div className="forgot-success-wrapper">
          <p className="forgot-success-text">
            {app.swedish
              ? "En återställningslänk är nu skickad till dig"
              : "A reset password link is sent to you"}
          </p>
          <div className="forgot-buttons-wrapper">
            <Button
              id="forgot-home-button"
              onClick={() => {
                history.push(RoutingPath.homeView);
                app.setDisplayCurrent(true);
                app.setMenuOpen(false);
                app.setNoCityText("");
              }}
            >
              {app.swedish ? "Hem" : "Home"}
            </Button>
            <Button
              id="forgot-signin-button"
              onClick={() => {
                app.setSignInDialogOpen(true);
              }}
            >
              {app.swedish ? "Logga in" : "Log in"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
