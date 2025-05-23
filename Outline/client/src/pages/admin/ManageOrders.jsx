import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth(); // assuming you store the JWT here

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/orders/admin-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders');
    }
  };

  fetchOrders();
}, []);


  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await axios.put(
        `/api/admin/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update state with updated order
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data : order))
      );
    } catch (err) {
      console.error('Failed to update order', err);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Order by: {order.user?.name}</h5>
              <p className="card-text">Email: {order.user?.email}</p>
              <p className="card-text">Total: ₹{order.total}</p>
              <p className="card-text">Status: {order.status}</p>

              <label>Status:</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="form-select mb-2"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              <h6>Items:</h6>
              <ul className="list-group">
                {order.items.map((item) => (
                  <li key={item._id} className="list-group-item">
                    {item.name} × {item.quantity}
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

export default ManageOrders;
