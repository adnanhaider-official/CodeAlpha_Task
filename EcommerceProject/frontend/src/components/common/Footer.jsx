import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShoppingBag className="text-white" size={20} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Shop<span className="text-indigo-600">ly</span>
            </h2>

            <p className="text-sm text-gray-500">
              Premium products at your fingertips.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Products
          </Link>

          <Link
            to="/orders"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Orders
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 text-center md:text-right">
          © 2026 <span className="font-semibold">Shoply</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
