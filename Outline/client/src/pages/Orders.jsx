import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <h5>Order #{order._id}</h5>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.total}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <h6>Shipping Info:</h6>
              <p>
                {order.shippingInfo.address}, {order.shippingInfo.city} - {order.shippingInfo.postalCode}
              </p>
              <h6>Items:</h6>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} (x{item.quantity}) - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
