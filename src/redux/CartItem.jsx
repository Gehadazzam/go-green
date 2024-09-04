import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "./CartSlice";
// import "./CartItem.css";

export const useCartItemsCount = () => {
  const cart = useSelector((state) => state.cart.items);
  return cart.reduce((total, item) => total + item.quantity, 0);
};

const CartItem = ({ onContinueShopping = () => {} }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (cost) => {
    const numericCost = parseFloat(cost.replace("$", ""));
    return isNaN(numericCost) ? 0 : numericCost;
  };

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const totalAmount = useMemo(() => calculateTotalAmount(), [cart]);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckOutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  return (
    <div className="px-4 md:px-12 lg:px-24 mt-2">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-quinary">Your Cart</h1>
        <h2 className="cart-total-amount">Total Cart Amount: ${totalAmount}</h2>
      </div>
      <div className="flex justify-end w-full my-2">
        <button
          className="bg-tertiary text-white py-2 px-4 rounded-full hover:scale-105"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:gap-8 mb-8">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((item) => (
              <div className="flex flex-col items-center" key={item.name}>
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <div className="font-bold text-2xl py-2">{item.name}</div>
                  <div className="cart-item-quantity">
                    <button
                      aria-label="Decrease quantity"
                      className=" py-2 px-3 text-lg border-2 border-current rounded-md bg-primary hover:bg-tertiary hover:text-white"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>

                    <span className="font-bold px-4 text-xl">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Increase quantity"
                      className=" py-2 px-3 text-lg border-2 border-current rounded-md bg-primary hover:bg-tertiary hover:text-white"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between">
                    <span className="font-bold text-sm">
                      Price: {item.cost}
                    </span>
                    <span className="font-bold text-sm">
                      Total: ${calculateTotalCost(item)}
                    </span>
                  </div>

                  <button
                    aria-label={`Remove ${item.name} from cart`}
                    className="bg-tertiary hover:bg-quaternary my-4 py-2 px-4 border-2 border-quaternary rounded-xl"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}

        <button
          className="bg-quinary font-bold text-white p-2 rounded-md"
          onClick={handleCheckOutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
