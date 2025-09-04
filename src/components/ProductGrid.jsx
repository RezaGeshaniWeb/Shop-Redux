import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../features/cart/cartSlice';

function ProductGrid({
    products,
    disabledButtons,
    getQuantityInCart,
    addToCartHandler
}) {
    const dispatch = useDispatch()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item) => {
                const itemQuantityInCart = getQuantityInCart(item.id);
                const isItemInCart = itemQuantityInCart > 0;
                const isDisabled = disabledButtons[item.id] || isItemInCart;

                return (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow flex flex-col"
                    >
                        <div className="aspect-w-1 aspect-h-1">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover p-6 h-[320px] object-top w-full"
                            />
                        </div>
                        <div className="px-6 pb-6 flex flex-col flex-grow">
                            <h4 className="mt-4 text-lg font-semibold text-gray-800">
                                {item.title}
                            </h4>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                {item.description}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xl font-bold text-indigo-600">
                                    ${item.price.toFixed(2)}
                                </span>
                                <Link
                                    to={`/products/${item.id}`}
                                    className="text-sm text-indigo-500 hover:underline"
                                >
                                    Show details
                                </Link>
                            </div>

                            <button
                                onClick={() => addToCartHandler(item)}
                                disabled={isDisabled}
                                className={`cursor-pointer select-none mt-4 w-full py-2 rounded-lg text-white font-medium transition-colors ${isDisabled
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                    }`}
                            >
                                {isDisabled ? "Added to cart" : "Add to cart"}
                            </button>

                            {isItemInCart && (
                                <div className="mt-3 flex items-center justify-center space-x-3">
                                    <button
                                        onClick={() =>
                                            dispatch(removeItemFromCart(item.id))
                                        }
                                        className="cursor-pointer px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                                    >
                                        –
                                    </button>
                                    <span className="font-bold text-gray-800">
                                        {itemQuantityInCart}
                                    </span>
                                    <button
                                        onClick={() => dispatch(addItemToCart(item))}
                                        className="cursor-pointer px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductGrid
