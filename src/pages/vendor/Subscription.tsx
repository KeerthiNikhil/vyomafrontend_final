const Subscription = () => {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      
      <h1 className="text-2xl font-bold mb-4">Vyoma Subscription</h1>

      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-lg font-semibold text-blue-900">
          ₹50 / month per shop
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Access all features and manage your shop seamlessly.
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>✔ Unlimited product listings</p>
        <p>✔ Order management</p>
        <p>✔ Delivery tracking</p>
        <p>✔ Analytics dashboard</p>
      </div>

      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Pay ₹50 Now
      </button>

    </div>
  );
};

export default Subscription;