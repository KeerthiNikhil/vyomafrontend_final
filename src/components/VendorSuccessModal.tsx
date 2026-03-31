import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const VendorSuccessModal = ({ open, onClose }: any) => {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>

      <DialogContent className="max-w-md rounded-2xl p-6 bg-white shadow-xl border border-red-300">

        {/* ICON */}
        <div className="text-green-500 text-5xl mb-3 text-center">
          ✔
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Congratulations 🎉
        </h2>

        {/* MESSAGE */}
        <p className="text-sm text-gray-600 mt-2 text-center">
          You are now a vendor. Start adding your products 🚀
        </p>

        {/* BUTTON */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-6"
          >
            Go to Dashboard
          </Button>
        </div>

      </DialogContent>

    </Dialog>
  );
};

export default VendorSuccessModal;