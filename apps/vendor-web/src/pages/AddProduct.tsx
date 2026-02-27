import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Grocery",
    subcategories: ["Rice", "Vegetables", "Fruits"],
  },
  {
    name: "Electronics",
    subcategories: ["Mobile", "Laptop", "Accessories"],
  },
];

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [unit, setUnit] = useState("");

  const selectedCategory = categories.find((c) => c.name === category);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Add Product</h1>

      {/* Images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((img) => (
          <Input key={img} type="file" />
        ))}
      </div>

      <Input placeholder="Product Name" />

      {/* Category */}
      <div className="grid grid-cols-2 gap-4">
        <select
          className="border rounded-lg p-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("");
          }}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>

        <select
          className="border rounded-lg p-2"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          {selectedCategory?.subcategories.map((sub) => (
            <option key={sub}>{sub}</option>
          ))}
        </select>
      </div>

      {/* Stock & Pricing */}
      <div className="grid grid-cols-3 gap-4">
        <Input placeholder="Stock" />
        <Input
          placeholder="Available Unit (kg/qty/size)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <Input placeholder="GST %" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Price" />
        <Input placeholder="Discount %" />
      </div>

      {/* Conditional Fields */}
      {category === "Electronics" && (
        <>
          <Textarea placeholder="Warranty Details" />
          <Textarea placeholder="Key Specifications" />
        </>
      )}

      {category === "Grocery" && (
        <>
          <Textarea placeholder="Packaging Details" />
          <Textarea placeholder="Direction to Use" />
        </>
      )}

      <Textarea placeholder="Additional Info" />

      <Button className="bg-blue-900 hover:bg-blue-800">
        Save Product
      </Button>
    </div>
  );
};

export default AddProduct;