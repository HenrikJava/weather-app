import React from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navigationBar/NavigationBar";
import "./shared/global/css/Global.css";
import { UserProvider } from "./shared/global/provider/UserProvider";
import { WeatherProvider } from "./shared/global/provider/WeatherProvider";
import { DisplayCurrentProvider } from "./shared/global/provider/DisplayCurrentProvider";
import { CityProvider } from "./shared/global/provider/CityProvider";
import { SignInDialogProvider } from "./shared/global/provider/SignInDialogProvider";
import { RegisterDialogProvider } from "./shared/global/provider/RegisterDialogProvider";

const App = () => (
  <UserProvider>
    <WeatherProvider>
      <CityProvider>
        <SignInDialogProvider>
          <RegisterDialogProvider>
            <DisplayCurrentProvider>
              <Routing>
                <NavigationBar></NavigationBar>
              </Routing>
            </DisplayCurrentProvider>
          </RegisterDialogProvider>
        </SignInDialogProvider>
      </CityProvider>
    </WeatherProvider>
  </UserProvider>
);

export default App;
