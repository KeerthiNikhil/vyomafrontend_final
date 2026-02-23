import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
const AllProducts = () => {
  const { products, setProducts } = useProducts();

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const toggleStatus = (id: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    setProducts(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        category: "Groceries",
        active: true,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
      },
    ]);

    setNewProduct({ name: "", price: "", stock: "" });
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-muted-foreground">
            Manage your store products
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {products.map(product => (
          <Card
            key={product.id}
            className="rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-4 space-y-4">

              <div className="h-40 overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>

              <div>
                <span className="font-bold text-lg">₹{product.price}</span>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Stock</span>
                    <span>{product.stock}</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        product.stock > 30
                          ? "bg-green-500"
                          : product.stock > 10
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(product.stock, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Badge
                  className={
                    product.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {product.active ? "Active" : "Disabled"}
                </Badge>

                <div className="flex gap-3">
                  <Pencil
                    size={18}
                    className="cursor-pointer text-blue-500 hover:scale-110 transition"
                  />
                  <Trash2
                    size={18}
                    className="cursor-pointer text-red-500 hover:scale-110 transition"
                    onClick={() => deleteProduct(product.id)}
                  />
                </div>
              </div>

              <Button
                size="sm"
                variant={product.active ? "outline" : "default"}
                onClick={() => toggleStatus(product.id)}
              >
                {product.active ? "Disable" : "Enable"}
              </Button>

            </CardContent>
          </Card>
        ))}

      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Input
              placeholder="Product name"
              value={newProduct.name}
              onChange={e =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={e =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={e =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
            />

            <Button className="w-full" onClick={addProduct}>
              Save Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AllProducts;