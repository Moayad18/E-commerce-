import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider";
import "./home.css";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

const categoreis = [
  "laptops",
  "tablets",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "mobile-accessories",
];

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Promise.all(
          categoreis.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();
            return { [category]: data.products };
          })
        );
        const proudctsData = Object.assign({}, ...response);
        setProducts(proudctsData);
        console.log("Fetched categories:", response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <PageTransition>
      <div>
        <HeroSlider />

        {isLoading ? (
          <SlideProductLoading />
        ) : (
          categoreis.map((category) => (
            <SlideProduct
              key={category}
              title={category.replace("-", " ")}
              data={products[category]}
            />
          ))
        )}
      </div>
    </PageTransition>
  );
};

export default Home;
