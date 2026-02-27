import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const handleAddSubCategory = () => {
    if (!subCategoryInput.trim()) return;

    setSubCategories([...subCategories, subCategoryInput]);
    setSubCategoryInput("");
  };

  const handleRemoveSubCategory = (index: number) => {
    const updated = subCategories.filter((_, i) => i !== index);
    setSubCategories(updated);
  };

  const handleSubmit = () => {
    console.log({
      categoryName,
      categoryType,
      selectedCategory,
      subCategories,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Add Category</h1>
        <p className="text-gray-500 mt-1">
          Create new product categories and subcategories
        </p>
      </div>

      {/* CATEGORY SECTION */}
      <div className="bg-white shadow rounded-xl p-6 space-y-6">

        <h2 className="font-semibold text-lg">Category Details</h2>

        <div className="space-y-4">
          <Input
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <Input
            placeholder="Category Type (Example: Grocery, Electronics)"
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
          />
        </div>
      </div>

      {/* SUB CATEGORY SECTION */}
      <div className="bg-white shadow rounded-xl p-6 space-y-6">

        <h2 className="font-semibold text-lg">Sub Categories</h2>

        {/* Select Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          <option value="">Select Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>

        {/* Add Subcategory Row */}
        <div className="flex gap-3">
          <Input
            placeholder="Enter Subcategory Name"
            value={subCategoryInput}
            onChange={(e) => setSubCategoryInput(e.target.value)}
          />

          <Button
            onClick={handleAddSubCategory}
            className="bg-blue-900 hover:bg-blue-800 text-sm px-5"
          >
            Add
          </Button>
        </div>

        {/* Display Subcategories */}
        {subCategories.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {subCategories.map((sub, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm"
              >
                {sub}
                <button
                  onClick={() => handleRemoveSubCategory(index)}
                  className="hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUBMIT */}
      <div>
        <Button
          onClick={handleSubmit}
          className="bg-blue-900 hover:bg-blue-800 px-6"
        >
          Submit Category
        </Button>
      </div>

    </div>
  );
};

export default AddCategory;