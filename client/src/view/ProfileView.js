import React, { useContext, useEffect } from "react";
import { UserContext } from "../shared/global/provider/AppProvider";
import { SignInDialogContext } from "../shared/global/provider/AppProvider";
import { Grid, TextField, Button } from "@material-ui/core";

import "./ProfileView.css";
export const ProfileView = () => {
  const [signInDialogOpen, setSignInDialogOpen] = useContext(
    SignInDialogContext
  );

  const user = useContext(UserContext);
  useEffect(() => {
    !user.authenticatedUser ? setSignInDialogOpen(true) : setSignInDialogOpen(false);
  });
  return (
    <div className="profile-view">
      <Grid container id="main-grid">
        <Grid item xs={12} id="profile-image-cointainer">
          <img
            src="https://www.thispersondoesnotexist.com/image"
            alt="user"
            className="profile-image"
          />
        </Grid>

        <form className="profile-form">
          <Grid item xs={12} id="first-last">
            <Grid item xs={5}>
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                label="First name"
                value={user.firstname}
                onChange={(e) => user.setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5} className="align-right">
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                label="Last name"
                value={user.lastname}
                onChange={(e) => user.setLastname(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} id="user-pass">
            <Grid item xs={5}>
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                label="Username"
                value={user.username}
                onChange={(e) => user.setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5} className="align-right">
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                label="Password"
                type="password"
                value={user.password}
                onChange={(e) => user.setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} id="mail-city">
            <Grid item xs={5}>
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                label="Email"
                type="email"
                value={user.mail}
                onChange={(e) => user.setMail(e.target.value)}
              />
            </Grid>{" "}
            <Grid item xs={2}></Grid>
            <Grid item xs={5} className="align-right">
              <TextField
                inputProps={{ style: { fontSize: 30 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                label="Favorite city"
                value={user.favoriteCity}
                onChange={(e) => user.setFavoriteCity(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} id="profile-button">
            <Button variant="contained" color="primary">
              Update profile
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};
