interface Shop {
  _id: string;
  ownerName: string;
  businessType: string;
  address: string;
  shopImage?: string;
}

interface Props {
  shops: Shop[];
  loading: boolean;
}

const TopShops = ({ shops, loading }: Props) => {
  if (loading) return <p>Loading shops...</p>;
  if (!shops.length) return <p>No shops available yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Top Shops</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div
            key={shop._id}
            className="p-4 border rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* ✅ IMAGE */}
            {shop.shopImage && (
              <img
                src={`http://localhost:8000${shop.shopImage}`}
                alt={shop.ownerName}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}

            <h3 className="text-lg font-semibold">
              {shop.ownerName}
            </h3>

            <p className="text-sm text-gray-600">
              {shop.businessType}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {shop.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopShops;