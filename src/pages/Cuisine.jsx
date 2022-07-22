import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // get cuisine type param
import axios from "axios";
import "./Cuisine.css";
// import Paginate from "../components/Paginate";
import ReactPaginate from "react-paginate";

/* Select food items from cuisine type American Japanese Mexican. Page pagination available. */

const Cuisine = () => {
  const API_ID = "c82a400d";
  const API_KEY = "683feaaa9a84fdc2ac96e918f2ea09cf";
  const name = "";
  const [cuisine, setCuisine] = useState([]);
  const [nextLink, setnextLink] = useState([]);
  let params = useParams(); // access parameters of current route
  let foodIdRegex = /v2\/(.*)?\?/g;

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [currentPage, setCurrentPage] = useState(1); // page 1 by default
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=c82a400d&app_key=683feaaa9a84fdc2ac96e918f2ea09cf&cuisineType=${params.type}`
      )
      .then((res) => {
        console.log(res);
        setCuisine(res.data.hits);
        setnextLink(res.data._links.next["href"]); // new
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(params.type);
  }, [params.type]); // call everytime params changes

  // console.log(cuisine);

  const getFoodId = (regex, str) => {
    let temp = str.match(regex);
    let result = temp[0];
    result = result.replace("?", "");
    result = result.replace("v2/", "");
    // console.log("test", result);
    return result;
  };

  // const handleFetch = async (clickedPage) => {
  //   console.log(nextLink);
  //   axios.get(nextLink)
  // };

  const handleFetch = async (e) => {
    console.log(nextLink);
    axios
      .get(nextLink)
      .then((res) => {
        setCuisine(res.data.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cuisine-card-outer">
      <div className="cuisine-card-inner">
        {cuisine.map((r, i) => (
          <div key={i} className="card-items">
            <img className="card-img-top" src={r.recipe.image} alt="Cardcap" />
            <div className="card-body">
              <h5 className="card-title">{r.recipe.label}</h5>
              <p className="card-text">{r.username}</p>
              <div className="cuisine-card-buttons">
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
      {/* <Paginate nextLink={nextLink} /> */}
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

export default Cuisine;
