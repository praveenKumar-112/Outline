import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';

const ProductCard = React.memo(({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleProductClick = useCallback(() => {
    navigate(`/product/${product._id}`);
  }, [navigate, product._id]);

  const handleAddToCart = useCallback(async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    setIsLoading(true);
    
    try {
      await addToCart(product);
      // You could add a toast notification here
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You could add error handling/notification here
    } finally {
      setIsLoading(false);
    }
  }, [addToCart, product]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick();
    }
  }, [handleProductClick]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const imageUrl = product.imageUrl || product.image;
  const productName = product.name || 'Unnamed Product';
  const productPrice = product.price || 0;
  const isOutOfStock = product.countInStock === 0;

  return (
    <article 
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={handleProductClick}
      onKeyPress={handleKeyPress}
      aria-label={`View details for ${productName}, priced at ${formatPrice(productPrice)}`}
    >
      <div className="product-image-container">
        {!imageError ? (
          <img
            src={imageUrl}
            alt={productName}
            className="product-image"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="product-image-placeholder" aria-hidden="true">
            <span className="placeholder-icon">📦</span>
            <span className="placeholder-text">Image not available</span>
          </div>
        )}
        
        {isOutOfStock && (
          <div className="out-of-stock-overlay" aria-hidden="true">
            <span className="out-of-stock-text">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name" title={productName}>
          {productName}
        </h3>
        
        <div className="product-price">
          {formatPrice(productPrice)}
        </div>

        {product.category && (
          <div className="product-category">
            {product.category}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isLoading || isOutOfStock}
          className={`btn btn-primary add-to-cart-btn ${isLoading ? 'loading' : ''}`}
          aria-label={`Add ${productName} to cart`}
        >
          {isLoading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              Adding...
            </>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
    countInStock: PropTypes.number,
    description: PropTypes.string
  }).isRequired
};

export default ProductCard;
