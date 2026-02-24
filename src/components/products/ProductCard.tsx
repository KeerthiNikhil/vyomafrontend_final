
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
