import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const getAdminStats = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};