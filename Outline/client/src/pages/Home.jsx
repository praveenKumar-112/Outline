import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      {/* <h2>All Products</h2> */}
      {/* <hr /> */}
      <br />
      <div className="row">
        {products.length > 0 ? (
          <div className="product-grid">
  {products.map(product => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>

        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
