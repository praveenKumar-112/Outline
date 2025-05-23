import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Mock fetching dashboard stats
    const mockData = {
      products: 12,
      orders: 8,
      revenue: 1249.99,
    };
    setSummary(mockData);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center bg-light">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text fs-4">{summary.products}</p>
              <Link to="/admin/manage-products" className="btn btn-primary btn-sm">
                Manage Products
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center bg-light">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{summary.orders}</p>
              <Link to="/admin/manage-orders" className="btn btn-primary btn-sm">
                Manage Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center bg-light">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <p className="card-text fs-4">${summary.revenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
