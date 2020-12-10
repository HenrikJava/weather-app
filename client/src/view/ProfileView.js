import React, { useContext, useEffect } from "react";
import { UserContext } from "../shared/global/provider/Provider";
import { AppContext } from "../shared/global/provider/Provider";
import { Grid, TextField, Button } from "@material-ui/core";

import "./ProfileView.css";
export const ProfileView = () => {
  const app = useContext(
    AppContext
  );

  const user = useContext(UserContext);
  useEffect(() => {
    !user.authenticatedUser ? app.setSignInDialogOpen(true) : app.setSignInDialogOpen(false);
  });
  return (
    <div className="profile-view">
      <Grid container id="main-grid">
        <Grid item xs={12} id="profile-image-cointainer">
          <img
            src={user.avatar}
            alt="profile"
            className="profile-image"
          />
        </Grid>

        <form className="profile-form">
          <Grid item xs={12} id="first-last">
            <Grid item xs={5}>
              <TextField
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 15 } }}
                label="First name"
                value={user.firstname}
                onChange={(e) => user.setFirstname(e.target.value)}
                fullWidth/>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5} className="align-right">
              <TextField
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 15 } }}
                label="Last name"
                value={user.lastname}
                onChange={(e) => user.setLastname(e.target.value)}
                fullWidth/>
            </Grid>
          </Grid>
          <Grid item xs={12} id="user-pass">
            <Grid item xs={5}>
              {/* <TextField
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 15 } }}
                label="Username"
                value={user.username}
                onChange={(e) => user.setUsername(e.target.value)}
                fullWidth/> */}
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5} className="align-right">
              <TextField
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 15 } }}
                label="Password"
                type="password"
                value={user.password}
                onChange={(e) => user.setPassword(e.target.value)}
                fullWidth/>
            </Grid>
          </Grid>
          <Grid item xs={12} id="mail-city">
            <Grid item xs={5}>
              <TextField
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 15 } }}
                label="Email"
                type="email"
                value={user.email}
                onChange={(e) => user.setEmail(e.target.value)}
                fullWidth/>
            </Grid>{" "}
            <Grid item xs={2}></Grid>
            <Grid item xs={5} className="align-right">
              <TextField
                inputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 15 } }}
                label="Favorite city"
                value={user.favouriteCity}
                onChange={(e) => user.setFavouriteCity(e.target.value)}
                fullWidth/>
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
