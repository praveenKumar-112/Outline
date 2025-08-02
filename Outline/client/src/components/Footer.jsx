import React from 'react';

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">OUTLINE</h4>
            <p className="footer-description">
              Premium clothing for the modern lifestyle. 
              Discover our carefully curated collection of fashion essentials.
            </p>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Shop</h5>
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="/category/shirts" className="footer-link">Shirts</a>
              <a href="/category/trousers" className="footer-link">Trousers</a>
              <a href="/category/tshirts" className="footer-link">T-Shirts</a>
              <a href="/category/linen" className="footer-link">Linen</a>
            </nav>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Customer Service</h5>
            <nav className="footer-nav" aria-label="Customer service navigation">
              <a href="/contact" className="footer-link">Contact Us</a>
              <a href="/shipping" className="footer-link">Shipping Info</a>
              <a href="/returns" className="footer-link">Returns</a>
              <a href="/size-guide" className="footer-link">Size Guide</a>
            </nav>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Company</h5>
            <nav className="footer-nav" aria-label="Company navigation">
              <a href="/about" className="footer-link">About Us</a>
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms of Service</a>
              <a href="/careers" className="footer-link">Careers</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} OUTLINE. All rights reserved.
            </p>
            <div className="social-links" aria-label="Social media links">
              <a 
                href="#" 
                className="social-link" 
                aria-label="Follow us on Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                📷
              </a>
              <a 
                href="#" 
                className="social-link" 
                aria-label="Follow us on Facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                📘
              </a>
              <a 
                href="#" 
                className="social-link" 
                aria-label="Follow us on Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                🐦
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
