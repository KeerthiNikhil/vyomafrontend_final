type Props = {
  stock: number;
};

const StockIndicator = ({ stock }: Props) => {
  if (stock === 0)
    return <p className="text-red-600 font-medium">Out of Stock</p>;

  if (stock <= 5)
    return (
      <p className="text-orange-500 font-medium">
        Only {stock} left in stock
      </p>
    );

  return (
    <p className="text-green-600 font-medium">
      In Stock
    </p>
  );
};

export default StockIndicator;