import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [editingPrice, setEditingPrice] = useState<any>(null);
  const [editingStock, setEditingStock] = useState<any>(null);

  const [previewImage, setPreviewImage] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  /* FETCH PRODUCTS */

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/products/vendor-products",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(res.data.data);

    } catch {

      toast.error("Failed to load products");

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* DELETE PRODUCT */

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

  /* UPDATE PRICE */

  const updatePrice = async (id: string, value: number) => {

    try {

      await axios.patch(
        `http://localhost:8000/api/v1/products/${id}/price`,
        { price: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Price updated");
      fetchProducts();

    } catch {

      toast.error("Price update failed");

    }

  };

  /* UPDATE STOCK */

  const updateStock = async (id: string, value: number) => {

    try {

      await axios.patch(
        `http://localhost:8000/api/v1/products/${id}/stock`,
        { stock: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Stock updated");
      fetchProducts();

    } catch {

      toast.error("Stock update failed");

    }

  };

  /* FILTER */

  const filtered = products.filter((p) => {

    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" || p.category === category;

    return matchSearch && matchCategory;

  });

  /* PAGINATION */

  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (

    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Manage Products
        </h1>

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

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Image</th>
              <th>Product</th>
              <th>Shop</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {paginated.map((product) => (

              <tr key={product._id} className="border-b hover:bg-gray-50">

                <td className="p-4">

                  <img
                    src={`http://localhost:8000${product.images?.[0]}`}
                    className="w-14 h-14 rounded object-cover cursor-pointer"
                    onClick={() =>
                      setPreviewImage(
                        `http://localhost:8000${product.images?.[0]}`
                      )
                    }
                  />

                </td>

                <td className="font-medium">
                  {product.name}
                </td>

                <td>
                  {product.shop?.shopName}
                </td>

                {/* PRICE */}

                <td>

                  {editingPrice === product._id ? (

                    <Input
                      type="number"
                      defaultValue={product.price}
                      onBlur={(e)=>{
                        updatePrice(product._id, Number(e.target.value));
                        setEditingPrice(null);
                      }}
                    />

                  ) : (

                    <span
                      className="cursor-pointer"
                      onClick={()=>setEditingPrice(product._id)}
                    >
                      ₹{product.price}
                    </span>

                  )}

                </td>

                {/* STOCK */}

                <td>

                  {editingStock === product._id ? (

                    <Input
                      type="number"
                      defaultValue={product.stock}
                      onBlur={(e)=>{
                        updateStock(product._id, Number(e.target.value));
                        setEditingStock(null);
                      }}
                    />

                  ) : (

                    <span
                      className="cursor-pointer"
                      onClick={()=>setEditingStock(product._id)}
                    >
                      {product.stock}
                    </span>

                  )}

                </td>

                <td>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Active
                  </span>

                </td>

                {/* ACTIONS */}

                <td className="py-4">
                  <div className="flex items-center gap-3">

                    <Button size="sm" className="h-8 px-3">
                      Edit
                    </Button>

                    <button
                      className="text-red-600 text-sm"
                      onClick={()=>handleDelete(product._id)}
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center gap-3">

        {[...Array(totalPages)].map((_, i)=>(
          <button
            key={i}
            onClick={()=>setPage(i+1)}
            className={`px-3 py-1 rounded ${
              page === i+1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i+1}
          </button>
        ))}

      </div>

      {/* IMAGE MODAL */}

      {previewImage && (

        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          onClick={()=>setPreviewImage("")}
        >

          <img
            src={previewImage}
            className="max-h-[80vh] rounded-lg"
          />

        </div>

      )}

    </div>

  );

};

export default ManageProduct;