import React from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Simulate order placement logic
    alert('Order placed successfully!');
    clearCart();
    navigate('/'); // Redirect to homepage or orders page
  };

  if (!cartItems.length) {
    return <div className="container mt-4">Your cart is empty.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <div className="mt-3">
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name}
              <span>₹{item.price} × {item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <h4>Total: ₹{total}</h4>
          <button className="btn btn-success mt-2" onClick={handleCheckout}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
