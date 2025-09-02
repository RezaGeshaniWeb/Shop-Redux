import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export default function OrderSummary({ subtotal, discount, total }) {
    const dispatch = useDispatch();

    return (
        <div className="self-start sticky top-6 bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
            </h3>
            <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Discount (10%):</span>
                    <span className="text-red-500">
                        − ${discount.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-gray-900 mt-2">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <button
                    onClick={() => dispatch(clearCart())}
                    className="text-red-800 hover:text-red-900 text-sm bg-red-200 px-4 py-1 rounded-sm cursor-pointer"
                >
                    Clear Cart
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
                    Complete Purchase
                </button>
            </div>
        </div>
    )
}