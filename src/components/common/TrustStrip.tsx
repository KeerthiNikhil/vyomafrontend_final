import {
  Package,
  Star,
  CheckCircle,
  IndianRupee,
} from "lucide-react";

const items = [
  {
    icon: <Package className="w-5 h-5" />,
    text: "20,000+ Products",
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "450+ Trusted Brands",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    text: "100% Original",
  },
  {
    icon: <IndianRupee className="w-5 h-5" />,
    text: "Assured Best Prices",
  },
];

const TrustStrip = () => {
  return (
    <div className="max-w-7xl mx-auto mt-6 mb-6 px-4">
      <div className="bg-blue-100 rounded-full px-6 py-3 flex items-center justify-between flex-wrap gap-4">

        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-800 font-medium text-sm">
            <div className="text-gray-700">{item.icon}</div>
            <span>{item.text}</span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TrustStrip;