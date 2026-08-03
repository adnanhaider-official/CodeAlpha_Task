import { Minus, Plus, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
        setQuantity(1);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load this product.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-red-500">
          {error || "Product Not Found"}
        </h2>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-lg object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-5">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-yellow-500">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>

              <span className="text-gray-500 text-sm">(4.8 Reviews)</span>
            </div>

            {/* Price */}
            <h2 className="text-4xl font-bold text-indigo-600 mt-6">
              Rs. {product.price}
            </h2>

            {/* Description */}
            <p className="mt-6 text-gray-600 leading-8">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-3">
              <span className="font-semibold text-gray-800">Availability:</span>

              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-5 mt-8">
              <span className="font-semibold">Quantity</span>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={decrease}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  <Minus size={18} />
                </button>

                <span className="px-6 font-semibold">{quantity}</span>

                <button
                  onClick={increase}
                  className="px-4 py-3 hover:bg-gray-100 transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
              >
                {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
              </button>

              <Link
                to="/products"
                className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-semibold text-center transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
