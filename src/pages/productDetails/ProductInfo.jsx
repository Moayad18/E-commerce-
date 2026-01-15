import React from "react";
import { FaRegHeart, FaShare, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../../components/context/cartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ProductInfo = ({ product }) => {
  const {
    cartItems,
    addToCart,
    deleteItem,
    addToFav,
    favorites,
    removeItemFromFav,
    IncrementQuantity,
    decrementQuantity,
  } = useCart();
  const navigate = useNavigate();
  const isInCart = cartItems.some((cartItem) => cartItem.id === product.id);
  const isInfav = favorites.some(
    (favoriteItem) => favoriteItem.id === product.id
  );

  const handleDeleteFromCart = (e) => {
    e.stopPropagation();
    deleteItem(product.id);
    toast.error(
      <div className="toast-wrapper">
        <img
          src={product.images[0]}
          alt={product.title}
          className="toast-img"
        />

        <div className="toast-content">
          <strong>{product.title}</strong>
          removed from cart successfully!
        </div>
      </div>
    ),
      { duration: 4000 };
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(
      <div className="toast-wrapper">
        <img
          src={product.images[0]}
          alt={product.title}
          className="toast-img"
        />

        <div className="toast-content">
          <strong>{product.title}</strong>
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
      removeItemFromFav(product);
      toast.error(`${product.title} Removed From Favorites`);
    } else {
      addToFav(product);
      toast.success(`${product.title} Added To Favorites`);
    }
  };

  return (
    <div className="details_item">
      <h2 className="name">{product?.title}</h2>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </div>
      <p className="price">${product?.price}</p>
      <h5>
        Availability:
        <span>{product?.stock > 0 ? " In Stock" : " Out of Stock"} </span>
      </h5>
      <h5>
        Brand: <span>{product?.brand}</span>
      </h5>
      <p className="desc">{product?.description}</p>
      <h5 className="stock">
        <span>Hurry Up! Only {product?.stock} left in stock</span>
      </h5>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {cartItems &&
          cartItems.map((item) => {
            if (item.id === product.id) {
              return (
                <div key={item.id} className="quantity_control">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity ?? 1}</span>
                  <button
                    onClick={() => {
                      IncrementQuantity(item.id);
                    }}
                  >
                    +
                  </button>
                </div>
              );
            }
          })}
        <button
          className={`btn ${isInCart ? "in-cart" : ""}`}
          onClick={isInCart ? handleDeleteFromCart : handleAddToCart}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"} <TiShoppingCart />
        </button>
      </div>
      <div className="icons">
        <span className={`${isInfav ? "in-fav" : ""}`} onClick={handleAddToFav}>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
