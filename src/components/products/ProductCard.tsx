import React from "react";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
  weight?: string;
  originalPrice?: number;
}

const ProductCard: React.FC<Props> = ({
  name,
  price,
  image,
  weight,
  originalPrice,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-60">

      <img
        src={image}
        alt={name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h3 className="mt-3 font-semibold">{name}</h3>

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

      <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;