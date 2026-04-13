import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";

const EditCategory = () => {
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [newSubCategory, setNewSubCategory] = useState("");

  // ✅ FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/categories/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCategories(res.data.data);

        // auto select first category
        if (res.data.data.length > 0) {
          const first = res.data.data[0];
          setCategoryId(first._id);
          setCategoryName(first.name);
          setSubCategories(first.subCategories || []);
        }

      } catch {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // ✅ CHANGE CATEGORY
  const handleCategoryChange = (id: string) => {
    const selected = categories.find((c) => c._id === id);
    if (!selected) return;

    setCategoryId(selected._id);
    setCategoryName(selected.name);
    setSubCategories(selected.subCategories || []);
  };

  // ✅ ADD SUBCATEGORY
  const handleAddSubCategory = () => {
    const trimmed = newSubCategory.trim();
    if (!trimmed) return;

    if (subCategories.includes(trimmed)) {
      toast.error("Already exists");
      return;
    }

    setSubCategories([...subCategories, trimmed]);
    setNewSubCategory("");
  };

  // ✅ REMOVE
  const handleRemoveSubCategory = (index: number) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ UPDATE CATEGORY
  const handleUpdate = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name required");
      return;
    }

    if (subCategories.length === 0) {
      toast.error("Add at least one subcategory");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/v1/categories/${categoryId}`,
        {
          name: categoryName,
          subCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category updated ✅");

    } catch {
      toast.error("Update failed ❌");
    }
  };

  // ✅ DELETE CATEGORY
  const handleDeleteCategory = async () => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/v1/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category deleted 🗑️");

      // refresh list
      setCategories((prev) => prev.filter((c) => c._id !== categoryId));

    } catch {
      toast.error("Delete failed ❌");
    }
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
        <h2 className="font-semibold text-lg">Select Category</h2>

        <select
          value={categoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full border rounded-md p-2"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* EDIT NAME */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">Category Name</h2>

        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
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