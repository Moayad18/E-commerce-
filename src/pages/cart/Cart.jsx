import React from "react";
import { useCart } from "../../components/context/cartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./cart.css";
import PageTransition from "../../components/PageTransition";

const Cart = () => {
  const { cartItems, IncrementQuantity, decrementQuantity, deleteItem } =
    useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <PageTransition>
      <div className="checkout">
        <div className="order_summary">
          <h1>Order Summary</h1>

          <div className="items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div className="item" key={index}>
                  <div className="img_name">
                    <div className="img_item">
                      <img src={item.images[0]} alt={item.title} />
                    </div>
                    <div className="content">
                      <h4>{item.title}</h4>
                      <p className="price_item">Price: ${item.price}</p>
                      <div className="quantity_control">
                        <button onClick={() => decrementQuantity(item.id)}>
                          -
                        </button>
                        <span>{item.quantity ?? 1}</span>
                        <button
                          onClick={() => {
                            IncrementQuantity(item.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="delete_item"
                    onClick={() => deleteItem(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bottom_summary">
            <div className="shop_table">
              <p>Total: </p>
              <span className="total_check">{`$${total.toFixed(2)}`}</span>
            </div>

            <div className="button_div">
              <button type="submit">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
