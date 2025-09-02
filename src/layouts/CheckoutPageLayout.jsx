import { Link } from "react-router-dom"

function CheckoutPageLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold">Shop</h1>
                    <Link
                        to="/products"
                        className="bg-white text-gray-900 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition"
                    >
                        ← Back to HOME
                    </Link>
                </div>
            </header>

            {children}
        </div>
    )
}

export default CheckoutPageLayout
