import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { X, Trash2 } from "lucide-react";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState("Clothing");

  const [subCategories, setSubCategories] = useState([
    "Men",
    "Women",
    "Kids",
  ]);

  const [newSubCategory, setNewSubCategory] = useState("");

  const handleAddSubCategory = () => {
    if (!newSubCategory.trim()) return;
    setSubCategories([...subCategories, newSubCategory]);
    setNewSubCategory("");
  };

  const handleRemoveSubCategory = (index: number) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    console.log("Updated:", categoryName, subCategories);
  };

  const handleDeleteCategory = () => {
    console.log("Deleted:", categoryName);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Edit Category</h1>
        <p className="text-gray-500 mt-1">
          Update category name and manage subcategories
        </p>
      </div>

      {/* CATEGORY NAME */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Category Name</h2>

        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter Category Name"
        />
      </div>

      {/* SUBCATEGORY SECTION */}
      <div className="bg-white shadow rounded-xl p-6 space-y-6">
        <h2 className="font-semibold text-lg">Sub Categories</h2>

        <div className="flex gap-3">
          <Input
            placeholder="Add new subcategory"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
          />

          <Button
            onClick={handleAddSubCategory}
            className="bg-blue-900 hover:bg-blue-800 text-sm px-5"
          >
            Add
          </Button>
        </div>

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
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between">

        <Button
          variant="outline"
          onClick={handleDeleteCategory}
          className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete Category
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