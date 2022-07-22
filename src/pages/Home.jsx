import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Card from "../components/Card";
import Foodnav from "../components/Foodnav";
import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Cuisine from "./Cuisine";
import "./Home.css";
import Shuffle from "../components/Shuffle";
import Usersearch from "./Usersearch";
import Recipe from "./Recipe";
import Contact from "./Contact";
import About from "./About";

const Home = () => {
  const API_ID = "c82a400d";
  const API_KEY = "683feaaa9a84fdc2ac96e918f2ea09cf";
  const [recipes, setRecipes] = useState([]);
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  // const { REACT_API_ID, REACT_API_KEY } = process.env;

  useEffect(() => {
    console.log("use");
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${API_ID}&app_key=${API_KEY}`
      )
      .then((res) => {
        setRecipes(res.data.hits);
        console.log("data: ", res.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  //console.log(recipes);

  const onSearchChange = (event) => {
    // get value of text that is being typed
    setSearchField(event.target.value);
    //console.log(searchField);
  };

  const submitHandler = (event) => {
    // handle search submits
    console.log("submited");
    event.preventDefault(); // prevent default of refreshing
    navigate("/userSearch/" + searchField);
  };

  return (
    <div className="home">
      {/* <Router> */}
      <Routes>
        <Route
          path="/about"
          element={
            <Fragment>
              <Navbar />
              <About />
            </Fragment>
          }
        />
        <Route
          path="/contact"
          element={
            <Fragment>
              <Navbar />
              <Contact />
            </Fragment>
          }
        />
        <Route path="/recipe/:name" element={<Recipe />} />
        <Route
          path="/"
          exact
          element={
            <Fragment>
              <Navbar />
              <Searchbar
                searchChange={onSearchChange}
                submitHandler={submitHandler}
              />
              <Foodnav />
              <Card recipes={recipes} />
              <Shuffle recipes={recipes} />
            </Fragment>
          }
        />

        <Route
          path="/cuisine/:type"
          element={
            <Fragment>
              <Navbar />
              <Foodnav />
              <Cuisine />
            </Fragment>
          }
        />
        <Route
          path="/userSearch/:search"
          element={
            <Fragment>
              <Navbar />
              <Searchbar
                searchChange={onSearchChange}
                submitHandler={submitHandler}
              />
              <Foodnav />
              <Usersearch />
            </Fragment>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default Home;
