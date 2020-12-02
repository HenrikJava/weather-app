import React from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navigationBar/NavigationBar";
import "./shared/global/css/Global.css";
import { UserProvider } from "./shared/global/provider/AppProvider";
import { WeatherProvider } from "./shared/global/provider/AppProvider";
import { DisplayCurrentProvider } from "./shared/global/provider/AppProvider";
import { CityProvider } from "./shared/global/provider/AppProvider";
import { SignInDialogProvider } from "./shared/global/provider/AppProvider";
import { RegisterDialogProvider } from "./shared/global/provider/AppProvider";

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
