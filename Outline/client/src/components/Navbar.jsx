import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../hooks/useCart';


const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
    const { cartItems } = useCart();
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container-fluid navbar-content d-flex justify-content-center align-items-center">

        {/* Brand on the left */}
        <div className="navbar-brand fw-bold text-dark">
          <Link to="/" className="text-decoration-none text-dark ps-1"><strong>OUTLINE</strong></Link>
        </div>

        {/* Middle: Category links */}
        <div className="navbar-links d-flex gap-3">
          <Link to="/category/shirts">SHIRTS</Link>
          <Link to="/category/trousers">TROUSERS</Link>
          <Link to="/category/tshirts">TSHIRTS</Link>
          <Link to="/category/linen">LINEN</Link>
        </div>

        {/* Right: Auth + Admin + Cart */}
        <div className="navbar-right d-flex align-items-center gap-3">
          {user?.isAdmin && (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/manage-products">Products</Link>
              <Link to="/admin/orders">Orders</Link>
            </>
          )}

          {user ? (
            <>
              {/* <span>Hi, {user.name}</span> */}
              <button onClick={handleLogout} className="btn btn-outline-secondary btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          <Link to="/cart" className="cart-link">
            cart <span className="cart-count">{cartItems.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
