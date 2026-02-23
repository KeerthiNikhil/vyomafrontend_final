import {
  ShieldCheck,
  Truck,
  Headphones,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: <Headphones className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600" />,
    title: "24x7 Support",
  },
  {
    icon: <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600" />,
    title: "Secure Payments",
  },
  {
    icon: <Truck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600" />,
    title: "Fast Delivery",
  },
  {
    icon: <BadgeCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600" />,
    title: "Best Quality",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="mt-4 sm:mt-6 mb-3 sm:mb-4">
      <div className="max-w-7xl mx-auto">

        {/* ⭐ Smaller padding on mobile */}
        <div className="bg-blue-100 rounded-xl px-3 sm:px-6 md:px-10 py-3 sm:py-5">

          {/* ⭐ 4 icons row */}
          <div className="grid grid-cols-4 gap-1 sm:gap-6 text-center">

            {features.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1">

                {/* Icon circle */}
                <div className="
                  w-7 h-7 sm:w-10 sm:h-10
                  rounded-full
                  bg-white
                  flex items-center justify-center
                ">
                  {item.icon}
                </div>

                {/* Text */}
                <p className="
                  text-[9px] sm:text-xs
                  font-medium
                  text-gray-800
                  leading-tight
                ">
                  {item.title}
                </p>

              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
