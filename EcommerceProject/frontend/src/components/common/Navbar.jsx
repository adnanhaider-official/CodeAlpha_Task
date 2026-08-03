import { ShoppingBag, ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShoppingBag className="text-white" size={22} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Shop<span className="text-indigo-600">ly</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-indigo-600 transition">
            Products
          </Link>

          <Link to="/orders" className="hover:text-indigo-600 transition">
            Orders
          </Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart
              size={24}
              className="text-gray-700 hover:text-indigo-600 transition"
            />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-indigo-600 text-white rounded-full text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                >
                  Admin
                </Link>
              )}

              <span className="flex items-center gap-2 text-gray-700 font-medium">
                <User size={18} />
                {user?.name?.split(" ")[0]}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 font-medium hover:text-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-5 py-4 space-y-4">
          <Link to="/" className="block" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link
            to="/products"
            className="block"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>

          <Link to="/orders" className="block" onClick={() => setOpen(false)}>
            Orders
          </Link>

          <Link to="/cart" className="block" onClick={() => setOpen(false)}>
            Cart {totalItems > 0 && `(${totalItems})`}
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="block font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 font-medium"
              >
                Logout ({user?.name?.split(" ")[0]})
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block bg-indigo-600 text-white text-center py-2 rounded-lg"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
