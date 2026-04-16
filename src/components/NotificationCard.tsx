import { Bell } from "lucide-react";
import { createPortal } from "react-dom";

const NotificationCard = ({
  title,
  message,
  onClose,
  onAction,
  type,
}: any) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">

      <div className="p-4">
        <div className="relative w-[420px]">

          <div
            className="bg-white shadow-xl text-center pt-24 pb-12 px-8 relative"
            style={{
              clipPath: `path("M0,90
                C0,30 100,30 150,80
                C200,130 220,0 250,0
                C280,0 300,130 350,80
                C400,30 500,30 500,90
                L500,260
                C500,290 470,310 440,310
                L60,310
                C30,310 0,290 0,260
                Z")`,
            }}
          >

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 text-lg hover:text-black"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-[26px] font-semibold text-gray-800">
              {title}
            </h2>

            {/* MESSAGE */}
            <p className="text-[13px] text-gray-400 mt-4 px-6">
              {message}
            </p>

            {/* BUTTON */}
           <button
  onClick={() => {
    if (type === "success") {
      onAction && onAction(); // 👉 redirect ONLY here
    } else {
      onClose(); // 👉 just close popup
    }
  }}
  className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-xl shadow-md"
>
  {type === "success" ? "Continue →" : "OK"}
</button>

          </div>

          {/* ICON */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#f3e7cd] w-32 h-32 rounded-full flex items-center justify-center shadow-md">
            <div className="relative bg-yellow-400 w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
              <Bell size={34} className="text-white rotate-[-18deg]" />

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                1
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotificationCard;