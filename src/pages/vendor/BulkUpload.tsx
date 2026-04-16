import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BulkUpload = () => {

  const token = localStorage.getItem("token");
  const [file, setFile] = useState<any>(null);

  const handleUpload = async () => {

    if (!file) {
      toast.error("Select Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      await axios.post(
        "http://localhost:8000/api/v1/products/bulk-upload",
        formData,
        {
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
          }
        }
      );

      toast.success("Products uploaded successfully");

    } catch {

      toast.error("Upload failed");

    }

  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Bulk Upload Products
      </h1>

      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={(e)=>setFile(e.target.files?.[0])}
      />

      <Button onClick={handleUpload}>
        Upload Excel
      </Button>

      <p className="text-sm text-gray-500">
        Upload an Excel file with columns:
        name, price, stock, category
      </p>

    </div>
  );

};

export default BulkUpload;