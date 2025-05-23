import { useCart } from '../hooks/useCart'; // ✅ path might differ

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // ✅ this will fail if CartProvider isn't wrapped

  return (
    <div className="product-card">
      <img
        src={product.imageUrl || product.image}
        alt={product.name}
        onClick={() => window.location.href = `/product/${product._id}`}
        style={{ cursor: 'pointer', width: '100%' }}
      />
      <h6 className="mt-2">{product.name}</h6>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)} className="btn btn-dark mt-2">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
