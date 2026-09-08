import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Mock Products Database
const products = {
  women: [
    {
      item: 1,
      itemName: "Everyday Straight Leg Pants",
      description:
        "High-waisted straight-leg pants designed for everyday comfort with a relaxed fit and adjustable tie waist.",
      image1:
        "https://i.pinimg.com/736x/4f/bd/7b/4fbd7ba14b539887330811573b0af239.jpg",
      image2:
        "https://i.pinimg.com/736x/bc/79/d6/bc79d6b971d1f3c47e0f00db33f8a392.jpg",
      price: "€65",
      ratings: "4.8",
      category: "Bottoms",
      availableSizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    },
    {
      item: 2,
      itemName: "Oversized Essential Hoodie",
      description:
        "A premium oversized hoodie made for effortless everyday styling with a soft brushed interior.",
      image1: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      image2: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      price: "€75",
      ratings: "4.7",
      category: "Tops",
      availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      item: 3,
      itemName: "Classic Cropped Jacket",
      description:
        "A structured cropped jacket with a modern silhouette, perfect for layering during cooler days.",
      image1: "https://images.unsplash.com/photo-1544022613-e87ca75a784a",
      image2: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      price: "€110",
      ratings: "4.9",
      category: "Outerwear",
      availableSizes: ["XS", "S", "M", "L", "XL"],
    },
  ],
  men: [
    {
      item: 1,
      itemName: "Essential Oversized Hoodie",
      description:
        "Heavyweight oversized hoodie designed with a relaxed fit and soft brushed interior for everyday comfort.",
      image1: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      image2: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      price: "€79",
      ratings: "4.8",
      category: "Tops",
      availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    },
    {
      item: 2,
      itemName: "Classic Straight Jeans",
      description:
        "Timeless straight-fit denim jeans featuring a durable cotton construction and versatile washed finish.",
      image1: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      image2: "https://images.unsplash.com/photo-1604176354204-9268737828e4",
      price: "€89",
      ratings: "4.7",
      category: "Bottoms",
      availableSizes: ["28", "30", "32", "34", "36", "38"],
    },
    {
      item: 3,
      itemName: "Minimal Bomber Jacket",
      description:
        "Contemporary bomber jacket with a clean silhouette, ribbed cuffs and lightweight insulated construction.",
      image1: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      image2: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb",
      price: "€119",
      ratings: "4.9",
      category: "Outerwear",
      availableSizes: ["S", "M", "L", "XL", "XXL"],
    },
  ],
};

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "DROPP API Server is running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      products: "/api/products",
      menProducts: "/api/products/men",
      womenProducts: "/api/products/women",
      orders: "/api/orders",
    },
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Get all products or filter by gender/category
app.get("/api/products", (req, res) => {
  const { gender, category, search } = req.query;

  let allProducts = [];
  if (gender === "women") {
    allProducts = [...products.women];
  } else if (gender === "men") {
    allProducts = [...products.men];
  } else {
    allProducts = [...products.women, ...products.men];
  }

  if (category) {
    allProducts = allProducts.filter(
      (p) => p.category && p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (search) {
    const q = search.toLowerCase();
    allProducts = allProducts.filter(
      (p) =>
        p.itemName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  res.json({
    count: allProducts.length,
    products: allProducts,
  });
});

// Get products by gender
app.get("/api/products/:gender", (req, res) => {
  const { gender } = req.params;
  const list = products[gender.toLowerCase()];

  if (!list) {
    return res
      .status(404)
      .json({
        error: `Gender category '${gender}' not found. Use 'men' or 'women'.`,
      });
  }

  res.json({
    gender,
    count: list.length,
    products: list,
  });
});

// Get single product
app.get("/api/products/:gender/:id", (req, res) => {
  const { gender, id } = req.params;
  const list = products[gender.toLowerCase()];

  if (!list) {
    return res.status(404).json({ error: "Category not found" });
  }

  const product = list.find((p) => String(p.item) === String(id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ product });
});

// Place order endpoint
app.post("/api/orders", (req, res) => {
  const { items, customer, paymentMethod, total } = req.body;

  if (!items || !items.length || !customer) {
    return res.status(400).json({
      error: "Invalid order data. 'items' and 'customer' details are required.",
    });
  }

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderRecord = {
    orderId,
    items,
    customer,
    paymentMethod: paymentMethod || "card",
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    message: "Order placed successfully",
    order: orderRecord,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✓ DROPP Express server running at http://localhost:${PORT}`);
});
