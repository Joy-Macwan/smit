import React, { useState } from 'react';
import '../styles/addproduct.css';
import Sidebar from '../components/sidebar';
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    category: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a product image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/products/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('✅ Product added successfully!');
    } catch (err) {
      alert('❌ Failed to add product.');
      console.error(err);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="a1 reveal-up in">
        <div className="add-product-container scale-in lift">
          <form onSubmit={handleSubmit} className="add-product-form stagger-children">
            <h2 className="gradient-text bounce">✨ Add New Product</h2>

            <div className="form-row reveal-up in">
              <div className="input-group half-width lift magnetic">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " required />
                <label>Product Name</label>
              </div>
              <div className="input-group half-width lift magnetic">
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder=" " required />
                <label>Description</label>
              </div>
            </div>

            <div className="form-row reveal-up in stagger-children">
              <div className="input-group quarter-width lift magnetic">
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder=" " required />
                <label>Price (₹)</label>
              </div>
              <div className="input-group quarter-width lift magnetic">
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder=" " required />
                <label>Stock Quantity</label>
              </div>
              <div className="input-group quarter-width lift magnetic">
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder=" " required />
                <label>Brand</label>
              </div>
              <div className="input-group quarter-width lift magnetic">
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder=" " required />
                <label>Category</label>
              </div>
            </div>

            <div className="form-row reveal-up in">
              <label className="image-label gradient-text">Product Image</label>
              <input type="file" onChange={handleImageChange} required className="lift magnetic" />
            </div>

            <div className="form-row">
              <button type="submit" className="btn cta lift ripple magnetic glow-pulse bounce">✨ Add Product</button>
            </div>
          </form>
        </div>

        {/* Add floating action button */}
        <button className="fab bounce magnetic glow-pulse" onClick={() => window.location.href='/productlist'}>
          📋
        </button>
      </div>
    </>
  );
};

export default AddProduct;
