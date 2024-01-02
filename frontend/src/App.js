import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthToken from "./components/screens/AuthToken";
import UserProfile from "./components/screens/UserProfile";
import DoubleFactory from "./components/screens/DoubleFactory";
import PhoneAuth from "./components/screens/PhoneAuth";
import Register from "./components/screens/Register";
import Home from "./components/screens/Home";
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/access-token" element={<AuthToken />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/double-factory" element={<DoubleFactory />} />
          <Route path="/phone-auth" element={<PhoneAuth />} />
          <Route path="/register" element={<Register />} />
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
