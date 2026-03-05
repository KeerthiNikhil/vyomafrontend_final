import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const AddProduct = () => {

  const token = localStorage.getItem("token");

  /* SHOP */

  const [shops, setShops] = useState<any[]>([]);
  const [shopId, setShopId] = useState("");

  /* PRODUCT */

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  /* IMAGES */

  const [images, setImages] = useState<File[]>([]);

  /* CATEGORY FIELDS */

  const [expiryDate, setExpiryDate] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [warranty, setWarranty] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [skinType, setSkinType] = useState("");
  const [author, setAuthor] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [material, setMaterial] = useState("");

  /* ================= GET SHOPS ================= */

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/shops/my-shops",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setShops(res.data.data);
      } catch (error) {
        toast.error("Failed to load shops");
      }
    };

    fetchShops();
  }, []);

  /* ================= HANDLE IMAGE ================= */

  const handleImages = (e: any) => {

    const files = Array.from(e.target.files);

    if (files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    setImages(files);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {

    if (!shopId || !name || !category || !price || !stock) {
      toast.error("Fill required fields");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("shop", shopId);
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("discountType", discountType);
      formData.append("discountValue", discountValue);

      /* images */

      images.forEach((img) => {
        formData.append("images", img);
      });

      /* dynamic fields */

      formData.append("expiryDate", expiryDate);
      formData.append("weight", weight);
      formData.append("size", size);
      formData.append("brand", brand);
      formData.append("modelNumber", modelNumber);
      formData.append("warranty", warranty);
      formData.append("manufacturer", manufacturer);
      formData.append("skinType", skinType);
      formData.append("author", author);
      formData.append("ageGroup", ageGroup);
      formData.append("material", material);

      await axios.post(
        "http://localhost:8000/api/v1/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product Added Successfully 🚀");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Product creation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Add Product
      </h1>

      <div className="bg-white shadow-md rounded-xl p-8 space-y-5 border">

        {/* SHOP SELECT */}

        <select
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Select Shop</option>

          {shops.map((shop) => (
            <option key={shop._id} value={shop._id}>
              {shop.shopName}
            </option>
          ))}

        </select>

        {/* PRODUCT NAME */}

        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* CATEGORY */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Select Category</option>

          <option value="food">Food & Beverages</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="beauty">Beauty & Personal Care</option>
          <option value="grocery">Grocery</option>
          <option value="home">Home Appliances</option>
          <option value="sports">Sports & Fitness</option>
          <option value="books">Books</option>
          <option value="toys">Toys</option>
        </select>

        {/* PRICE + STOCK */}

        <div className="grid md:grid-cols-2 gap-4">

          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

        </div>

        {/* DESCRIPTION */}

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* DISCOUNT */}

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Discount Type</option>
            <option value="percentage">Percentage</option>
            <option value="flat">Flat</option>
          </select>

          <Input
            type="number"
            placeholder="Discount Value"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />

        </div>

        {/* IMAGES */}

        <div>

          <p className="text-sm font-medium text-gray-600">
            Upload Product Images (Max 4)
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="w-full border rounded-md px-3 py-2"
          />

        </div>

        {/* CATEGORY FIELDS */}

        {category === "food" && (
          <>
            <Input type="date" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} />
            <Input placeholder="Weight" value={weight} onChange={(e)=>setWeight(e.target.value)} />
          </>
        )}

        {category === "clothing" && (
          <>
            <Input placeholder="Size" value={size} onChange={(e)=>setSize(e.target.value)} />
            <Input placeholder="Material" value={material} onChange={(e)=>setMaterial(e.target.value)} />
          </>
        )}

        {category === "electronics" && (
          <>
            <Input placeholder="Brand" value={brand} onChange={(e)=>setBrand(e.target.value)} />
            <Input placeholder="Model Number" value={modelNumber} onChange={(e)=>setModelNumber(e.target.value)} />
          </>
        )}

        {category === "books" && (
          <Input placeholder="Author" value={author} onChange={(e)=>setAuthor(e.target.value)} />
        )}

        {category === "toys" && (
          <Input placeholder="Age Group" value={ageGroup} onChange={(e)=>setAgeGroup(e.target.value)} />
        )}

        <div className="flex justify-end pt-4">

          <Button
            onClick={handleSubmit}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2"
          >
            Add Product
          </Button>

        </div>

      </div>
    </div>
  );
};

export default AddProduct;