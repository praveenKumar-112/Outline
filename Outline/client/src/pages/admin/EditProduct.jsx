import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    countInStock: '',
    image: null,
  });

  const [existingImage, setExistingImage] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        countInStock: data.countInStock,
        image: null,
      });
      setExistingImage(data.image); // Save image URL
    } catch (err) {
      console.error('Failed to fetch product', err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

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
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      for (const key in form) {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      }

      await axios.put(`/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Product updated successfully!');
      setTimeout(() => navigate('/admin/manage-products'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed';
      setError(`❌ ${msg}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="form-control my-2" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="form-control my-2" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required className="form-control my-2" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="form-control my-2" />
        <input name="countInStock" type="number" placeholder="Stock" value={form.countInStock} onChange={handleChange} className="form-control my-2" />
        
        {existingImage && (
          <div className="my-2">
            <img src={existingImage} alt="Current" width="120" />
          </div>
        )}

        <input name="image" type="file" accept="image/*" onChange={handleChange} className="form-control my-2" />
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>

      {message && <div className="alert alert-success mt-2">{message}</div>}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default EditProduct;
