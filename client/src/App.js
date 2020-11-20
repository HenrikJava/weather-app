import React from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navigationBar/NavigationBar";
import "./shared/global/css/Global.css";
import { UserProvider } from "./shared/global/provider/UserProvider";
import { DataProvider } from "./shared/global/provider/DataProvider";
import { CityProvider } from "./shared/global/provider/CityProvider";

function App() {
  return (
    <UserProvider>
      <DataProvider>
        <CityProvider>
          <NavigationBar />
          <Routing />
        </CityProvider>
      </DataProvider>
    </UserProvider>
  );
}

export default App;
