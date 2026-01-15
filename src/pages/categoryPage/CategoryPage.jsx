import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../../components/slideProducts/Product";
import "./categoryPage.css";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

const CategoryPage = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data.products);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [category]);

  return (
    <PageTransition key={category}>
      <div className="category_products">
        {isLoading ? (
          <SlideProductLoading />
        ) : (
          <div className="container">
            <div className="top_slide">
              <h2>{category.replace("-", " ")}</h2>
              <p>lorem ipsum dolor sit amet</p>
            </div>
            <div className="products">
              {categoryProducts.map((item, index) => (
                <Product key={index} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CategoryPage;
