import Slider from "@mui/material/Slider";

function ProductFilter({
    searchTerm,
    onSearchChange,
    priceRange,
    onPriceRangeChange
}) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 flex flex-col md:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">
                    Search by product name
                </label>
                <input
                    type="text"
                    placeholder="Example: sports shoes"
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Price Slider */}
            <div className="flex-1">
                <label
                    htmlFor="mui-range-slider"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Price Range
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Slider
                        id="mui-range-slider"
                        value={priceRange}
                        onChange={onPriceRangeChange} 
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                        sx={{
                            color: "#4f46e5",
                            "& .MuiSlider-thumb": {
                                backgroundColor: "#fff",
                                border: "2px solid currentColor",
                            },
                            "& .MuiSlider-rail": { color: "#cbd5e1" },
                        }}
                    />
                    <div className="flex justify-between text-gray-600 mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFilter