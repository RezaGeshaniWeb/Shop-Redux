import { useSelector } from "react-redux";
import { calculateCartSummary } from "../helper/helper";
import CheckoutPageLayout from "../layouts/CheckoutPageLayout";
import OrderSummary from "../components/OrderSummary";
import CartItemsList from "../components/CartItemsList";
import useTitle from "../hooks/useTitle";

function CheckoutPage() {
    const { items } = useSelector((store) => store.cart);

    const { subtotal, discount, total } = calculateCartSummary(items, 0.1);

    useTitle('Shop - CheckoutPage')

    return (
        <CheckoutPageLayout>
            <main className="container mx-auto px-6 py-8 flex-grow">
                {items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <OrderSummary
                            subtotal={subtotal}
                            discount={discount}
                            total={total}
                        />

                        {/* Products List */}
                        <CartItemsList items={items} />
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">
                        Your cart is empty.
                    </p>
                )}
            </main>
        </CheckoutPageLayout>
    );
}

export default CheckoutPage