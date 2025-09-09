"use client";

import { useState } from "react";
import { Bell, ChevronDown, Plus, User, LogOut, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    { id: 1, name: "Alexander Mule", email: "curtis@example.com", products: 68, progress: 70, date: "25 July 2025", status: "Accepted", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Jenny Wilson", email: "jenny@example.com", products: 48, progress: 40, date: "16 July 2025", status: "Overdue", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Annetta Black", email: "annetta@example.com", products: 105, progress: 90, date: "05 July 2025", status: "Pending", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "Leslie Alexander", email: "leslie@example.com", products: 78, progress: 60, date: "01 July 2025", status: "Active", avatar: "https://i.pravatar.cc/150?img=4" },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-green-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-inter">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-black/90 flex flex-col p-4">
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-yellow-400">ADMIN</span>
          </div>

          {/* Sidebar Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Navigation */}
          <div className="space-y-2">
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
              <Button variant="default" className="w-full justify-start bg-yellow-500 text-black">
                Customers
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
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
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 p-6 overflow-y-auto bg-white rounded-l-2xl text-gray-900">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Customers</h2>
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
              <Plus className="h-4 w-4" /> Create New Invoice
            </Button>
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
                  <ChevronDown className="h-4 w-4 text-gray-500" />
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

        {/* Customer Table */}
        <Card className="shadow-none border-none bg-white">
          <CardContent className="p-0">
            <div className="flex justify-between items-center mb-4 border-b pb-3 p-4">
              <h3 className="text-lg font-semibold text-gray-800">Customer Movements</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-semibold text-black">View all</span>
                <span>Monitored</span>
                <span>Unmonitored</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 py-2 px-4 text-xs font-semibold text-gray-500 border-b">
              <div className="col-span-2">Overview</div>
              <div>Purchased Product</div>
              <div>Progress</div>
              <div>Date</div>
              <div>Status</div>
            </div>

            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="grid grid-cols-6 gap-4 items-center py-3 px-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={customer.avatar} alt={`${customer.name} Avatar`} />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">{customer.products} Products</div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={customer.progress}
                    className={`w-full h-2 rounded-full ${getProgressColor(customer.progress)}`}
                  />
                  <span className="text-xs text-gray-600">{customer.progress}%</span>
                </div>
                <div className="text-sm text-gray-700">{customer.date}</div>
                <div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full
                      ${customer.status === "Accepted" && "bg-green-100 text-green-700"}
                      ${customer.status === "Overdue" && "bg-red-100 text-red-700"}
                      ${customer.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                      ${customer.status === "Active" && "bg-blue-100 text-blue-700"}
                      ${customer.status === "Rejected" && "bg-gray-100 text-gray-700"}
                    `}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
