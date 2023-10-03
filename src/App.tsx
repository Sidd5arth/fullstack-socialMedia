import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Components/ProfileComp/Profile";
import Post from "./Pages/Post";
import AuthPage from "./Pages/AuthPage";
import AppContextProvider from "./context/AppContextProvider";
function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
