import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
    }
})


const localStorageKey = 'cartItems'

store.subscribe(() => {
  const state = store.getState();
  const cartData = {
    items: state.cart.items,
    totalQuantity: state.cart.totalQuantity,
    totalPrice: state.cart.totalPrice,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(cartData));
});

export default store