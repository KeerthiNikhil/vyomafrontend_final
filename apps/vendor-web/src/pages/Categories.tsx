import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: number;
  name: string;
  active: boolean;
  productCount: number;
  image: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Groceries",
      active: true,
      productCount: 42,
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081986.png",
    },
    {
      id: 2,
      name: "Beverages",
      active: true,
      productCount: 18,
      image: "https://cdn-icons-png.flaticon.com/512/2935/2935393.png",
    },
    {
      id: 3,
      name: "Snacks",
      active: false,
      productCount: 9,
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (!newCategory.trim()) return;

    setCategories([
      ...categories,
      {
        id: Date.now(),
        name: newCategory,
        active: true,
        productCount: 0,
        image: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
      },
    ]);

    setNewCategory("");
    setOpen(false);
  };

  const toggleStatus = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, active: !cat.active } : cat
      )
    );
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products beautifully
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Category
        </Button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {categories.map((cat) => (
          <Card
            key={cat.id}
            className="rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <CardContent className="p-6 space-y-4">

              {/* Animated Image */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex justify-center"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>

              {/* Name */}
              <div className="text-center">
                <h3 className="font-semibold text-lg">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {cat.productCount} products
                </p>
              </div>

              {/* Status */}
              <div className="flex justify-center">
                <Badge
                  className={
                    cat.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {cat.active ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t">

                <Button
                  size="sm"
                  variant={cat.active ? "outline" : "default"}
                  onClick={() => toggleStatus(cat.id)}
                >
                  {cat.active ? "Disable" : "Enable"}
                </Button>

                <div className="flex gap-3">
                  <Pencil
                    size={18}
                    className="cursor-pointer text-blue-500 hover:scale-110 transition"
                  />
                  <Trash2
                    size={18}
                    className="cursor-pointer text-red-500 hover:scale-110 transition"
                    onClick={() => deleteCategory(cat.id)}
                  />
                </div>

              </div>

            </CardContent>
          </Card>
        ))}

      </div>

      {/* Add Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <Button className="w-full" onClick={addCategory}>
              Save Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Categories;