<<<<<<< HEAD
import { Star } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating?: number;
    reviews?: number;
    originalPrice?: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
if (!product) return null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 relative group">

      {/* Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
        NEW
      </span>

      {/* Image */}
      <div className="overflow-hidden rounded-lg">
        <img src={product?.image || "/placeholder.png"} 

          alt={product?.name || "Product"}
          className="w-full h-48 object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="mt-3 font-semibold text-gray-800">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={
              index < (product.rating || 4)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">
          ({product.reviews || 120})
        </span>
=======
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Clock } from "lucide-react";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
  weight?: string;
};

const ProductCard = ({
  id,
  name,
  price,
  image,
  weight,
}: Props) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const liked = isInWishlist(id);

  return (
    <div
      className="
        w-[180px]
        bg-white
        rounded-xl
        border border-gray-200
        hover:shadow-lg
        transition-all duration-300
        cursor-pointer
        relative
        p-3
        mb-0
      "
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* RIGHT SIDE ACTION BUTTONS */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">

        {/* ❤️ Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (liked) {
              removeFromWishlist(id);
            } else {
              addToWishlist({ id, name, price, image });
            }
          }}
          className="
            bg-white
            border border-gray-200
            rounded-full
            p-1.5
            shadow-sm
            hover:bg-gray-50
            transition
          "
        >
          <Heart
            size={14}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }
          />
        </button>

        {/* 🔗 Share */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const url = window.location.origin + `/product/${id}`;

            if (navigator.share) {
              navigator.share({
                title: name,
                text: name,
                url,
              });
            } else {
              navigator.clipboard.writeText(url);
              alert("Link copied!");
            }
          }}
          className="
            bg-white
            border border-gray-200
            rounded-full
            p-1.5
            shadow-sm
            hover:bg-gray-50
            transition
          "
        >
          <Share2 size={14} className="text-gray-600" />
        </button>
      </div>

      {/* IMAGE */}
      <div className="h-[130px] overflow-hidden flex items-center justify-center mb-3 rounded-lg">
        <img
          src={image}
          alt={name}
          className="
            h-full object-contain
            transition-transform duration-300
            hover:scale-105
          "
        />
      </div>

      {/* DELIVERY TIME */}
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <Clock size={12} />
        <span>8 MINS</span>
      </div>

      {/* PRODUCT NAME */}
      <h3 className="text-sm font-medium leading-snug mb-1 line-clamp-2">
        {name}
      </h3>

      {/* WEIGHT */}
      {weight && (
        <p className="text-xs text-gray-500 mb-2">
          {weight}
        </p>
      )}

      {/* PRICE + ADD */}
      <div className="flex items-center justify-between mt-3">
        <p className="font-semibold text-sm">
          ₹{price}
        </p>

        <Button
          size="sm"
          className="
            bg-white
            text-blue-600
            border border-blue-600
            hover:bg-blue-600
            hover:text-white
            px-4
            text-xs
            font-semibold
            rounded-md
            transition
          "
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ id, name, price, image });
          }}
        >
          ADD
        </Button>
>>>>>>> origin/main
      </div>

      {/* Price */}
      <div className="mt-2">
  {product.originalPrice && (
    <p className="text-sm text-gray-400 line-through">
      ₹ {product.originalPrice}
    </p>
  )}

  <p className="text-blue-600 font-bold text-lg">
    ₹ {product.price}
  </p>

  {product.originalPrice && (
    <p className="text-green-600 text-sm font-medium">
      {Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )}
      % OFF
    </p>
  )}
</div>


      {/* Button */}
      <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
