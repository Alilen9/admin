"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

type Review = {
  id: number;
  name: string;
  review: string;
  date: string;
};

export default function NewReviewPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [newReviews, setNewReviews] = useState<Review[]>([]);

  // Load reviews from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("newReviews") || "[]");
    setNewReviews(stored);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      name,
      review,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [...newReviews, newReview];
    setNewReviews(updatedReviews);
    localStorage.setItem("newReviews", JSON.stringify(updatedReviews));

    setName("");
    setReview("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <Card className="w-full max-w-lg shadow-lg border-none">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-bold">Add New Review</h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <Input
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review
                </label>
                <Textarea
                  placeholder="Write customer review..."
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-blue-600 text-white">
                  Save Review
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center text-green-600 font-semibold">
              ✅ Review saved!
            </div>
          )}

          {/* Show list of new reviews */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">🆕 New Reviews</h3>
            {newReviews.length === 0 ? (
              <p className="text-gray-500">No new reviews yet.</p>
            ) : (
              newReviews.map((r) => (
                <div
                  key={r.id}
                  className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.date}</p>
                  <p className="mt-1 text-gray-700">{r.review}</p>
                </div>
              ))
            )}
          </div>

          {/* Back button at bottom */}
          <div className="flex justify-center mt-6">
            <Button variant="ghost" onClick={() => router.back()}>
              ⬅ Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
