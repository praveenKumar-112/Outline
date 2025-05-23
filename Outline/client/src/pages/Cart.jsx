import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <h3>Your cart is empty.</h3>;
  }

  return (
    <div className="container">
      <h3>Your Cart</h3>
      <ul className="list-group mb-3">
        {cart.map(item => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6>{item.name}</h6>
              <p className="mb-0">Quantity: {item.quantity}</p>
              <p className="mb-0">Price: ₹{item.price}</p>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h5>Total: ₹{total.toFixed(2)}</h5>
      <button className="btn btn-primary">Proceed to Checkout</button>
      <button className="btn btn-outline-danger ms-2" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
