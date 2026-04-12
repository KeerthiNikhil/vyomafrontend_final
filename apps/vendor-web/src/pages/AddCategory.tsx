import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const categoryOptions = [
  "Grocery",
  "Electronics",
  "Clothing",
  "Personal Care",
  "Household Items",
];

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);

  // ✅ ADD SUBCATEGORY
  const handleAddSubCategory = () => {
    const trimmed = subCategoryInput.trim();
    if (!trimmed) return;

    if (subCategories.includes(trimmed)) {
      alert("Already added");
      return;
    }

    setSubCategories([...subCategories, trimmed]);
    setSubCategoryInput("");
  };

  // ✅ REMOVE
  const handleRemoveSubCategory = (index: number) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ SUBMIT
  const handleSubmit = () => {
  if (!categoryName.trim()) {
    alert("Please select category");
    return;
  }

  if (subCategories.length === 0) {
    alert("Add at least one subcategory");
    return;
  }

  console.log({
    categoryName,
    subCategories,
  });

  alert("Category created successfully ✅");

  // reset form
  setCategoryName("");
  setSubCategories([]);
};

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Add Category</h1>
        <p className="text-gray-500 mt-1">
          Create product categories and subcategories
        </p>
      </div>

      {/* CATEGORY */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Category</h2>

        {/* Dropdown (10 options) */}
        <select
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Select Category</option>
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
            placeholder="Enter Subcategory Name"
            value={subCategoryInput}
            onChange={(e) => setSubCategoryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSubCategory();
            }}
          />

          <Button
            onClick={handleAddSubCategory}
            className="bg-blue-900 hover:bg-blue-800 px-5"
          >
            Add
          </Button>
        </div>

        {/* LIST */}
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

      {/* SUBMIT */}
      <Button
        onClick={handleSubmit}
        className="bg-blue-900 hover:bg-blue-800 px-6"
      >
        Submit Category
      </Button>

    </div>
  );
};

export default AddCategory;