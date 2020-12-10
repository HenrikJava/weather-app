import React, { useState, createContext } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);
  const [city, setCity] = useState("stockholm");
  const [displayCurrent, setDisplayCurrent] = useState(true);
  const [weekday, setWeekday] = useState();
  return (
    <AppContext.Provider
      value={{
        registerDialogOpen,
        setRegisterDialogOpen,
        signInDialogOpen,
        setSignInDialogOpen,
        city,
        setCity,
        displayCurrent,
        setDisplayCurrent,
        weekday,
        setWeekday,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

/* export const SignInDialogContext = createContext();
export const SignInDialogProvider = (props) => {
  const [signInDialogOpen, setSignInDialogOpen] = useState(false);

  return (
    <SignInDialogContext.Provider
      value={[signInDialogOpen, setSignInDialogOpen]}
    >
      {props.children}
    </SignInDialogContext.Provider>
  );
};
export const CityContext = createContext();
export const CityProvider = (props) => {
  const [city, setCity] = useState("stockholm");

  return (
    <CityContext.Provider value={[city, setCity]}>
      {props.children}
    </CityContext.Provider>
  );
};
export const DisplayCurrentContext = createContext();
export const DisplayCurrentProvider = (props) => {
  const [displayCurrent, setDisplayCurrent] = useState(true);
  const [weekday, setWeekday] = useState();

  return (
    <DisplayCurrentContext.Provider
      value={[displayCurrent, setDisplayCurrent, weekday, setWeekday]}
    >
      {props.children}
    </DisplayCurrentContext.Provider>
  );
}; */
export const UserContext = createContext();
export const UserProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [favouriteCity, setFavouriteCity] = useState();
  const [celciusOn, setCelciusOn] = useState(true);
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

        password,
        setPassword,
        email,
        setEmail,
        favouriteCity,
        setFavouriteCity,
        celciusOn,
        setCelciusOn,
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
