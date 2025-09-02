import { Link } from "react-router-dom";
import CheckoutPageLayout from "../layouts/CheckoutPageLayout";
import useTitle from "../hooks/useTitle";

function NotFoundPage() {
  useTitle('Shop - NotFound')

  return (
    <CheckoutPageLayout>
      <div className="flex-1 min-h-[100vh] flex flex-col items-center justify-center bg-gray-100 px-6">
        <h1 className="text-8xl font-extrabold mb-4">404</h1>
        <p className="text-2xl mb-6">Page not found</p>
        <Link
          to="/products"
          className="text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          ← Back to Products
        </Link>
      </div>
    </CheckoutPageLayout>
  );
}

export default NotFoundPage