import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { X, Trash2 } from "lucide-react";

const categoryOptions = [
  "Grocery",
  "Electronics",
  "Clothing",
  "Personal Care",
  "Household",
];

// optional default subcategories
const defaultSubCategories: Record<string, string[]> = {
  Grocery: [
    "Fruits & Vegetables",
    "Dairy",
    "Bakery",
    "Beverages",
    "Snacks",
  ],
  Electronics: ["Mobiles", "Accessories"],
  Clothing: ["Men", "Women", "Kids"],
  "Personal Care": ["Soap", "Shampoo", "Cream"],
  Household: ["Detergent", "Cleaning"],
};

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState<string>("Clothing");
  const [subCategories, setSubCategories] = useState<string[]>([
    "Men",
    "Women",
    "Kids",
  ]);
  const [newSubCategory, setNewSubCategory] = useState<string>("");

  // ✅ CHANGE CATEGORY
  const handleCategoryChange = (value: string) => {
    setCategoryName(value);
    setSubCategories(defaultSubCategories[value] || []);
  };

  // ✅ ADD SUBCATEGORY
  const handleAddSubCategory = () => {
    const trimmed = newSubCategory.trim();
    if (!trimmed) return;

    if (subCategories.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      alert("Already exists");
      return;
    }

    setSubCategories((prev) => [...prev, trimmed]);
    setNewSubCategory("");
  };

  // ✅ REMOVE
  const handleRemoveSubCategory = (index: number) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ UPDATE
 const handleUpdate = () => {
  if (!categoryName.trim()) {
    alert("Category name required");
    return;
  }

  if (subCategories.length === 0) {
    alert("Add at least one subcategory");
    return;
  }

  console.log("Updated:", {
    categoryName,
    subCategories,
  });

  alert("Category updated successfully ✅");
};

  // ✅ DELETE
  const handleDeleteCategory = () => {
    if (!window.confirm("Delete this category?")) return;

    console.log("Deleted:", categoryName);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Edit Category</h1>
        <p className="text-gray-500 mt-1">
          Update category and subcategories
        </p>
      </div>

      {/* CATEGORY SELECT */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Category</h2>

        <select
          value={categoryName}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* SUBCATEGORY */}
      <div className="bg-white shadow rounded-xl p-6 space-y-6">
        <h2 className="font-semibold text-lg">Sub Categories</h2>

        <div className="flex gap-3">
          <Input
            placeholder="Add subcategory"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSubCategory();
            }}
          />

          <Button
            onClick={handleAddSubCategory}
            disabled={!newSubCategory.trim()}
            className="bg-blue-900 hover:bg-blue-800 px-5"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-3">
          {subCategories.map((sub, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm"
            >
              {sub}
              <button onClick={() => handleRemoveSubCategory(index)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleDeleteCategory}
          className="text-red-600 border-red-300"
        >
          <Trash2 size={16} />
          Delete
        </Button>

        <Button
          onClick={handleUpdate}
          className="bg-blue-900 hover:bg-blue-800 px-6"
        >
          Update
        </Button>
      </div>

    </div>
  );
};

export default EditCategory;