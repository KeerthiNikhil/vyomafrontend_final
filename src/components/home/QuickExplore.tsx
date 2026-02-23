import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickExplore = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 pt-0">
      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-2 pb-5 pt-0">
        Hey, what’s on your mind?
      </h2>

      {/* ICON CARDS */}
      <div className="flex gap-20 mb-6 px-30">
        {[
          { label: "Budget Friendly", emoji: "💰" },
          { label: "Family Friendly", emoji: "👨‍👩‍👧‍👦" },
          { label: "Pets & Farm", emoji: "🐶" },
          { label: "cafe", emoji:"̥"} 
        ].map((item) => (
          <div
            key={item.label}
            className="
              flex flex-col items-center justify-center
              w-28 h-28
              bg-white
              rounded-2xl
              shadow
              hover:shadow-md
              transition
              cursor-pointer
            "
          >
            <div className="text-2xl mb-2">
              {item.emoji}
            </div>
            <p className="text-sm font-medium text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* FAST DELIVERY CARD */}
      <div
        className="
          bg-[#1f3a3d]
          rounded-2xl
          p-5
          flex items-center justify-between
          text-white
          
        "
      >
        <div className="flex items-start gap-3">
          <Zap className="text-yellow-400 mt-1" />

          <div>
            <h3 className="font-semibold">
              Fast Delivery
            </h3>

            <p className="text-sm opacity-90">
              Get essentials delivered in just 30 min ⚡
            </p>

            <p className="text-xs opacity-75 mt-1">
              📍 Available in Mangalore & Surathkal
            </p>
          </div>
        </div>

        <Button
          className="
            bg-white
            text-black
            rounded-full
            px-5
            hover:bg-gray-100
          "
        >
          Order Now
        </Button>
      </div>
    </section>
  );
};

export default QuickExplore;
