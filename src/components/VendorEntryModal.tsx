import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const VendorEntryModal = ({ open, onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-2xl bg-white shadow-xl">

        <DialogTitle className="text-xl font-semibold text-center mb-2">
          Welcome to Vyoma Vendor 🚀
        </DialogTitle>

        <DialogDescription className="text-sm text-gray-600 text-center mb-6">
          Continue to vendor dashboard or create your shop.
        </DialogDescription>

        <div className="space-y-4">

          {/* ✅ EXISTING VENDOR */}
          <Button
            className="w-full bg-blue-900 hover:bg-blue-800 text-white"
            onClick={() => {
              onClose();
              window.location.href = "http://localhost:5174/vendor/verify"; // ✅ OTP verify instead of login
            }}
          >
            Continue as Vendor
          </Button>

          <div className="text-center text-gray-400 text-sm">OR</div>

          {/* ✅ NEW VENDOR */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              onClose();
              window.location.href = "http://localhost:5174/vendor/verify"; // ✅ same flow (verify first)
            }}
          >
            Create New Shop
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorEntryModal;