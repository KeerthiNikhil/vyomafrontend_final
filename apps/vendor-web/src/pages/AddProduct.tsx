import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

/* ================= SUBCATEGORY MAPPING ================= */

const subcategoryOptions: Record<string, string[]> = {
  food: ["Snacks", "Beverages", "Dairy", "Bakery"],
  clothing: ["Men Wear", "Women Wear", "Kids Wear", "Winter Wear"],
  electronics: ["Mobiles", "Laptops", "Accessories", "Home Appliances"],
  pharmacy: ["Tablets", "Syrups", "Medical Equipment", "Supplements"],
  beauty: ["Skincare", "Haircare", "Makeup", "Fragrance"],
};

const AddProduct = () => {
  /* ================= BASIC STATES ================= */

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  /* ================= DISCOUNT STATES ================= */

  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  /* ================= DYNAMIC STATES ================= */

  const [expiryDate, setExpiryDate] = useState("");
  const [weight, setWeight] = useState("");
  const [vegType, setVegType] = useState("");

  const [size, setSize] = useState("");
  const [fabric, setFabric] = useState("");
  const [gender, setGender] = useState("");

  const [brand, setBrand] = useState("");
  const [warranty, setWarranty] = useState("");
  const [modelNumber, setModelNumber] = useState("");

  const [prescription, setPrescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const [volume, setVolume] = useState("");
  const [skinType, setSkinType] = useState("");

  /* ================= RESET WHEN CATEGORY CHANGES ================= */

  useEffect(() => {
    setSubcategory("");
    setExpiryDate("");
    setWeight("");
    setVegType("");
    setSize("");
    setFabric("");
    setGender("");
    setBrand("");
    setWarranty("");
    setModelNumber("");
    setPrescription("");
    setManufacturer("");
    setVolume("");
    setSkinType("");
  }, [category]);

  /* ================= AUTO DISCOUNT CALCULATION ================= */

  useEffect(() => {
    const basePrice = Number(price);
    const discount = Number(discountValue);

    if (!basePrice) {
      setFinalPrice(0);
      return;
    }

    if (discountType === "percentage") {
      setFinalPrice(basePrice - (basePrice * discount) / 100);
    } else if (discountType === "flat") {
      setFinalPrice(basePrice - discount);
    } else {
      setFinalPrice(basePrice);
    }
  }, [price, discountType, discountValue]);

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {
    if (!name || !category || !subcategory || !price || !stock) {
      toast.error("Please fill all required basic fields");
      return;
    }

    toast.success("Product Added Successfully 🚀");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">

      <div>
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="text-gray-500">
          Smart dynamic product creation system
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6 space-y-6">

        {/* BASIC DETAILS */}
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Select Category</option>
          <option value="food">Food & Beverages</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="beauty">Beauty & Personal Care</option>
        </select>

        {/* SUBCATEGORY */}
        {category && (
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Subcategory</option>
            {subcategoryOptions[category]?.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <Textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* DISCOUNT SECTION */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Discount Type</option>
            <option value="percentage">Percentage (%)</option>
            <option value="flat">Flat Amount (₹)</option>
          </select>

          <Input
            type="number"
            placeholder="Discount Value"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
        </div>

        {/* FINAL PRICE */}
        {price && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Original Price: ₹{price}</p>
            {discountType && discountValue && (
              <p className="text-sm text-red-500">
                Discount: ₹
                {discountType === "percentage"
                  ? (Number(price) * Number(discountValue)) / 100
                  : discountValue}
              </p>
            )}
            <h3 className="text-xl font-bold text-green-700">
              Final Price: ₹{finalPrice}
            </h3>
          </div>
        )}

        {/* CATEGORY BASED FIELDS (Example: Food only for demo) */}
        {category === "food" && (
          <>
            <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            <Input placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </>
        )}

        {/* SUBMIT */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="bg-blue-900 hover:bg-blue-800">
            Add Product
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;