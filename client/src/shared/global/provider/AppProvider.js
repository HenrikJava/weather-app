import React, { useState, createContext } from "react";

export const RegisterDialogContext = createContext();
export const RegisterDialogProvider = (props) => {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  return (
    <RegisterDialogContext.Provider
      value={[registerDialogOpen, setRegisterDialogOpen]}
    >
      {props.children}
    </RegisterDialogContext.Provider>
  );
};

export const SignInDialogContext = createContext();
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
};
export const UserContext = createContext();
export const UserProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [mail, setMail] = useState();
  const [favoriteCity, setFavoriteCity] = useState();
  const [celciusOn, setcelciusOn] = useState(true);

  return (
    <UserContext.Provider
      value={[
        authenticatedUser,
        setAuthenticatedUser,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        username,
        setUsername,
        password,
        setPassword,
        mail,
        setMail,
        favoriteCity,
        setFavoriteCity,
        celciusOn,
        setcelciusOn,
      ]}
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
