import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const { totalPrice } = useCart();

  return (
    <div className="bg-white border rounded-xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="flex justify-between mb-3">
        <span>Subtotal</span>

        <span>Rs. {totalPrice}</span>
      </div>

      <div className="flex justify-between mb-3">
        <span>Shipping</span>

        <span className="text-green-600">Free</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>

        <span>Rs. {totalPrice}</span>
      </div>

      <Link
        to="/checkout"
        className="block w-full bg-indigo-600 text-white py-3 rounded-lg text-center hover:bg-indigo-700 transition mt-3"
      >
        Proceed To Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
