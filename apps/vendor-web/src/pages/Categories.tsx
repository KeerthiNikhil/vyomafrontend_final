import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Categories = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6">
        Add / Edit Category
      </h1>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-6">
          <Input placeholder="Category" />
          <Input placeholder="Subcategory" />
          <Input type="file" placeholder="Image (icon)" />

          <Button className="w-full">Save</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;