import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addItemToCart, removeItemFromCart } from "../features/cart/cartSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import { checkItemInCart, getQuantityInCart } from "../helper/helper";
import CheckoutPageLayout from "../layouts/CheckoutPageLayout";
import useTitle from "../hooks/useTitle";
import Loading from "../components/Loading";

function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useTitle("Shop - DetailsPage");

  const { products, loading, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  const localStorageKey = "disabledButtons";
  const [disabledButtons, setDisabledButtons] = useLocalStorage(localStorageKey, {});

  useEffect(() => {
    if (products.length === 0 && !loading && !error) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading, error]);

  useEffect(() => {
    const updatedDisabledButtons = { ...disabledButtons };
    let changed = false;

    Object.keys(updatedDisabledButtons).forEach((productId) => {
      if (!checkItemInCart(cartItems, productId)) {
        delete updatedDisabledButtons[productId];
        changed = true;
      }
    });

    if (changed) {
      setDisabledButtons(updatedDisabledButtons);
    }
  }, [cartItems, setDisabledButtons, disabledButtons]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error fetching products: {error}
      </div>
    );
  }

  const product = products.find((p) => String(p.id) === id);
  if (!product) {
    return (
      <div className="p-6 text-center">
        Product not found.
        <div>
          <Link to="/products" className="text-blue-600 hover:underline">
            ← Back to products page
          </Link>
        </div>
      </div>
    );
  }

  const itemQuantityInCart = getQuantityInCart(cartItems, product.id);
  const isItemInCart = itemQuantityInCart > 0;
  const isDisabled = disabledButtons[product.id] || isItemInCart;

  const addToCartHandler = (item) => {
    dispatch(addItemToCart(item));
    setDisabledButtons((prev) => ({ ...prev, [item.id]: true }));
  };

  return (
    <CheckoutPageLayout>
      <div className="2xl:container lg:w-[90%] mx-auto flex flex-col md:flex-row md:items-center rounded-lg shadow overflow-hidden">
        <div className="md:w-1/2 p-7">
          <img
            src={product.image}
            alt={product.title}
            className="w-full lg:w-3/4 mx-auto h-[500px] object-cover object-top"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => addToCartHandler(product)}
              disabled={isDisabled}
              className={`cursor-pointer py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isDisabled ? "Added to Cart" : "Add to Cart"}
            </button>

            {isItemInCart && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch(removeItemFromCart(product.id))}
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                >
                  –
                </button>
                <span className="font-bold text-lg">{itemQuantityInCart}</span>
                <button
                  onClick={() => dispatch(addItemToCart(product))}
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            )}
          </div>

          <Link
            to="/checkout"
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition text-center w-1/2"
          >
            Go to Shopping Cart
          </Link>
        </div>
      </div>
    </CheckoutPageLayout>
  );
}

export default DetailsPage;
