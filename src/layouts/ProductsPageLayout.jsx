import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePageLayout({ children }) {
    const cart = useSelector((store) => store.cart);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* HEADER */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold">Shop</h1>
                    <Link
                        to={`/checkout`}
                        className="flex items-center space-x-2 hover:underline"
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m0 0H17m-9.2 0L5 5"
                            />
                        </svg>
                        <span>shopping cart ({cart.totalQuantity})</span>
                    </Link>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-grow container mx-auto px-6 py-10">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="bg-gray-800 text-white text-center py-6">
                <p>A store website with React and Redux, developed by Reza Geshani</p>
            </footer>
        </div>
    );
}

export default HomePageLayout