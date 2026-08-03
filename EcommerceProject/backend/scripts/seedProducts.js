import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Comfortable over-ear wireless headphones with noise cancellation and 30-hour battery life.",
    price: 4999,
    image: "https://placehold.co/600x600/6366f1/ffffff?text=Wireless+Headphones",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor, GPS, and 7-day battery life.",
    price: 8999,
    image: "https://placehold.co/600x600/6366f1/ffffff?text=Smart+Watch",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Leather Backpack",
    description: "Durable genuine leather backpack with laptop compartment, perfect for daily commute.",
    price: 3499,
    image: "https://placehold.co/600x600/6366f1/ffffff?text=Leather+Backpack",
    category: "Fashion",
    stock: 30,
  },
  {
    name: "Running Shoes",
    description: "Lightweight breathable running shoes with cushioned sole for maximum comfort.",
    price: 2999,
    image: "https://placehold.co/600x600/6366f1/ffffff?text=Running+Shoes",
    category: "Fashion",
    stock: 40,
  },
  {
    name: "Coffee Maker",
    description: "Programmable drip coffee maker with 12-cup capacity and auto shut-off.",
    price: 5499,
    image: "https://placehold.co/600x600/6366f1/ffffff?text=Coffee+Maker",
    category: "Home",
    stock: 12,
  },
  {
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with touch control and multiple brightness levels.",
    price: 1799,
    image: "https://placehold.co/600x600/6366f1/ffffff?text=Desk+Lamp",
    category: "Home",
    stock: 20,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} sample products added`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
