import { CheckCircle } from "lucide-react";
import { Link, useLocation, Navigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  // If someone lands here directly without placing an order, send them back.
  if (!order) {
    return <Navigate to="/products" replace />;
  }

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-10 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={60} className="text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mt-8">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mt-4 leading-7">
          Thank you for shopping with us. Your order has been received and is
          being processed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 border rounded-xl p-5 mt-8 text-left">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Order ID</span>
            <span className="font-semibold">
              #{order._id.slice(-8).toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">Rs. {order.totalAmount}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Payment</span>
            <span className="font-semibold text-green-600">
              Cash on Delivery
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span className="font-semibold text-yellow-600 capitalize">
              {order.status}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/products"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 rounded-lg font-semibold transition"
          >
            My Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
