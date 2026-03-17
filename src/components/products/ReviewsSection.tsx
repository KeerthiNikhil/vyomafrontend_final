const ReviewsSection = () => {

  const reviews = [
    {
      name: "Anjali",
      rating: 5,
      comment: "Very good quality saree"
    },
    {
      name: "Megha",
      rating: 4,
      comment: "Looks exactly like photo"
    }
  ];

  return (
    <div className="mt-16">

      <h2 className="text-xl font-semibold mb-6">
        Customer Reviews
      </h2>

      {reviews.map((r, i) => (

        <div key={i} className="border-b py-4">

          <p className="font-medium">
            {r.name}
          </p>

          <p className="text-yellow-500">
            {"⭐".repeat(r.rating)}
          </p>

          <p className="text-sm text-gray-600">
            {r.comment}
          </p>

        </div>

      ))}

    </div>
  );
};

export default ReviewsSection;