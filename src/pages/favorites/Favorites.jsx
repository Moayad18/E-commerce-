import React from "react";
import { useCart } from "../../components/context/cartContext";
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";

const Favorites = () => {
  const { favorites } = useCart();
  return (
    <PageTransition>
      <div className="category_products">
        <div className="container">
          <div className="top_slide">
            <h2>Your Favorites</h2>
          </div>
          {favorites.length === 0 ? (
            <p>No Favorites Products yet</p>
          ) : (
            <div className="products">
              {favorites.map((item, index) => (
                <Product key={index} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Favorites;
