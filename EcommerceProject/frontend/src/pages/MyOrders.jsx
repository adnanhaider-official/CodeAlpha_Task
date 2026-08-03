import { Package, CalendarDays, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const statusClasses = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/orders/my");
        setOrders(data.orders);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Track and manage all your recent orders.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-12">{error}</p>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <Package size={60} className="mx-auto text-indigo-500" />

            <h2 className="text-2xl font-bold mt-6">No Orders Yet</h2>

            <p className="text-gray-500 mt-3">
              Looks like you haven't placed any order.
            </p>

            <Link
              to="/products"
              className="inline-flex mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const itemCount = order.products.reduce(
                (total, item) => total + item.quantity,
                0,
              );

              return (
                <div
                  key={order._id}
                  className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* LEFT */}
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Package className="text-indigo-600" size={28} />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-gray-900">
                          #{order._id.slice(-8).toUpperCase()}
                        </h2>

                        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                          <CalendarDays size={16} />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>

                        <p className="mt-2 text-gray-600 text-sm">
                          {itemCount} Item{itemCount > 1 && "s"}
                        </p>
                      </div>
                    </div>

                    {/* CENTER */}
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-sm text-gray-500">Total</p>

                        <h3 className="font-bold text-lg mt-1">
                          Rs. {order.totalAmount}
                        </h3>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Status</p>

                        <span
                          className={`inline-flex mt-2 px-4 py-1 rounded-full text-sm font-medium capitalize ${statusClasses[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <Link
                      to={`/orders/${order._id}`}
                      className="w-full lg:w-auto inline-flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-5 py-3 rounded-xl transition"
                    >
                      View Details
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
