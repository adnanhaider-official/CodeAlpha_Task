import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../components/admin/AdminLayout";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusClasses = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/orders");
      setOrders(data.orders);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await api.put(`/orders/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-gray-500 text-center py-12">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-12">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="py-3 px-5">Order ID</th>
                  <th className="py-3 px-5">Customer</th>
                  <th className="py-3 px-5">Items</th>
                  <th className="py-3 px-5">Total</th>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const itemCount = order.products.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  );

                  return (
                    <tr key={order._id} className="border-b last:border-0">
                      <td className="py-3 px-5 font-medium">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-3 px-5">
                        <div>{order.user?.name || "N/A"}</div>
                        <div className="text-xs text-gray-400">
                          {order.user?.email}
                        </div>
                      </td>
                      <td className="py-3 px-5">{itemCount}</td>
                      <td className="py-3 px-5">Rs. {order.totalAmount}</td>
                      <td className="py-3 px-5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-5">
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`text-xs font-medium capitalize rounded-full px-3 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 ${statusClasses[order.status]}`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
