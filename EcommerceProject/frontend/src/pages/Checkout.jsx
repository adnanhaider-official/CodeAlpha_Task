import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    city: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) return;

    const { name, email, phone, city, address } = formData;
    if (!name || !email || !phone || !city || !address) {
      setError("Please fill in all shipping fields.");
      return;
    }

    try {
      setPlacing(true);

      const { data } = await api.post("/orders", {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shipping: { name, email, phone, city, address },
      });

      clearCart();
      navigate("/order-success", { state: { order: data.order } });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to place order. Try again.",
      );
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your shipping information to place your order.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-5 sm:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Shipping Information
            </h2>

            <form
              id="checkout-form"
              onSubmit={handlePlaceOrder}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Name */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="03XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-gray-700">
                  Address
                </label>

                <textarea
                  rows={5}
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 text-sm md:text-base resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border p-5 sm:p-6 h-fit lg:sticky lg:top-24">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-6">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start justify-between gap-3 border-b pb-3"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-sm md:text-base">
                          {item.name}
                        </h3>

                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <span className="font-semibold whitespace-nowrap text-sm md:text-base">
                        Rs. {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>

                    <span>Rs. {totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>

                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                <hr className="my-6" />

                <div className="flex justify-between text-lg md:text-xl font-bold">
                  <span>Total</span>

                  <span className="text-indigo-600">Rs. {totalPrice}</span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={placing}
                  className="w-full mt-6 md:mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition duration-300"
                >
                  {placing ? "Placing Order..." : "Place Order"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
