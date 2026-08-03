import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-5 border rounded-xl bg-white">
      {/* Left */}
      <div className="flex items-center gap-4 w-full">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>

          <p className="text-indigo-600 font-bold mt-1">Rs. {item.price}</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center border rounded-lg">
        <button
          onClick={() => decreaseQuantity(item._id)}
          className="p-2 hover:bg-gray-100"
        >
          <Minus size={18} />
        </button>

        <span className="px-5">{item.quantity}</span>

        <button
          onClick={() => increaseQuantity(item._id)}
          className="p-2 hover:bg-gray-100"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Total */}
      <div className="font-semibold">Rs. {item.price * item.quantity}</div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
};

export default CartItem;
