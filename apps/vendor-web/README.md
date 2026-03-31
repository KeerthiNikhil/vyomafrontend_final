import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      <DialogContent className="max-w-md p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Welcome to Vyoma Vendor 🚀
        </h2>

        <div className="space-y-4">
          <Button
            className="w-full bg-blue-900 text-white"
            onClick={() => navigate("/vendor/verify")}
          >
            Login as Existing Vendor
          </Button>

          <div className="text-center text-gray-500">OR</div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/vendor/create-shop")}
          >
            Create New Shop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorEntryModal;