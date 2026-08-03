import { useEffect, useState } from "react";
import { Package, ClipboardList, Wallet, Users } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    orderCount: 0,
    revenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [productsRes, ordersRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders"),
        ]);

        const products = productsRes.data.products;
        const orders = ordersRes.data.orders;

        const revenue = orders.reduce(
          (total, order) => total + order.totalAmount,
          0,
        );
        const pendingOrders = orders.filter(
          (order) => order.status === "pending",
        ).length;

        setStats({
          productCount: products.length,
          orderCount: orders.length,
          revenue,
          pendingOrders,
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.productCount,
      icon: Package,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Total Orders",
      value: stats.orderCount,
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Revenue",
      value: `Rs. ${stats.revenue}`,
      icon: Wallet,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Users,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white rounded-2xl border p-5 shadow-sm"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <p className="text-gray-500 mt-4 text-sm">{card.label}</p>
                  <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
                </div>
              );
            })}
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border shadow-sm p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-indigo-600 text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No orders yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-3 pr-4">Order ID</th>
                      <th className="py-3 pr-4">Customer</th>
                      <th className="py-3 pr-4">Total</th>
                      <th className="py-3 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">
                          #{order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="py-3 pr-4">
                          {order.user?.name || "N/A"}
                        </td>
                        <td className="py-3 pr-4">Rs. {order.totalAmount}</td>
                        <td className="py-3 pr-4 capitalize">
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
