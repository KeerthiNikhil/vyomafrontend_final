import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const VendorWarningModal = ({ open, onClose, onConfirm }: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl p-6 bg-white shadow-xl border border-red-300">

        {/* ✅ REQUIRED FOR RADIX */}
        <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
          ⚠️ Become a Vendor – Important Notice
        </DialogTitle>

        <DialogDescription className="text-sm text-gray-600 mb-3">
          Please read all terms before continuing.
        </DialogDescription>

        <div className="text-sm text-gray-800 space-y-2">
          <p>By proceeding, you are registering as a Vendor on Vyoma.</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>This action is <b>PERMANENT</b> and cannot be reversed.</li>
            <li>You cannot switch back to a normal user account.</li>
            <li>Monthly subscription fee of <b>₹50</b> is required.</li>
            <li>You can create and manage <b>multiple shops</b>.</li>
            <li>You are responsible for all shop activities.</li>
          </ul>

          <p className="text-red-600 font-semibold">
            ⚠️ Vyoma is not responsible for misuse of vendor privileges.
          </p>
        </div>

        {/* Checkbox */}
        <div className="flex items-center mt-4 gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="agree" className="text-sm">
            I agree to all terms and conditions
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            disabled={!checked}
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Agree & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorWarningModal;