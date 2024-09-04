import React from "react";
import CartItem from "../redux/CartItem";

function Cart() {
  const handleContinueShopping = () => {
    window.location.href = "/products";
  };

  return (
    <div>
      <CartItem onContinueShopping={handleContinueShopping} />{" "}
      {/* Render CartItem */}
    </div>
  );
}

export default Cart;
