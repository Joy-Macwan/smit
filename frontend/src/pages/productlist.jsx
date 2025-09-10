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
      <div className={styles.posDashboard}>
        <h2>🛒 Product Selection</h2>

        {/* Search + Filters */}
        <div className={styles.posFilters}>
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.filterButtons}>
            {["All", "Glossary", "Biscuit", "Drinks", "Chocolates", "Ice-Cream","Chips & Maggi"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilteredCategory(cat)}
                className={filteredCategory === cat ? styles.active : ""}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Product Grid */}
        <div className={styles.posProductGrid}>
          {!loading && !error && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className={styles.posProductCard} key={product._id}>
                <img src={product.imageUrl} alt={product.name} />
                <div className={styles.posProductInfo}>
                  <h3>{product.name}</h3>
                  <p className={styles.posPrice}>₹{product.price}</p>
                  <p
                    className={
                      product.stock > 0
                        ? `${styles.posStock} ${styles.inStock}`
                        : `${styles.posStock} ${styles.outStock}`
                    }
                  >
                    {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
                  </p>

                  {/* ✅ Edit link + Delete button */}
                  <div className={styles.actionButtons}>
                    <Link to={`/editproduct/${product._id}`}>
                      <button className={styles.editButton}>✏️ Edit</button>
                    </Link>
                    <button className={styles.deleteButton} onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
