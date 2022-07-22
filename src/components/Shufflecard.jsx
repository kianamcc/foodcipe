import React from "react";
import "./Shufflecard.css";

/* Display information of the recipe recieved from shuffling */

const Shufflecard = ({ randomRecipeDetails }) => {
  const { name, img, ingredients } = randomRecipeDetails;
  return (
    <div className="shuffle-container">
      <div className="shuffle-content-container">
        <div className="shuffle-image-container">
          <h2 className="shuffle-card-title">{name}</h2>
          <img className="shuffle-image" src={img} alt="" />
        </div>
        <div className="shuffle-ingredient-container">
          {ingredients &&
            ingredients.map((item, id) => <li key={id}>{item}</li>)}
        </div>
      </div>
    </div>
  );
};

export default Shufflecard;
