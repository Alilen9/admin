"use client";

import { useState } from "react";
import { Bell, Heart, BookMarked, User, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Sample data
const reviewStats = {
  totalReviews: 12230,
  reviewChange: 12,
  averageRating: 4.0,
  ratingChange: -24,
};

const monthlyData = [
  { month: "JUN", value: 20 },
  { month: "JUL", value: 20 },
  { month: "AUG", value: 65 },
  { month: "SEP", value: 80 },
  { month: "OCT", value: 20 },
  { month: "NOV", value: 80 },
];

const customerReviews = [
  {
    id: 1,
    name: "Emily T.",
    date: "May 21, 2023",
    avatar: "https://i.pravatar.cc/150?img=17",
    review: "The sales team at this company deserves all the praise. From the moment I contacted them, they were prompt, courteous, and highly knowledgable about the product.",
  },
  {
    id: 2,
    name: "Hilton Santana",
    date: "May 21, 2023",
    avatar: "https://i.pravatar.cc/150?img=18",
    review: "From the moment I contacted them, they were prompt, courteous, and highly. The sales team at this company deserves all the praise.",
  },
  {
    id: 3,
    name: "Luis J.",
    date: "May 21, 2023",
    avatar: "https://i.pravatar.cc/150?img=19",
    review: "The sales team at this company deserves all the praise. From the moment I contacted them, they were prompt, courteous, and highly.",
  },
];

export default function ReviewPage() {
  const [activeMenu, setActiveMenu] = useState("Customer Reviews");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter reviews based on search input
  const filteredReviews = customerReviews.filter((review) =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white font-inter">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-black/90 flex flex-col p-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-yellow-400">ADMIN</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Navigation */}
        <div className="space-y-2 flex-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              Business Overview
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              Analytics
            </Button>
          </Link>
          <Link href="/customers">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              Customers
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              Messages
            </Button>
          </Link>
          <Button
            variant="default"
            className="w-full justify-start bg-yellow-500 text-black"
            onClick={() => setActiveMenu("Customer Reviews")}
          >
            Customer Reviews
          </Button>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              Settings
            </Button>
          </Link>
          <Link href="/help">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              Help Centre
            </Button>
          </Link>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 flex flex-col bg-white text-gray-900">
        {/* HEADER */}
        <header className="flex justify-between items-center p-6 bg-white  ">
          <h1 className="text-xl font-bold">{activeMenu}</h1>
          <div className="flex items-center gap-4">
            <Link href="/reviews/new">
  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
    New Review
  </Button>
</Link>

            <button className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                          <Bell className="h-5 w-5 text-gray-600" />
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            3
                          </span>
                        </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.pravatar.cc/50" alt="User Avatar" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-semibold text-gray-800">Alice Kinona</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> My Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookMarked className="mr-2 h-4 w-4" /> Lockscreen
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* BODY */}
        <main className="p-8 flex-1 overflow-y-auto">
          {/* Total Reviews & Avg Rating */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Card className="rounded-xl shadow-lg border-gray-200">
              <CardHeader>
                <CardTitle>Total Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end space-x-4">
                  <p className="text-4xl font-bold">{reviewStats.totalReviews.toLocaleString()}</p>
                  <div className="text-green-500 font-medium">+{reviewStats.reviewChange}%</div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Past 6 months</p>
              </CardContent>
            </Card>
            <Card className="rounded-xl shadow-lg border-gray-200">
              <CardHeader>
                <CardTitle>Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end space-x-4">
                  <p className="text-4xl font-bold">{reviewStats.averageRating.toFixed(1)}</p>
                  <div className="text-red-500 font-medium">{reviewStats.ratingChange}%</div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Past 6 months</p>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Reviews Chart */}
          <Card className="rounded-xl shadow-lg border-gray-200 mb-6">
            <CardHeader>
              <CardTitle>Monthly Reviews</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FFFF00" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
            {filteredReviews.map((review) => (
              <Card key={review.id} className="rounded-xl shadow-lg border-gray-200">
                <CardContent className="flex flex-col space-y-4 p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
