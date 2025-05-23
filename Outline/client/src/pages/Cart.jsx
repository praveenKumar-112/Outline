import React from 'react';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    alert('Order placed successfully!');
    // Here you can later call an API to save the order
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h4>Total: ${totalPrice.toFixed(2)}</h4>

          <button className="btn btn-primary mt-3" onClick={handleCheckout}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
