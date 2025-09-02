import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    addItemToCart,
    removeItemFromCart,
    deleteItemCompletely,
} from "../features/cart/cartSlice";

export default function CartItemsList({ items }) {
    const dispatch = useDispatch()

    return (
        <div className="space-y-6 md:col-span-2">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-48 w-1/2 mx-auto block object-cover object-top"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h4 className="text-lg font-semibold text-gray-800">
                                {item.title}
                            </h4>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                                {item.description.slice(0, 60)}...
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => dispatch(removeItemFromCart(item.id))}
                                        disabled={item.quantity <= 1}
                                        className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                                    >
                                        −
                                    </button>
                                    <span className="text-indigo-600 font-semibold">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => dispatch(addItemToCart(item))}
                                        className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() =>
                                        dispatch(deleteItemCompletely(item.id))
                                    }
                                    className="text-red-800 hover:text-red-900 text-sm bg-red-200 px-4 py-1 rounded-sm"
                                >
                                    Remove
                                </button>
                            </div>

                            <Link
                                to={`/products/${item.id}`}
                                className="mt-6 w-32 text-indigo-600 hover:underline"
                            >
                                Show Details →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}