import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginAdmin from "./LoginAdmin";
import RegisterAdmin from "./RegisterAdmin";
import MainPage from "./components/AdminSide/MainPage";


function App() {
  return (
    <div className="A">
        <Routes>
          <Route exact path="/" element={<LoginAdmin />} />
          <Route path="/main-admin" element={<MainPage />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
        </Routes>
    </div>
  );
}

export default App;
