import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = 'cartItems'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0, 
}

const cartSlice = createSlice({
    name: "cart",
    initialState: () => {
        const storedCart = localStorage.getItem(localStorageKey);
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            return {
                items: parsedCart.items || [],
                totalQuantity: parsedCart.totalQuantity || 0,
                totalPrice: parsedCart.totalPrice || 0,
            }
        }
        return initialState
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const productId = newItem.id; 
            const existingItemIndex = state.items.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                state.items[existingItemIndex].quantity++
                state.totalPrice += newItem.price
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                })
                state.totalPrice += newItem.price
            }
            state.totalQuantity++
        },

        removeItemFromCart(state, action) {
            const productIdToRemove = action.payload
            const existingItemIndex = state.items.findIndex(item => item.id === productIdToRemove)

            if (existingItemIndex > -1) {
                const removedItem = state.items[existingItemIndex]
                
                if (removedItem.quantity > 1) {
                    removedItem.quantity--;
                    state.totalPrice -= removedItem.price; 
                } else {
                    state.items.splice(existingItemIndex, 1)
                    state.totalPrice -= removedItem.price
                }
                state.totalQuantity--
            }
        },

        deleteItemCompletely(state, action) {
            const idToDelete = action.payload
            const existingItemIndex = state.items.findIndex(item => item.id === idToDelete)

            if (existingItemIndex > -1) {
                const deletedItem = state.items[existingItemIndex]
                state.totalPrice -= deletedItem.price * deletedItem.quantity
                state.totalQuantity -= deletedItem.quantity
                state.items.splice(existingItemIndex, 1)
            }
        },

        clearCart(state) {
            state.items = []
            state.totalQuantity = 0
            state.totalPrice = 0
        }
    },
})

export default cartSlice.reducer
export const { addItemToCart, removeItemFromCart, deleteItemCompletely, clearCart } = cartSlice.actions