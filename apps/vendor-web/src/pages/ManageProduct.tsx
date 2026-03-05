import { useEffect, useState } from "react";
import axios from "axios";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [shopId, setShopId] = useState("");

  // 🔥 Get shop
  useEffect(() => {
    const fetchShop = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/shops/my-shop",
        { withCredentials: true }
      );

      if (res.data.success) {
        setShopId(res.data.data._id);
      }
    };

    fetchShop();
  }, []);

  // 🔥 Get products of that shop
  useEffect(() => {
    if (!shopId) return;

    const fetchProducts = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/v1/products/shop/${shopId}`
      );

      if (res.data.success) {
        setProducts(res.data.data);
      }
    };

    fetchProducts();
  }, [shopId]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Manage Products</h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.finalPrice}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  {product.isActive ? "Active" : "Disabled"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;