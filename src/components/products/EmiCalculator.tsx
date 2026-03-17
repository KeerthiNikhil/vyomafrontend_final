import { useState } from "react";
import { CreditCard } from "lucide-react";

interface Props {
  price: number;
}

const EmiCalculator = ({ price }: Props) => {

  const [showEmi, setShowEmi] = useState(false);

  const months = 12;
  const emi = Math.round(price / months);

  return (
    <div className="mt-2">

      {/* EMI BUTTON */}

      <button
        onClick={() => setShowEmi(!showEmi)}
        className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
      >
        <CreditCard size={16} />
        EMI Options
      </button>

      {/* EMI TEXT */}

      {showEmi && (
        <p className="text-sm text-gray-600 mt-2">
          ₹{emi}/month for {months} months EMI
        </p>
      )}

    </div>
  );
};

export default EmiCalculator;