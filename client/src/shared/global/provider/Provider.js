import React, { useState, createContext } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);

  const [city, setCity] = useState("stockholm");
  const [displayCurrent, setDisplayCurrent] = useState(true);
  const [weekday, setWeekday] = useState();
  const [fahrenheitOn, setFahrenheitOn] = useState(false)
  return (
    <AppContext.Provider
      value={{
        registerDialogOpen,
        setRegisterDialogOpen,
        signInDialogOpen,
        setSignInDialogOpen,
        deleteConfirmDialogOpen, setDeleteConfirmDialogOpen,
        city,
        setCity,
        displayCurrent,
        setDisplayCurrent,
        weekday,
        setWeekday,
        fahrenheitOn, setFahrenheitOn
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};


export const UserContext = createContext();
export const UserProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [favouriteCity, setFavouriteCity] = useState();
  const [avatar, setAvatar] = useState();

  return (
    <UserContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser,

        firstname,
        setFirstname,
        lastname,
        setLastname,

       
        email,
        setEmail,
        favouriteCity,
        setFavouriteCity,
        
        avatar,
        setAvatar,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export const WeatherContext = createContext();
export const WeatherProvider = (props) => {
  const [weather, setWeather] = useState();

  return (
    <WeatherContext.Provider value={[weather, setWeather]}>
      {props.children}
    </WeatherContext.Provider>
  );
};
