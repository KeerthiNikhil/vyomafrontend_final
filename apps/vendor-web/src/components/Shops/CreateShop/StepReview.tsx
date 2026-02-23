import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepReview: React.FC<Props> = ({
  formData,
  setFormData,
  setStep,
}) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/v1/shops",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Shop created successfully!");
      navigate("/vendor");
    } catch (error) {
      console.error(error);
      alert("Error creating shop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-16 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">
          Almost There 🚀
        </h1>
        <p className="text-lg opacity-90">
          Review your shop details before publishing.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-10 bg-muted/30">

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-5xl"
        >
          <Card className="shadow-2xl rounded-3xl border-0">

            <CardHeader>
              <div className="text-sm text-muted-foreground mb-2">
                Step 4 of 4
              </div>
              <CardTitle className="text-2xl font-semibold">
                ✅ Review & Submit
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">

              {/* GRID FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT COLUMN */}
                <div className="space-y-4">
                  <Field label="Owner Name" value={formData.ownerName} onChange={(v) => handleChange("ownerName", v)} />
                  <Field label="Business Type" value={formData.businessType} onChange={(v) => handleChange("businessType", v)} />
                  <Field label="Shop Name" value={formData.shopName} onChange={(v) => handleChange("shopName", v)} />
                  <Field label="Phone" value={formData.phone} onChange={(v) => handleChange("phone", v)} />
                  <Field label="Address" value={formData.address} onChange={(v) => handleChange("address", v)} />
                  <Field label="Area" value={formData.area} onChange={(v) => handleChange("area", v)} />
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">
                  <Field label="Latitude" value={formData.latitude} onChange={(v) => handleChange("latitude", v)} />
                  <Field label="Longitude" value={formData.longitude} onChange={(v) => handleChange("longitude", v)} />
                  <Field label="GST Number" value={formData.gstNumber} onChange={(v) => handleChange("gstNumber", v)} />
                  <Field label="Shop License" value={formData.shopLicense} onChange={(v) => handleChange("shopLicense", v)} />
                  <Field label="Udyam Number" value={formData.udyamNumber} onChange={(v) => handleChange("udyamNumber", v)} />
                  <Field label="FSSAI Number" value={formData.fssaiNumber} onChange={(v) => handleChange("fssaiNumber", v)} />
                  <Field label="Trade License" value={formData.tradeLicense} onChange={(v) => handleChange("tradeLicense", v)} />
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-10">
                <Button variant="outline" onClick={() => setStep(3)}>
                  ← Back
                </Button>

                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "🚀 Submit Shop"}
                </Button>
              </div>

            </CardContent>

          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default StepReview;


/* REUSABLE FIELD COMPONENT */

const Field = ({
  label,
  value,
  onChange,
  required = false,
  error
}: {
  label: string;
  value: any;
  onChange: (val: string) => void;
  required?: boolean;
  error?: string;
}) => (
  <div className="space-y-2">  {/* <-- THIS FIXES SPACING */}
    <Label className="text-sm font-medium">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </Label>

    <Input
  value={value || ""}
  onChange={(e) => onChange(e.target.value)}
  className={`
    focus:outline-none 
    focus:ring-0 
    focus-visible:ring-0 
    focus-visible:outline-none
    ${error ? "border-red-500 focus:border-red-500" : ""}
  `}
/>

    {error && (
      <p className="text-xs text-red-500">{error}</p>
    )}
  </div>
);