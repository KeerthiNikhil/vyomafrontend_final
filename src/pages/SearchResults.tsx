import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchResults = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/v1/products?search=${query}`
      );
      setResults(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (query) fetchResults();
}, [query]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {results.map((item: any) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
