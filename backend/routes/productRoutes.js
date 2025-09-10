const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");

const router = express.Router();

// ================= Multer Config =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ================= CREATE Product =================
// POST /api/products/add
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, stock, brand, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new Product({
      name,
      description,
      price,
      stock,
      brand,
      category,
      image,
    });

    await product.save();
    res.status(201).json({
      message: "✅ Product added successfully!",
      product: {
        ...product.toObject(),
        imageUrl: product.image
          ? `${req.protocol}://${req.get("host")}${product.image}`
          : `${req.protocol}://${req.get("host")}/uploads/no-image.png`,
      },
    });
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: "Server error while adding product" });
  }
});

// ================= READ Products =================
// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const updatedProducts = products.map((p) => ({
      ...p.toObject(),
      imageUrl: p.image
        ? `${req.protocol}://${req.get("host")}${p.image}`
        : `${req.protocol}://${req.get("host")}/uploads/no-image.png`,
    }));
    res.json(updatedProducts);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Server error while fetching products" });
  }
});

// ================= READ Single Product =================
// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({
      ...product.toObject(),
      imageUrl: product.image
        ? `${req.protocol}://${req.get("host")}${product.image}`
        : `${req.protocol}://${req.get("host")}/uploads/no-image.png`,
    });
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    res.status(500).json({ error: "Server error while fetching product" });
  }
});

// ================= UPDATE Product =================
// PUT /api/products/:id
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, stock, brand, category } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // If new image is uploaded → delete old one
    if (req.file) {
      if (product.image && fs.existsSync("." + product.image)) {
        fs.unlinkSync("." + product.image);
      }
      product.image = `/uploads/${req.file.filename}`;
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.brand = brand || product.brand;
    product.category = category || product.category;

    const updatedProduct = await product.save();

    res.json({
      message: "✅ Product updated successfully!",
      product: {
        ...updatedProduct.toObject(),
        imageUrl: updatedProduct.image
          ? `${req.protocol}://${req.get("host")}${updatedProduct.image}`
          : `${req.protocol}://${req.get("host")}/uploads/no-image.png`,
      },
    });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ error: "Server error while updating product" });
  }
});

// ================= DELETE Product =================
// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete product image if exists
    if (product.image && fs.existsSync("." + product.image)) {
      fs.unlinkSync("." + product.image);
    }

    res.json({ message: "🗑️ Product deleted successfully!" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ error: "Server error while deleting product" });
  }
});

module.exports = router;
