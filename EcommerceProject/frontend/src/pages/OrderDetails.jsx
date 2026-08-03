import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  MapPin,
  Package,
  CheckCircle,
  Clock3,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const statusClasses = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.order);
      } catch (err) {
        setError(err.response?.data?.message || "Order not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading order...</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-red-500">
          {error || "Order Not Found"}
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Back */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold">
                #{order._id.slice(-8).toUpperCase()}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 mt-3">
                <CalendarDays size={18} />
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span
                className={`inline-flex px-4 py-2 rounded-full text-sm font-medium capitalize ${statusClasses[order.status]}`}
              >
                {order.status}
              </span>

              <h2 className="text-3xl font-bold text-indigo-600 mt-4">
                Rs. {order.totalAmount}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-5">Shipping Information</h2>

              <div className="space-y-3">
                <p>
                  <strong>Name:</strong> {order.shipping?.name}
                </p>

                <p>
                  <strong>Email:</strong> {order.shipping?.email}
                </p>

                <p>
                  <strong>Phone:</strong> {order.shipping?.phone}
                </p>

                <div className="flex gap-2">
                  <MapPin size={18} className="text-indigo-600 mt-1" />

                  <p>
                    {order.shipping?.address}
                    {order.shipping?.city ? `, ${order.shipping.city}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6">Ordered Products</h2>

              <div className="space-y-6">
                {order.products.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex flex-col sm:flex-row justify-between gap-5 border-b last:border-0 pb-5"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.product.name}
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Quantity : {item.quantity}
                        </p>

                        <p className="text-gray-500">
                          Price : Rs. {item.price}
                        </p>
                      </div>
                    </div>

                    <div className="text-lg font-bold">
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Items</span>

                  <span>
                    {order.products.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>Rs. {order.totalAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span className="text-green-600">Free</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span className="text-indigo-600">
                    Rs. {order.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-5">Payment Method</h2>

              <div className="flex items-center gap-3">
                <CreditCard className="text-indigo-600" />
                <span>Cash on Delivery</span>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-5">Order Status</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" />
                  <span>Order Placed</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock3 className="text-yellow-500" />
                  <span className="capitalize">{order.status}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Package className="text-indigo-600" />
                  <span>Ready for Delivery</span>
                </div>
              </div>
            </div>

            <Link
              to="/products"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
