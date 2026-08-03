import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ClipboardList },
];

const AdminLayout = ({ children, title }) => {
  const location = useLocation();

  const isActive = (item) =>
    item.exact
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 bg-white border-b md:border-b-0 md:border-r flex-shrink-0">
        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Admin Panel</h2>
          {/* <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mt-2"
          >
            <ArrowLeft size={14} />
            Back to Store
          </Link> */}
        </div>

        <nav className="p-3 flex md:flex-col gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-5 md:p-8">
        {title && (
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
