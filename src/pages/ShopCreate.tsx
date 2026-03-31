if (data.success) {
  localStorage.setItem("vendorToken", data.token);
  navigate("/vendor/dashboard");
}