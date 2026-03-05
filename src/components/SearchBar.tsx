import { useState } from "react";
import axios from "axios";

const SearchBar = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (value: string) => {

    setQuery(value);

    if (!value) {
      setResults(null);
      return;
    }

    const res = await axios.get(
      `http://localhost:8000/api/v1/search?q=${value}`
    );

    setResults(res.data.data);
  };

  return (
    <div className="relative w-full max-w-xl">

      <input
        type="text"
        placeholder="Search shops or products..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full border-2 border-black rounded-full px-5 py-2"
      />

      {/* Results Dropdown */}

      {results && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-3 z-50">

          {results.shops?.map((shop: any) => (
            <p key={shop._id} className="text-sm py-1">
              🏪 {shop.shopName}
            </p>
          ))}

          {results.products?.map((product: any) => (
            <p key={product._id} className="text-sm py-1">
              📦 {product.name}
            </p>
          ))}

        </div>
      )}

    </div>
  );
};

export default SearchBar;