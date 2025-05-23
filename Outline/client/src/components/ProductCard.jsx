import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', cursor: 'pointer', height: '200px', objectFit: 'cover' }}
        />
        <h6 className="mt-2">{product.name}</h6>
        <p>₹{product.price}</p>
      </Link>

      <button
        className="btn btn-dark mt-2"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
