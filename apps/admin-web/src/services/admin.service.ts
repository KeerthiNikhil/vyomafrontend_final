import API from "./api";

// ✅ Dashboard stats
export const getAdminStats = async () => {
  const res = await API.get("/admin/dashboard");
  return res.data.data;
};

// ✅ Vendors list
export const fetchVendors = async () => {
  const res = await API.get("/admin/vendors");
  return res.data.data;
};