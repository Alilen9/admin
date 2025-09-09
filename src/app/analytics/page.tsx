"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Bell, User, LogOut, Lock, ChevronDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

// --- Data for Charts ---
const analyticsChartData = [
  { name: "Jan", value: 2000 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 2500 },
  { name: "Apr", value: 3000 },
  { name: "May", value: 4543 },
  { name: "Jun", value: 3200 },
  { name: "Jul", value: 3800 },
  { name: "Aug", value: 4100 },
];

const totalVisitsData = [
  { name: "Mon", value: 20000 },
  { name: "Tue", value: 28882 },
  { name: "Wed", value: 25000 },
  { name: "Thu", value: 31000 },
  { name: "Fri", value: 29000 },
  { name: "Sat", value: 35000 },
  { name: "Sun", value: 33000 },
];

export default function AnalyticsPage() {
  const [date] = useState(new Date());

  return (
    <div className="flex h-screen bg-gray-900 text-white font-inter">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-black/90 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-yellow-400">ADMIN</span>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <nav className="space-y-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                Business Overview
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="default" className="w-full justify-start bg-yellow-500 text-black">
                Analytics
              </Button>
            </Link>
            <Link href="/customers">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                Customers
              </Button>
            </Link>
          </nav>
          <div className="mt-6 space-y-2">
            <Link href="/messages">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                Messages
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                Customer Reviews
              </Button>
            </Link>
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
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 p-6 overflow-y-auto bg-white rounded-l-2xl text-gray-900">
        {/* === HEADER === */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">Analytics</h2>
            <p className="text-black-500 text-sm">Here’s your analytics overview.</p>
          </div>
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                3
              </span>
            </button>
            {/* Profile Dropdown */}
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/50"
                alt="User"
                className="h-10 w-10 rounded-full"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-semibold">
                    Alice Kinona
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" /> My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Lock className="mr-2 h-4 w-4" /> Lockscreen
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

       
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Product Overview Card */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Product overview</h3>
                <div className="flex items-center text-xs text-gray-500">
                  This month <ChevronDown className="w-3 h-3 ml-1" />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-1">$43,630</h4>
              <p className="text-xs text-gray-500 mb-4">Total sales</p>
              <div className="flex items-center gap-2 mb-2">
                <Button size="sm" className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full">
                  Select by product
                </Button>
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 text-xs px-2 py-1 rounded-full">
                  Trending
                </Button>
              </div>
              <p className="text-xs text-gray-500">New sales: 453 ↑</p>
            </CardContent>
          </Card>

          {/* Active Sales Card */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-2">Active sales</h3>
                <h4 className="text-2xl font-bold mb-1">$27,064</h4>
                <p className="text-xs text-gray-500 mb-4">
                  vs last month <span className="text-orange-500">↑ 9%</span>
                </p>
                <a href="#" className="text-orange-500 text-xs flex items-center">
                  See Details →
                </a>
              </div>
              <div className="flex items-end h-full">
                <div className="w-2 h-10 bg-black rounded-sm"></div>
                <div className="w-2 h-14 bg-black rounded-sm ml-1"></div>
                <div className="w-2 h-20 bg-yellow-500 rounded-sm ml-1"></div>
              </div>
            </CardContent>
          </Card>

          {/* Product Revenue Card */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-2">Product Revenue</h3>
                <h4 className="text-2xl font-bold mb-1">$16,568</h4>
                <p className="text-xs text-gray-500 mb-4">
                  vs last month <span className="text-orange-500">↑ 9%</span>
                </p>
                <a href="#" className="text-orange-500 text-xs flex items-center">
                  See Details →
                </a>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                  <circle
                    className="text-yellow-500"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    style={{
                      strokeDasharray: "251.2",
                      strokeDashoffset: `calc(251.2 - (251.2 * 0.75))`,
                      transform: "rotate(-90deg)",
                      transformOrigin: "50% 50%",
                    }}
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold">
                  75%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Analytics Main Chart */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Analytics</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-gray-500">
                    This year <ChevronDown className="w-3 h-3 ml-1" />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2 border-gray-300 rounded-md">
                    <Filter className="w-4 h-4 text-gray-500" /> Filters
                  </Button>
                </div>
              </div>
              <div className="flex items-end gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">-$4.5430</span>
                  <span className="text-xs text-red-500">↓ -5.54%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">0.73%</span>
                  <span className="text-xs text-green-500">↑ 7.8%</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={analyticsChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFFF00" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FFFF00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#FFFF00" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sales Performance Card */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sales Performance</h3>
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                    <circle
                      className="text-yellow-500"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      style={{
                        strokeDasharray: "251.2",
                        strokeDashoffset: `calc(251.2 - (251.2 * 0.179))`,
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                      }}
                    />
                  </svg>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                    17.9%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">Since yesterday</p>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Total Sales per day</span>
                </div>
                <div className="text-xs text-gray-500">For today</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <span className="text-sm">Average Sales</span>
                </div>
                <a href="#" className="text-yellow text-xs">
                  For today →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Visits Card */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Total visits by hourly</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <ChevronDown className="w-3 h-3 ml-1" />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-1">288,822</h4>
              <p className="text-xs text-gray-500 mb-4">
                vs last month <span className="text-green-500">↑ 19%</span>
              </p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={totalVisitsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FFFF00" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Products Card */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Top Products</h3>
                <a href="#" className="text-orange-500 text-xs flex items-center">
                  See Details →
                </a>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Product</th>
                    <th className="py-2">Sales</th>
                    <th className="py-2">Revenue</th>
                    <th className="py-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Red Shorts</td>
                    <td className="py-2">4,738</td>
                    <td className="py-2">$47,380</td>
                    <td className="py-2">100</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Blue shorts</td>
                    <td className="py-2">3,728</td>
                    <td className="py-2">$37,280</td>
                    <td className="py-2">150</td>
                  </tr>
                  <tr>
                    <td className="py-2">T-shirt Mini</td>
                    <td className="py-2">2,102</td>
                    <td className="py-2">$21,020</td>
                    <td className="py-2">200</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
