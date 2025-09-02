import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "../hooks/useTitle";
import useLocalStorage from "../hooks/useLocalStorage";
import ProductsPageLayout from "../layouts/ProductsPageLayout";
import ProductFilter from "../components/ProductFilter";
import ProductGrid from "../components/ProductGrid";
import { getQuantityInCart as getQuantityHelper, checkItemInCart as checkItemHelper } from '../helper/helper'; 
import { fetchProducts } from "../features/products/productsSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import Loading from "../components/Loading";

function ProductsPage() {
  const dispatch = useDispatch();
  const productsState = useSelector((store) => store.products);
  const cart = useSelector((store) => store.cart);

  useTitle('Shop - ProductsPage')

  const localStorageKey = "disabledButtons";
  const [disabledButtons, setDisabledButtons] = useLocalStorage(localStorageKey, {});

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const updatedDisabledButtons = { ...disabledButtons };
    let changed = false;

    Object.keys(updatedDisabledButtons).forEach((productId) => {
      if (!checkItemHelper(cart.items, productId)) {
        delete updatedDisabledButtons[productId];
        changed = true;
      }
    });

    if (changed) {
      setDisabledButtons(updatedDisabledButtons);
    }
  }, [cart.items, setDisabledButtons])

  const addToCartHandler = useCallback(
    (item) => {
      dispatch(addItemToCart(item));
      setDisabledButtons((prev) => ({ ...prev, [item.id]: true }));
    },
    [dispatch, setDisabledButtons]
  );

  const handlePriceRangeChange = useCallback((event, newValue) => {
    setPriceRange(newValue);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredProducts = productsState.products.filter((item) => {
    const matchesSearchTerm = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPriceRange =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesSearchTerm && matchesPriceRange;
  });

  return (
    <ProductsPageLayout>
      {/* Filter Section */}
      <ProductFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
      />

      {/* PRODUCTS GRID SECTION */}
      {productsState.loading && (
        <Loading />
      )}
      {productsState.error && (
        <h3 className="text-center text-xl text-red-600">
          error: {productsState.error}
        </h3>
      )}
      {!productsState.loading &&
        !productsState.error &&
        filteredProducts.length === 0 && (
          <h3 className="text-center text-xl text-gray-500">
            No product with these specifications was found.
          </h3>
        )}

      {!productsState.loading && !productsState.error && filteredProducts.length > 0 && (
        <ProductGrid
          products={filteredProducts}
          disabledButtons={disabledButtons}
          getQuantityInCart={(productId) => getQuantityHelper(cart.items, productId)}
          addToCartHandler={addToCartHandler}
        />
      )}
    </ProductsPageLayout>
  );
}

export default ProductsPage