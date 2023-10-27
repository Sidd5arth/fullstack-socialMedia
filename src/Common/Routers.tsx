import React from "react";
import { Links } from "./Links";
import { Route, Routes } from "react-router-dom";

type Props = {};

const Routers = (props: Props) => {
  return (
    <>
      <Routes>
        {Links.map((route, i) => {
          return (
            <Route key={i} element={route.element} path={route.path} />
          )
        })}
      </Routes>
    </>
  );
};

export default Routers;
