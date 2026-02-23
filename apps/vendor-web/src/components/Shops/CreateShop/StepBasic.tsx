import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepBasic: React.FC<Props> = ({ formData, setFormData, setStep }) => {
  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.ownerName) newErrors.ownerName = "Owner name required";
    if (!formData.businessType) newErrors.businessType = "Business type required";
    if (!formData.shopName) newErrors.shopName = "Shop name required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-16 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Build Your Business 🚀</h1>
        <p className="text-lg opacity-90">Start your digital journey.</p>
      </div>

      <div className="flex items-center justify-center p-10 bg-muted/30">

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-xl rounded-2xl overflow-visible">
            <CardHeader>
              <CardTitle>Step 1 of 4 — Basic Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* Owner Name */}
              <Field
                label="Owner Name"
                value={formData.ownerName}
                error={errors.ownerName}
                onChange={(v) => handleChange("ownerName", v)}
              />

              {/* Business Type */}
              <div className="space-y-2">
  <Label>Business Type *</Label>
  <Select
    value={formData.businessType}
    onValueChange={(v) => handleChange("businessType", v)}
  >
    <SelectTrigger className={errors.businessType ? "border-red-500" : ""}>
      <SelectValue placeholder="Select type" />
    </SelectTrigger>

    <SelectContent className="z-[999]">
      <SelectItem value="Grocery">Grocery</SelectItem>
      <SelectItem value="Bakery">Bakery</SelectItem>
      <SelectItem value="Restaurant">Restaurant</SelectItem>
      <SelectItem value="Clothing">Clothing</SelectItem>
    </SelectContent>
  </Select>

  {errors.businessType && (
    <p className="text-xs text-red-500">{errors.businessType}</p>
  )}
</div>

              {/* Shop Name */}
              <Field
                label="Shop Name"
                value={formData.shopName}
                error={errors.shopName}
                onChange={(v) => handleChange("shopName", v)}
              />

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (validate()) setStep(2);
                  }}
                >
                  Next →
                </Button>
              </div>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  error
}: any) => (
  <div className="space-y-2">
    <Label>{label}</Label>
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
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);
export default StepBasic;