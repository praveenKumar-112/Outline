// client/src/pages/Login.jsx
import { useState } from 'react';
import axios from '../axios.js';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/auth/login', form);
      
      // Save token and user info (with isAdmin)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/'); // or redirect to dashboard if needed
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
}
