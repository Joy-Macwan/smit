import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import styles from "../styles/productlist.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filteredCategory === "All" || product.category === filteredCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Sidebar />
      <div className={`${styles.posDashboard} scale-in`}>
        <h2 className="gradient-text bounce">🛒 Product Selection</h2>

        {/* Search + Filters */}
        <div className={`${styles.posFilters} reveal-up in stagger-children`}>
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="magnetic"
          />

          <div className={styles.filterButtons}>
            {["All", "Glossary", "Biscuit", "Drinks", "Chocolates", "Ice-Cream","Chips & Maggi"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilteredCategory(cat)}
                className={`${filteredCategory === cat ? styles.active : ""} btn-ghost magnetic ripple`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="stagger-children">
            {Array.from({length: 8}).map((_, index) => (
              <div key={index} className="skeleton" style={{height: '200px', margin: '1rem'}}></div>
            ))}
          </div>
        )}
        {error && <p className="gradient-text" style={{ color: "red" }}>{error}</p>}

        {/* Product Grid */}
        <div className={`${styles.posProductGrid} reveal-up in stagger-children`}>
          {!loading && !error && filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className={`${styles.posProductCard} lift tilt magnetic glow-pulse`} key={product._id} style={{animationDelay: `${index * 50}ms`}}>
                <img src={product.imageUrl} alt={product.name} className="magnetic" />
                <div className={styles.posProductInfo}>
                  <h3 className="gradient-text">{product.name}</h3>
                  <p className={`${styles.posPrice} gradient-text bounce`}>₹{product.price}</p>
                  <p
                    className={
                      product.stock > 0
                        ? `${styles.posStock} ${styles.inStock} badge badge-success`
                        : `${styles.posStock} ${styles.outStock} badge badge-danger`
                    }
                  >
                    {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
                  </p>

                  {/* ✅ Edit link + Delete button */}
                  <div className={`${styles.actionButtons} stagger-children`}>
                    <Link to={`/editproduct/${product._id}`}>
                      <button className={`btn btn-ghost lift ripple magnetic`}>✏️ Edit</button>
                    </Link>
                    <button className={`btn btn-secondary lift ripple magnetic`} onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p className="gradient-text">No products found.</p>
          )}
        </div>

        {/* Add floating action button */}
        <button className="fab bounce magnetic" onClick={() => window.location.href='/addproduct'}>
          +
        </button>
      </div>
    </>
  );
};

export default ProductList;
