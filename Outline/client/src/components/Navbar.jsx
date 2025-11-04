import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const categories = [
    { name: 'SHIRTS', path: '/category/shirts' },
    { name: 'TROUSERS', path: '/category/trousers' },
    { name: 'TSHIRTS', path: '/category/tshirts' },
    { name: 'LINEN', path: '/category/linen' }
  ];

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Brand */}
          <div className="navbar-brand">
            <Link 
              to="/" 
              className="brand-link"
              onClick={closeMobileMenu}
              aria-label="OUTLINE - Go to homepage"
            >
              <strong>OUTLINE</strong>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            {/* Category links */}
            <div className="navbar-categories">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className={`nav-link ${isActive(category.path) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Auth and actions */}
            <div className="navbar-actions">
              {user?.isAdmin && (
                <div className="admin-links">
                  <Link
                    to="/admin/dashboard"
                    className={`nav-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/manage-products"
                    className={`nav-link ${isActive('/admin/manage-products') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    className={`nav-link ${isActive('/admin/orders') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Orders
                  </Link>
                </div>
              )}

              {user ? (
                <div className="auth-section">
                  <span className="user-greeting">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-sm"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-section">
                  <Link
                    to="/login"
                    className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </div>
              )}

              <Link
                to="/cart"
                className={`cart-link ${isActive('/cart') ? 'active' : ''}`}
                onClick={closeMobileMenu}
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <span className="cart-icon">🛒</span>
                <span className="cart-text">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="cart-count" aria-label={`${cartItemsCount} items in cart`}>
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
            id="mobile-menu"
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="mobile-menu-content">
              {/* Categories */}
              <div className="mobile-section">
                <h3 className="mobile-section-title">Categories</h3>
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    className={`mobile-link ${isActive(category.path) ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Admin Links */}
              {user?.isAdmin && (
                <div className="mobile-section">
                  <h3 className="mobile-section-title">Admin</h3>
                  <Link
                    to="/admin/dashboard"
                    className={`mobile-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/manage-products"
                    className={`mobile-link ${isActive('/admin/manage-products') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    className={`mobile-link ${isActive('/admin/orders') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Orders
                  </Link>
                </div>
              )}

              {/* Account */}
              <div className="mobile-section">
                <h3 className="mobile-section-title">Account</h3>
                {user ? (
                  <>
                    <span className="mobile-user-info">Hi, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={`mobile-link ${isActive('/login') ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={`mobile-link ${isActive('/register') ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu overlay */}
          {isMobileMenuOpen && (
            <div 
              className="mobile-menu-overlay"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default React.memo(Navbar);
