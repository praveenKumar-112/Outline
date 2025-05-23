import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ManageProducts() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    countInStock: '',
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const res = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(`✅ Product "${res.data.name}" added successfully!`);
      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        countInStock: '',
        image: null,
      });
      fetchProducts(); // Refresh product list
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(`❌ ${msg}`);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete product', err);
      alert('Delete failed');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="form-control my-2" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="form-control my-2" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="form-control my-2" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="form-control my-2" />
        <input name="countInStock" type="number" placeholder="Stock" value={form.countInStock} onChange={handleChange} className="form-control my-2" />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="form-control my-2" />
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      {message && <div className="alert alert-success mt-2">{message}</div>}
      {error && <div className="alert alert-danger mt-2">{error}</div>}

      <hr className="my-4" />

      <h2>Manage Products</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.category}</td>
              <td>₹{prod.price}</td>
              <td>{prod.countInStock}</td>
              <td>
                <Link to={`/admin/manage-products/${prod._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                <button onClick={() => deleteProduct(prod._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
