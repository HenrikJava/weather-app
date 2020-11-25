import React, { useContext, useEffect } from "react";
import { UserContext } from "../shared/global/provider/UserProvider";
import {SignInDialogContext} from '../shared/global/provider/SignInDialogProvider'

import "./ProfileView.css";
export const ProfileView = () => {
    const [signInDialogOpen, setSignInDialogOpen] = useContext(SignInDialogContext);

  const [
    authenticatedUser,
    setAuthenticatedUser,
    username,
    setUsername,
    password,
    setPassword,
    mail,
    setMail,
    favoriteCity,
    setFavoriteCity,
  ] = useContext(UserContext);
  useEffect(() => {
    !authenticatedUser? setSignInDialogOpen(true): setSignInDialogOpen(false)
  })
  return (
    <div className="profile-view">
      <form className="profile-form">
      <img
          src="https://www.thispersondoesnotexist.com/image"
          alt="picture"
          className="profile-img"
        />
        
          <label className="user">
            Username:
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="pass">
            Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
       
       
       
          <label className="mail">
            Email:
            <input
              name="mail"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </label>
          <label className="city">
            Favorite city:
            <input
              name="favoriteCity"
              type="text"
              value={favoriteCity}
              onChange={(e) => setFavoriteCity(e.target.value)}
            />
          </label>
        
        <button className='profile-button'>Update profile</button>
      </form>
    </div>
  );
};
