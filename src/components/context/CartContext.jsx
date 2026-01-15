import React, { createContext, useContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Favorites
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favoritesItems")
      ? JSON.parse(localStorage.getItem("favoritesItems"))
      : []
  );

  const addToFav = (item) => {
    setFavorites((prev) => {
      if (prev.some((i) => i.id === item.id)) return;
      return [...prev, item];
    });
  };

  const removeItemFromFav = (item) => {
    setFavorites((prev) => prev.filter((i) => i.id !== item.id));
  };

  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites]);

  // Cart
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  // Increment quantity function can be added here
  const IncrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity function can be added here
  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        IncrementQuantity,
        decrementQuantity,
        deleteItem,
        addToFav,
        favorites,
        removeItemFromFav,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
export default CartProvider;
