import React from "react";
import { useCart } from "@/context/CartContext";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  shop?: string;
  weight?: string;
  originalPrice?: number;
}

const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  image,
  shop,
  weight,
  originalPrice,
}) => {

  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full flex flex-col">

      {/* Product Image */}
      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-3 font-semibold">{name}</h3>

      {/* Weight */}
      {weight && (
        <p className="text-sm text-gray-500">{weight}</p>
      )}

      {/* Price */}
      <div className="mt-2">

        {originalPrice && (
          <p className="text-sm text-gray-400 line-through">
            ₹ {originalPrice}
          </p>
        )}

        <p className="text-blue-600 font-bold text-lg">
          ₹ {price}
        </p>

        {originalPrice && (
          <p className="text-green-600 text-sm font-medium">
            {Math.round(
              ((originalPrice - price) / originalPrice) * 100
            )}% OFF
          </p>
        )}

      </div>

      {/* Add to Cart Button */}
      <div className="mt-3">
        <button
          onClick={() =>
            addToCart({
              id,
              name,
              price,
              image,
              shop,
              quantity: 1,
            })
          }
          className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
};

export default ProductCard;