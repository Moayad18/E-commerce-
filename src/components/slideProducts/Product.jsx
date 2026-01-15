import React from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaCartArrowDown,
  FaRegHeart,
  FaShare,
  FaCheck,
} from "react-icons/fa";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const Product = ({ item }) => {
  const { cartItems, addToCart, addToFav, favorites, removeItemFromFav } =
    useCart();
  const navigate = useNavigate();
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
  const isInfav = favorites.some((favoriteItem) => favoriteItem.id === item.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      return;
    }
    addToCart(item);

    toast.success(
      <div className="toast-wrapper">
        <img src={item.images[0]} alt={item.title} className="toast-img" />

        <div className="toast-content">
          <strong>{item.title}</strong>
          adedd to cart successfully!
          <div>
            <button className="btn" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          </div>
        </div>
      </div>
    ),
      { duration: 4000 };
  };

  const handleAddToFav = (e) => {
    e.stopPropagation();
    if (isInfav) {
      removeItemFromFav(item);
      toast.error(`${item.title} Removed From Favorites`);
    } else {
      addToFav(item);
      toast.success(`${item.title} Added To Favorites`);
    }
  };
  return (
    <div
      className={`product ${isInCart ? "in-cart" : ""}`}
      onClick={() => navigate(`/products/${item.id}`)}
    >
      <span className="status_card">
        <FaCheck /> in Card
      </span>

      <div className="img_product">
        <img src={item.images[0]} alt="product1" />
      </div>
      <p className="name_product">{item.title}</p>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </div>
      <div className="price_product">
        <span>${item.price}</span>
      </div>
      <div className="icons">
        <span className="add_to_cart" onClick={handleAddToCart}>
          <FaCartArrowDown />
        </span>
        <span
          className={` ${isInfav ? "in-fav" : ""}`}
          onClick={handleAddToFav}
        >
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
};

export default Product;
