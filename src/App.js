import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Card from "./components/Card";
import Home from "./pages/Home";
import { BrowserRouter as Router } from "react-router-dom";

/* Edamam Recipe API. Developer Plan - 10 hits / min or 10000 hits / month. Monitor usage at: https://developer.edamam.com/buyer/stats */

const App = () => {
  return (
    <Router>
      <Home />
    </Router>
  );
};

export default App;
