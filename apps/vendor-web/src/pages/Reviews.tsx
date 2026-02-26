import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ratingData = [
  { rating: "5★", count: 12 },
  { rating: "4★", count: 8 },
  { rating: "3★", count: 3 },
  { rating: "2★", count: 1 },
  { rating: "1★", count: 0 },
];

const Reviews = () => {
  const averageRating = 4.5;
  const totalReviews = 24;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Reviews & Ratings
        </h1>
        <p className="text-gray-500 text-sm">
          Customer feedback and satisfaction overview
        </p>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 text-sm">Average Rating</p>
            <h2 className="text-4xl font-bold text-yellow-500 mt-2">
              {averageRating}
            </h2>
            <p className="text-yellow-500 text-lg">★★★★★</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 text-sm">Total Reviews</p>
            <h2 className="text-4xl font-bold mt-2">
              {totalReviews}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 text-sm">Positive Feedback</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              83%
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Rating Distribution Graph */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">
            Rating Distribution
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#f59e0b"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3 font-medium">Customer 1</td>
              <td className="p-3">email@example.com</td>
              <td className="p-3">0000000000</td>
              <td className="p-3">Mangalore</td>
              <td className="p-3 text-yellow-500">★★★★☆</td>
              <td className="p-3">
                Excellent product quality and fast delivery.
              </td>
            </tr>

            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3 font-medium">Customer 2</td>
              <td className="p-3">user2@gmail.com</td>
              <td className="p-3">9999999999</td>
              <td className="p-3">Udupi</td>
              <td className="p-3 text-yellow-500">★★★★★</td>
              <td className="p-3">
                Very satisfied with packaging and service.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Reviews;