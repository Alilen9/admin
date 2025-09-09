"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Search, Bell, User, LogOut, Lock } from "lucide-react";
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
  LineChart,
  Line,
} from "recharts";

// Sales Data
const salesData = [
  { name: "Jan", profit: 9200, expense: 2600 },
  { name: "Feb", profit: 8000, expense: 3100 },
  { name: "Mar", profit: 9500, expense: 2800 },
  { name: "Apr", profit: 7000, expense: 2500 },
  { name: "May", profit: 8600, expense: 3200 },
  { name: "Jun", profit: 9400, expense: 2700 },
  { name: "Jul", profit: 10000, expense: 3000 },
  { name: "Aug", profit: 7800, expense: 2100 },
  { name: "Sep", profit: 8800, expense: 2900 },
  { name: "Oct", profit: 9600, expense: 2400 },
  { name: "Nov", profit: 9100, expense: 2700 },
  { name: "Dec", profit: 10200, expense: 3100 },
];

// Money In / Out Data
const moneyFlowData = [
  { name: "Jan", moneyIn: 12000, moneyOut: 6000 },
  { name: "Feb", moneyIn: 9500, moneyOut: 5000 },
  { name: "Mar", moneyIn: 11000, moneyOut: 7200 },
  { name: "Apr", moneyIn: 8800, moneyOut: 4600 },
  { name: "May", moneyIn: 10200, moneyOut: 5400 },
  { name: "Jun", moneyIn: 9700, moneyOut: 4900 },
];

export default function DashboardPage() {
  const [date, setDate] = useState(new Date());

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

          {/* Navigation */}
          <nav className="space-y-2 ">
            <Link href="/dashboard">
              <Button
                variant="default"
                className="w-full justify-start bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Business Overview
              </Button>
            </Link>

            <Link href="/analytics">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800"
              >
                Analytics
              </Button>
            </Link>

            <Link href="/customers">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800"
              >
                Customers
              </Button>
            </Link>
          </nav>

          <div className="mt-6 space-y-2">
            <Link href="/messages">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800"
              >
                messages
              </Button>
            </Link>

            <Link href="/reviews">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800"
              >
                Customer Reviews
              </Button>
            </Link>

            <Link href="/settings">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800"
              >
                Settings
              </Button>
            </Link>

            <Link href="/help">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800"
              >
                Help Centre
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 p-6 overflow-y-auto bg-white rounded-l-2xl text-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">Hello, Alice!</h2>
            <p className="text-black-500 text-sm">
              Here’s your overview of your business!
            </p>
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

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-black-500">Total Customers</p>
              <h3 className="text-2xl font-bold">21,978</h3>
              <p className="text-yellow-500 text-xs">↑ 15% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-black-500">Active Customers</p>
              <h3 className="text-2xl font-bold">10,369</h3>
              <p className="text-yellow-500 text-xs">↓ 9% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-black-500">Profit Total</p>
              <h3 className="text-2xl font-bold">$64,981.97</h3>
              <p className="text-yellow-500 text-xs">↑ 27% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-100 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-black-500">Cost of Operation</p>
              <h3 className="text-2xl font-bold">$18,158.21</h3>
              <p className="text-yellow-500 text-xs">↓ 2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart + Calendar */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Sales Overview */}
          <Card className="col-span-2 rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Sales Overview</h3>
                <Button variant="outline" size="sm" className="rounded-full">
                  Month
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="profit" fill="#FFFF00" />
                  <Bar dataKey="expense" fill="#111827" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                required
              />
            </CardContent>
          </Card>
        </div>

        {/* Money In / Out Chart */}
        <Card className="rounded-lg shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Money In / Money Out</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={moneyFlowData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="moneyIn"
                  stroke="#FFFF00"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="moneyOut" stroke="#131313ff" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
