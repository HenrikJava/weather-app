import React from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navigationBar/NavigationBar";
import "./shared/global/css/Global.css";
import { UserProvider } from "./shared/global/provider/UserProvider";
import { DataProvider } from "./shared/global/provider/DataProvider";
import { CityProvider } from "./shared/global/provider/CityProvider";
import { SignInDialogProvider } from "./shared/global/provider/SignInDialogProvider";
import { RegisterDialogProvider } from "./shared/global/provider/RegisterDialogProvider";

function App() {
  return (
    <UserProvider>
      <DataProvider>
        <CityProvider>
          <SignInDialogProvider>
            <RegisterDialogProvider>
              <Routing>
                <NavigationBar></NavigationBar>
              </Routing>
            </RegisterDialogProvider>
          </SignInDialogProvider>
        </CityProvider>
      </DataProvider>
    </UserProvider>
  );
}

export default App;
