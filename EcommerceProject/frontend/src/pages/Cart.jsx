import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <ShoppingCart size={80} className="text-gray-400" />

        <h2 className="text-3xl font-bold mt-5">Your Cart is Empty</h2>

        <p className="text-gray-500 mt-2">
          Add some products to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold mb-10">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <CartSummary />
        </div>
      </div>
    </section>
  );
};

export default Cart;
