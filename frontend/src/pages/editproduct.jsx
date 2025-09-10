import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/sidebar";
import styles from "../styles/editproduct.module.css";

const EditProduct = () => {
  const { id } = useParams(); // ✅ get product id from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setForm({
          name: res.data.name,
          price: res.data.price,
          stock: res.data.stock,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, form);
      alert("✅ Product updated successfully!");
      navigate("/products"); // go back to product list
    } catch (err) {
      console.error("❌ Error updating product:", err);
      alert("Failed to update product");
    }
  };

  if (loading) return (
    <>
      <Sidebar />
      <div className={`${styles.editProductDashboard} scale-in`}>
        <div className="skeleton skeleton-text gradient-text">Loading product...</div>
      </div>
    </>
  );

  return (
    <>
      <Sidebar />
      <div className={`${styles.editProductDashboard} scale-in reveal-up in`}>
        <h2 className="gradient-text bounce">✏️ Edit Product</h2>
        <div className={`${styles.editProductForm} reveal-up in stagger-children`}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="lift magnetic"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="lift magnetic"
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="lift magnetic"
          />
          <button className="btn cta lift ripple magnetic glow-pulse bounce" onClick={handleSave}>💾 Save Changes</button>
        </div>

        {/* Add floating action button */}
        <button className="fab bounce magnetic glow-pulse" onClick={() => window.location.href='/productlist'}>
          🔙
        </button>
      </div>
    </>
  );
};

export default EditProduct;
