import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart, Search, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import logo from "@/assets/images/logo.jpg.png"

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Cart quantity count (professional way)
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  return (
   <header className="sticky top-0 z-50 bg-white shadow-sm border-gray">
     <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* TOP ROW */}
        <div className="h-16 flex items-center justify-between">

        {/* LOGO */}
{/* LOGO */}
<Link to="/" className="flex items-center gap-0 leading-none">
  <img
    src={logo}
    alt="Vyoma"
    className="h-10 sm:h-13 w-auto object-contain"
  />
  <span className="text-xl sm:text-3xl font-extrabold text-blue-900 tracking-wide">
    VYOMA
  </span>
</Link>


          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex items-center w-[420px] relative">
            <Search className="absolute left-4 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search shops or products..."
              className="
                pl-11 pr-4 rounded-full
                bg-gray-100
                border border-transparent
                focus:ring-2 focus:ring-blue-200
                focus:outline-none
              "
            />
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* ❤️ Wishlist */}
            <Link to="/wishlist">
              <Button
  variant="ghost"
  className="
    p-2 rounded-full relative
    hover:bg-blue-50 transition
    focus:outline-none focus:ring-0
  "
>
                <Heart className="w-5 h-5 text-gray-700" />

                {wishlistCount > 0 && (
                  <span className="
                    absolute -top-1 -right-1
                    min-w-[18px] h-[18px]
                    px-1
                    bg-red-500 text-white
                    text-[10px] font-semibold
                    rounded-full
                    flex items-center justify-center
                  ">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* 👤 Login */}
            <Link to="/login">
              <Button
                variant="ghost"
                className="p-2 rounded-full hover:bg-blue-50 transition"
              >
                <User className="w-5 h-5 text-gray-700" />
              </Button>
            </Link>

            {/* 🛒 Cart */}
            <Link to="/cart">
              <Button
  variant="ghost"
  className="
    p-2 rounded-full relative
    hover:bg-blue-50 transition
    focus:outline-none focus:ring-0
  "
>
                <ShoppingCart className="w-5 h-5 text-gray-700" />

                {totalItems > 0 && (
                  <span className="
                    absolute -top-1 -right-1
                    min-w-[18px] h-[18px]
                    px-1
                    bg-blue-600 text-white
                    text-[10px] font-semibold
                    rounded-full
                    flex items-center justify-center
                  ">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

          </div>
        </div>

        {/* 📱 MOBILE SEARCH */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search shops or products..."
              className="
                pl-11 pr-4 rounded-full
                bg-gray-100
                border border-transparent
                focus:ring-2 focus:ring-blue-200
                focus:outline-none
              "
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
