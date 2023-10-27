import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ToasterProvider from "./Providers/ToasterProvider";
import Home from "./Pages/Home";
import AuthPage from "./Pages/AuthPage";
import AppContextProvider from "./context/AppContextProvider";
import Routers from "./Common/Routers";
// import Connection from "./Components/Connections/Connection";
// import CreatePost from "./Components/CreatePost";

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
