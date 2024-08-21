import React from 'react';
import CartItem from '../redux/CartItem';  // Import the CartItem component

function Cart() {
  const handleContinueShopping = () => {
    window.location.href = "/products";  // Redirect to the Products page
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <CartItem onContinueShopping={handleContinueShopping} />  {/* Render CartItem */}
    </div>
  );
}

export default Cart;
