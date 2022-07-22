import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

const Paginate = ({ nextLink }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [currentPage, setCurrentPage] = useState(1); // page 1 by default
  const [totalPages, setTotalPages] = useState(0);

  const handleFetch = async (clickedPage) => {
    console.log("hi");
    console.log(nextLink);
  };

  //   // Invoke when user click to request another page.
  const changePage = ({ selected }) => {
    let clickedPage = selected + 1;
    setCurrentPage(clickedPage);
    handleFetch(clickedPage);
  };

  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      // pageCount={totalPages}
      pageCount={5}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={changePage}
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
  );
};

export default Paginate;
