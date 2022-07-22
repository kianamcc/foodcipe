import React from "react";
import "./Card.css";
import sam from "../assets/sammy.jpeg";
import { Link } from "react-router-dom";

/* The Card component maps each individual data to a card. */
// ingredients
// link 38 characters

const Card = ({ recipes }) => {
  let foodIdRegex = /v2\/(.*)?\?/g;

  const getFoodId = (regex, str) => {
    let temp = str.match(regex);
    let result = temp[0];
    result = result.replace("?", "");
    result = result.replace("v2/", "");
    // console.log("test", result);
    return result;
  };

  // const getIngredients = (foodItem) => {
  //   console.log("f", foodItem);
  // };

  return (
    <div className="card-outer">
      <h1 className="title">Our Picks</h1>
      <div className="card-inner">
        {recipes.map((r, id) => (
          <div key={id} className="card-items">
            <img className="card-img-top" src={r.recipe.image} alt="Cardcap" />
            <div className="card-body">
              <h5 className="card-title">{r.recipe.label}</h5>
              <p className="card-text">{r.username}</p>
              <div className="card-buttons">
                <Link
                  to={"/recipe/" + getFoodId(foodIdRegex, r._links.self.href)}
                  className="btn btn-primary"
                >
                  Recipe
                </Link>
                {/* <a href="google.com" className="btn btn-primary">
                  Nutritional Info
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
