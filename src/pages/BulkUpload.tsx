import { useEffect, useState } from "react";
import axios from "../lib/axios";

const BulkUpload = () => {

  const [file, setFile] = useState<any>(null);
  const [shops, setShops] = useState<any[]>([]);
  const [shopId, setShopId] = useState("");

  /* LOAD VENDOR SHOPS */

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {

    try {

      const res = await axios.get("/shops/vendor");

      setShops(res.data.data);

    } catch (error) {
      console.log("SHOP FETCH ERROR:", error);
    }

  };

  /* UPLOAD EXCEL */

  const handleUpload = async () => {

    if (!shopId) {
      alert("Please select shop");
      return;
    }

    if (!file) {
      alert("Please choose Excel file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("shopId", shopId);

    try {

      await axios.post(
        "/products/bulk-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Products uploaded successfully");

    } catch (error) {

      console.log("UPLOAD ERROR:", error);

      alert("Upload failed");

    }

  };

  return (

    <div className="space-y-6">

      {/* SELECT SHOP */}

      <select
        value={shopId}
        onChange={(e) => setShopId(e.target.value)}
        className="border p-2 rounded w-full"
      >

        <option value="">Select Shop</option>

        {shops.map((shop) => (

          <option key={shop._id} value={shop._id}>
            {shop.shopName}
          </option>

        ))}

      </select>

      {/* FILE INPUT */}

      <input
        type="file"
        onChange={(e: any) => setFile(e.target.files[0])}
      />

      {/* UPLOAD BUTTON */}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Products
      </button>

    </div>

  );

};

export default BulkUpload;