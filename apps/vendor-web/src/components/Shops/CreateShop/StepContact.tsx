import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepContact: React.FC<Props> = ({ formData, setFormData, setStep }) => {
  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

   // ✅ AUTO FETCH LOCATION
 useEffect(() => {
  try {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev: any) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      () => {}
    );
  } catch (err) {
    console.log("Geo failed safely");
  }
}, []);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.phone) newErrors.phone = "Phone required";
    if (!formData.address) newErrors.address = "Address required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT BLUE PANEL */}
      <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-16 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">
          Help Customers Find You 📍
        </h1>
        <p className="text-lg opacity-90">
          Add accurate contact and location details.
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center p-10 bg-muted/30">

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle>Step 2 of 4 — Contact Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              <Field
                label="Phone"
                value={formData.phone}
                error={errors.phone}
                onChange={(v) => handleChange("phone", v)}
              />

              <Field
                label="Address"
                value={formData.address}
                error={errors.address}
                onChange={(v) => handleChange("address", v)}
              />

              <Field
                label="Area"
                value={formData.area}
                onChange={(v) => handleChange("area", v)}
              />


              {/* Show detected location */}
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Latitude"
                  value={formData.latitude}
                  onChange={(v) => handleChange("latitude", v)}
                />
                <Field
                  label="Longitude"
                  value={formData.longitude}
                  onChange={(v) => handleChange("longitude", v)}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  ← Back
                </Button>

                <Button
                  onClick={() => {
                    if (validate()) setStep(3);
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

const Field = ({ label, value, onChange, error }: any) => (
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

export default StepContact;