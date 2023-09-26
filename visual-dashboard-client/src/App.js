import React from "react";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardMenu from "./pages/DashboardMenu/DashboardMenu";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<DashboardMenu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
