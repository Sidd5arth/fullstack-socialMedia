import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ToasterProvider from "./Providers/ToasterProvider";
import AppContextProvider from "./context/AppContextProvider";
import Routers from "./Common/Routers";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routers />
        <ToasterProvider />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
