import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

  // ✅ SUBMIT (🔥 FIXED)
  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      alert("Enter category name");
      return;
    }

    if (subCategories.length === 0) {
      alert("Add at least one subcategory");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/categories",
        {
          name: categoryName,
          subCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Category created ✅");

      setCategoryName("");
      setSubCategories([]);
    } catch (err: any) {
  console.log(err.response?.data); // 🔥 VERY IMPORTANT
  alert(err.response?.data?.message || "Failed ❌");
}
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

        <Input
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
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