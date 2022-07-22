import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Recipe.css";

// b79327d05b8e5b838ad6cfd9576b30b6? - chicken versuoi - self, href
// https://api.edamam.com/api/recipes/v2/b79327d05b8e5b838ad6cfd9576b30b6?type=public&app_id=c82a400d&app_key=683feaaa9a84fdc2ac96e918f2ea09cf

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2/${params.name}?type=public&app_id=c82a400d&app_key=683feaaa9a84fdc2ac96e918f2ea09cf`
      )
      .then((response) => {
        console.log("in useeffect", response.data.recipe); // details of selected item
        setDetails(response.data.recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.name]);

  useEffect(() => {}, [details]);

  console.log("p", params.name, "res", "dets", details);

  return (
    <div className="recipe-outer">
      <div className="recipe-inner">
        <h1 className="recipe-title">{details.label}</h1>
        <img className="recipe-img" src={details.image} alt="" />
        <h2>Recipe</h2>
        {details.ingredientLines &&
          details.ingredientLines.map((item) => <li>{item}</li>)}
      </div>
    </div>
  ); // r.recipie.ingredients
};

export default Recipe;
