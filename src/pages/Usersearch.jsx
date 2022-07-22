import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Usersearch.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

/* Usersearch component will get recipes based on user search. Dish types refer
to the category of the food the recipe would fall under. 
Alcohol cocktail, biscuits and cookies, bread, cereals, condiments and sauces, desserts, etc.
Make the search better so that it needs only key words.
*/

const Usersearch = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [userSearchNextLink, setUserSearchNextLink] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // page 1 by default
  let params = useParams();
  const q = "";
  let foodIdRegex = /v2\/(.*)?\?/g;

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=c82a400d&app_key=683feaaa9a84fdc2ac96e918f2ea09cf&dishType=${params.search}`
      )
      .then((res) => {
        console.log(res);
        setSearchedRecipes(res.data.hits);
        setUserSearchNextLink(res.data._links.next["href"]); // new
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(params.search);
  }, [params.search]); // call everytime params changes

  const getFoodId = (regex, str) => {
    let temp = str.match(regex);
    let result = temp[0];
    result = result.replace("?", "");
    result = result.replace("v2/", "");
    // console.log("test", result);
    return result;
  };

  const handleFetch = async (e) => {
    axios
      .get(userSearchNextLink)
      .then((res) => {
        setSearchedRecipes(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="search-card-outer">
      <div className="search-card-inner">
        {searchedRecipes.map((r, i) => (
          <div key={i} className="card-items">
            <img className="card-img-top" src={r.recipe.image} alt="Cardcap" />
            <div className="card-body">
              <h5 className="card-title">{r.recipe.label}</h5>
              <p className="card-text">{r.username}</p>
              <div className="search-card-buttons">
                <Link
                  to={"/recipe/" + getFoodId(foodIdRegex, r._links.self.href)}
                  className="btn btn-primary"
                >
                  Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        // pageCount={totalPages}
        pageCount={5}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handleFetch}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Usersearch;
