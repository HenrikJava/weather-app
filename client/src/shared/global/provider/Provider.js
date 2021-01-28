import React, { useState, createContext } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState();
  const [city, setCity] = useState(localStorage.getItem("favouriteCity") || "Göteborg");
  const [noCityText, setNoCityText] = useState("");
  const [displayCurrent, setDisplayCurrent] = useState(true);
  const [isAfternoon, setIsAfternoon] = useState(true);
  const [weekday, setWeekday] = useState();
  const [fahrenheitOn, setFahrenheitOn] = useState(false);
  const [sloth, setSloth] = useState("defaultSloth");
  const [isFavourite, setIsFavourite] = useState()
  return (
    <AppContext.Provider
      value={{
        registerDialogOpen,
        setRegisterDialogOpen,
        signInDialogOpen,
        setSignInDialogOpen,
        deleteConfirmDialogOpen,
        setDeleteConfirmDialogOpen,
        menuOpen,
        setMenuOpen,
        city,
        setCity,
        noCityText,
        setNoCityText,
        displayCurrent,
        setDisplayCurrent,
        isAfternoon,
        setIsAfternoon,
        weekday,
        setWeekday,
        fahrenheitOn,
        setFahrenheitOn,
        sloth,
        setSloth,
        isFavourite, setIsFavourite
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
  const [photo, setPhoto] = useState();
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
        photo,
        setPhoto,
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
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {props.children}
    </WeatherContext.Provider>
  );
};
