// HomePageFn
export const getQuantityInCart = (cartItems, productId) => {
    const cartItem = cartItems.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
}

export const checkItemInCart = (cartItems, productId) => {
    return cartItems.some((item) => item.id === productId);
}


// CheckoutPageFn
export function calculateCartSummary(items, discountRate = 0.1) {
  const subtotal = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const discount = parseFloat((subtotal * discountRate).toFixed(2));
  const total = parseFloat((subtotal - discount).toFixed(2));

  return { subtotal, discount, total };
}