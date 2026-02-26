import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Products = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Add / Edit Product
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your product details, pricing and specifications
        </p>
      </div>

      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-8 space-y-10">

          {/* ================= PRODUCT IMAGES ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Product Images
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input type="file" />
              <Input type="file" />
              <Input type="file" />
              <Input type="file" />
            </div>
          </section>

          {/* ================= BASIC INFO ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Input placeholder="Product Name" />
              <Input placeholder="Category" />
              <Input placeholder="Subcategory" />
              <Input placeholder="Available Unit (kg / qty / size)" />
            </div>
          </section>

          {/* ================= STOCK & PRICING ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Stock & Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Input placeholder="Stock Quantity" />
              <Input placeholder="GST %" />
              <Input placeholder="Price (₹)" />
              <Input placeholder="Discount (%)" />
            </div>
          </section>

          {/* ================= PRODUCT DETAILS ================= */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              Product Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <Textarea placeholder="Product Description" />
              <Textarea placeholder="Key Specifications" />
              <Textarea placeholder="Packaging Details" />
              <Textarea placeholder="Directions to Use" />
              <Textarea placeholder="Additional Information" />
              <Textarea placeholder="Warranty Information" />
              <Textarea placeholder="FAQs" />

            </div>
          </section>

          {/* ================= SAVE BUTTON ================= */}
          <div className="pt-4">
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 text-base rounded-lg shadow-md">
              Save Product
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Products;  