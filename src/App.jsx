import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import LoginForm from "./pages/LoginForm";


const App = () => {
  return (
    <>
      {/* <LoginForm/> */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
