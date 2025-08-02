import React, { useEffect, useState, useMemo } from 'react';
import axios from '../axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['all', ...uniqueCategories];
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
  };

  if (loading) {
    return (
      <div className="container" id="main-content">
        <div className="loading-container">
          <div className="spinner large" aria-hidden="true"></div>
          <p className="loading-text">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" id="main-content">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" id="main-content">
      <header className="home-header">
        <h1>Discover Our Collection</h1>
        <p className="home-subtitle">
          Find the perfect pieces for your wardrobe from our carefully curated selection.
        </p>
      </header>

      {/* Filters and Search */}
      <section className="filters-section" aria-label="Product filters">
        <div className="filters-container">
          <div className="search-container">
            <label htmlFor="search" className="form-label">
              Search Products
            </label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              aria-describedby="search-help"
            />
            <small id="search-help" className="form-text">
              Search through our product catalog
            </small>
          </div>

          <div className="filter-group">
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                className="form-control"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sort" className="form-label">
                Sort By
              </label>
              <select
                id="sort"
                className="form-control"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {(searchTerm || selectedCategory !== 'all' || sortBy !== 'name') && (
              <button
                onClick={clearFilters}
                className="btn btn-secondary clear-filters-btn"
                aria-label="Clear all filters"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="results-summary">
        <p className="results-count">
          {filteredAndSortedProducts.length === 0 ? (
            'No products found'
          ) : (
            `Showing ${filteredAndSortedProducts.length} of ${products.length} products`
          )}
        </p>
      </section>

      {/* Products Grid */}
      <section className="products-section" aria-label="Products">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="product-grid" role="grid" aria-label="Product catalog">
            {filteredAndSortedProducts.map(product => (
              <ProductCard 
                key={product._id} 
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <div className="no-products-icon" aria-hidden="true">🔍</div>
            <h3>No products found</h3>
            <p>
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'Check back soon for new arrivals!'
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="btn btn-primary"
              >
                View All Products
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default React.memo(Home);
