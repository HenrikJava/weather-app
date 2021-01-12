import React from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navigationBar/NavigationBar";
import { UserProvider } from "./shared/global/provider/Provider";
import { WeatherProvider } from "./shared/global/provider/Provider";
import { AppProvider } from "./shared/global/provider/Provider";
import "./shared/global/css/Global.css";

const App = () => (
  <UserProvider>
    <WeatherProvider>
      <AppProvider>
        <Routing>
          <NavigationBar></NavigationBar>
        </Routing>
      </AppProvider>
    </WeatherProvider>
  </UserProvider>
);

export default App;
