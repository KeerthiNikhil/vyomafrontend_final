import { useEffect, useState } from "react";
import { fetchVendors } from "@/services/admin.service";

const Vendors = () => {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const data = await fetchVendors();
      setVendors(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading vendors...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vendors</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Business</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Products</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Rating</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id} className="border-t">
                <td className="p-3">{vendor.businessName}</td>
                <td className="p-3">{vendor.ownerName}</td>
                <td className="p-3">{vendor.email}</td>
                <td className="p-3">{vendor.phone}</td>
                <td className="p-3">{vendor.products}</td>
                <td className="p-3">₹{vendor.revenue}</td>
                <td className="p-3">{vendor.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;