import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Review {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
  active: boolean;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      customer: "Ananya",
      rating: 5,
      comment: "Excellent quality rice. Fast delivery!",
      product: "Basmati Rice",
      date: "20 Mar 2025",
      active: true,
    },
    {
      id: 2,
      customer: "Rahul",
      rating: 3,
      comment: "Delivery was late but product was good.",
      product: "Coca Cola",
      date: "18 Mar 2025",
      active: true,
    },
    {
      id: 3,
      customer: "Sneha",
      rating: 1,
      comment: "Packaging was damaged.",
      product: "Potato Chips",
      date: "15 Mar 2025",
      active: false,
    },
  ]);

  const toggleReview = (id: number) => {
    setReviews(prev =>
      prev.map(r =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );
  };

  const average =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Customer Reviews</h1>
        <p className="text-muted-foreground">
          Manage customer feedback
        </p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-6">

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Average Rating</p>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {average.toFixed(1)}
                <Star className="text-yellow-500 fill-yellow-500" />
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Total Reviews</p>
            <h2 className="text-3xl font-bold">{reviews.length}</h2>
          </CardContent>
        </Card>

      </div>

      {/* Review List */}
      <div className="space-y-4">

        {reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="p-6 space-y-4">

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{review.customer}</h3>
                  <p className="text-sm text-muted-foreground">
                    {review.product} • {review.date}
                  </p>
                </div>

                <Badge
                  className={
                    review.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }
                >
                  {review.active ? "Visible" : "Hidden"}
                </Badge>
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={18}
                    className={
                      star <= review.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-700">{review.comment}</p>

              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleReview(review.id)}
              >
                {review.active ? "Hide Review" : "Approve Review"}
              </Button>

            </CardContent>
          </Card>
        ))}

      </div>

    </div>
  );
};

export default Reviews;