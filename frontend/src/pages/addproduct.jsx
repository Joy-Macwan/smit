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
      <div className="a1">
        <div className="add-product-container">
          <form onSubmit={handleSubmit} className="add-product-form">
            <h2>Add New Product</h2>

            <div className="form-row">
              <div className="input-group half-width">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " required />
                <label>Product Name</label>
              </div>
              <div className="input-group half-width">
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder=" " required />
                <label>Description</label>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group quarter-width">
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder=" " required />
                <label>Price (₹)</label>
              </div>
              <div className="input-group quarter-width">
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder=" " required />
                <label>Stock Quantity</label>
              </div>
              <div className="input-group quarter-width">
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder=" " required />
                <label>Brand</label>
              </div>
              <div className="input-group quarter-width">
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder=" " required />
                <label>Category</label>
              </div>
            </div>

            <div className="form-row">
              <label className="image-label">Product Image</label>
              <input type="file" onChange={handleImageChange} required />
            </div>

            <div className="form-row">
              <button type="submit">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
