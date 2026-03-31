import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const ManageProduct = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [previewImage, setPreviewImage] = useState("");
  const [editProduct, setEditProduct] = useState<any>(null);

  /* FETCH PRODUCTS */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/products/vendor-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* DELETE */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/v1/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* FILTER */
  const filtered = products.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" ||
      p.category?.name === category ||
      p.category === category;

    return matchSearch && matchCategory;
  });

  /* GROUP BY SHOP */
  const groupedProducts = filtered.reduce((acc: any, product: any) => {
    const shopName = product.shop?.shopName || "Other";

    if (!acc[shopName]) acc[shopName] = [];
    acc[shopName].push(product);

    return acc;
  }, {});

  const openEditModal = (product: any) => {
    setEditProduct(product);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-4">

        <h1 className="text-3xl font-bold">Manage Products</h1>

        <div className="flex gap-3 items-center">

          <Input
            placeholder="Search product..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <select
            className="border rounded px-3 py-2"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="grocery">Grocery</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="beauty">Beauty</option>
          </select>

          <Button
            className="bg-blue-600 text-white"
            onClick={() => navigate("/vendor/products/add")}
          >
            Add Product
          </Button>

        </div>
      </div>

      {/* PRODUCTS */}
      {Object.entries(groupedProducts).map(([shopName, shopProducts]: any) => (

        <div key={shopName} className="space-y-4">

          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1">
            🏪 {shopName}
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

            {shopProducts.map((product: any) => (

              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-3 space-y-2"
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={
                      product.images?.[0]
                        ? `http://localhost:8000${product.images[0]}`
                        : "/no-image.png"
                    }
                    className="w-full h-36 object-contain bg-gray-50 rounded-md"
                  />

                  <span className={`absolute top-1 right-1 text-[10px] px-2 py-0.5 rounded-full ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {product.stock > 0 ? "In Stock" : "Out"}
                  </span>
                </div>

                {/* NAME */}
                <h2 className="text-sm font-medium line-clamp-1">
                  {product.name}
                </h2>

                {/* PRICE + STOCK */}
                <div className="flex justify-between text-xs">
                  <p className="font-semibold">₹{product.price}</p>
                  <p>Stock: {product.stock}</p>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between items-center">

                  <button
                    onClick={() => openEditModal(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}

      {/* EMPTY */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No products found 😕
        </div>
      )}

      {/* EDIT MODAL */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">

            <h2 className="text-lg font-semibold">Edit Product</h2>

            <Input
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
            <textarea
  value={editProduct.description || ""}
  onChange={(e) =>
    setEditProduct({ ...editProduct, description: e.target.value })
  }
  placeholder="Enter description..."
  className="w-full border rounded px-3 py-2 text-sm resize-none"
  rows={3}
/>

            <Input
              type="number"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            <Input
              type="number"
              value={editProduct.stock}
              onChange={(e) =>
                setEditProduct({ ...editProduct, stock: e.target.value })
              }
            />

            <img
              src={`http://localhost:8000${editProduct.images?.[0]}`}
              className="w-full h-40 object-contain bg-gray-50 rounded"
            />

           <div className="flex justify-between items-center pt-3 border-t">
              <button
  className="text-gray-500 hover:text-black"
  onClick={() => setEditProduct(null)}
>
  Cancel
</button>

<button
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
  onClick={async () => {
  try {
    const payload = {
      name: editProduct.name,
      description: editProduct.description,
      price: Number(editProduct.price),
      stock: Number(editProduct.stock),
    };

    console.log("PAYLOAD 👉", payload);

    const res = await axios.put(
      `http://localhost:8000/api/v1/products/${editProduct._id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("SUCCESS 👉", res.data);

    toast.success("Product updated ✅");

    setEditProduct(null);
    fetchProducts();

  } catch (err: any) {
    console.log("ERROR 👉", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Update failed ❌");
  }
}}
>
  Save
</button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ManageProduct;