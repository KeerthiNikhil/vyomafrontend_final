import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Props = {
  product: Product;
};

const WishlistButton = ({ product }: Props) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const liked = isInWishlist(product.id);

  const handleToggle = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggle();
      }}
      className="
        absolute top-3 right-3
        w-9 h-9
        rounded-full
        bg-white
        shadow-md
        flex items-center justify-center
        hover:scale-105
        transition
      "
      aria-label="Add to wishlist"
    >
      <Heart
        size={18}
        className={
          liked
            ? "fill-red-500 text-red-500"
            : "text-gray-600"
        }
      />
    </button>
  );
};

export default WishlistButton;
