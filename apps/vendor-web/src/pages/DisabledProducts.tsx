import { useProducts } from "@/context/ProductContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DisabledProducts = () => {
  const { products, setProducts } = useProducts();

  const disabled = products.filter(p => !p.active);

  const enableProduct = (id: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, active: true } : p
      )
    );
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">Disabled Products</h1>

      {disabled.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            No disabled products found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {disabled.map(product => (
            <Card key={product.id}>
              <CardContent className="p-4 space-y-3">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-lg"
                />

                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ₹{product.price}
                </p>

                <Button
                  size="sm"
                  onClick={() => enableProduct(product.id)}
                >
                  Enable Product
                </Button>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};

export default DisabledProducts;