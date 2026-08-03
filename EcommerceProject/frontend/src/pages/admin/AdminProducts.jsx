import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import api from "../../api/axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data.products);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout title="Products">
      <div className="flex justify-end mb-5">
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-gray-500 text-center py-12">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-red-500 text-center py-12">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No products yet. Add your first one.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="py-3 px-5">Product</th>
                  <th className="py-3 px-5">Category</th>
                  <th className="py-3 px-5">Price</th>
                  <th className="py-3 px-5">Stock</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b last:border-0">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5">{product.category}</td>
                    <td className="py-3 px-5">Rs. {product.price}</td>
                    <td className="py-3 px-5">
                      {product.stock > 0 ? (
                        product.stock
                      ) : (
                        <span className="text-red-500 font-medium">
                          Out of stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deletingId === product._id}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
