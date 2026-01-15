import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductDetailsLoading from "../productDetails/ProductDetailsLoading";
import Product from "../../components/slideProducts/Product";
import "./searchResult.css";
import PageTransition from "../../components/PageTransition";
const SearchResult = () => {
  const query = new URLSearchParams(useLocation().search).get("query");
  const [searchProducts, setSearchProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(query);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchProducts(data.products || []);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [query]);
  console.log(searchProducts);

  return (
    <PageTransition key={query}>
      <div className="search_result">
        {isLoading ? (
          <ProductDetailsLoading key={query} />
        ) : searchProducts.length > 0 ? (
          <div className="container">
            <div className="top_slide">
              <h2> Results For :{`  ${query}`}</h2>
            </div>
            <div className="search_products">
              {searchProducts.map((item, index) => (
                <Product key={index} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="container">
            <p> No Results Found.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default SearchResult;
