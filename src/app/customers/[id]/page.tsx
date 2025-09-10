"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock customer data (in real case, fetch from API/db)
const customers = [
  { id: 1, name: "Alexander Mule", email: "curtis@example.com", products: 68, progress: 70, date: "25 July 2025", status: "Accepted", monitored: true, avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jenny Wilson", email: "jenny@example.com", products: 48, progress: 40, date: "16 July 2025", status: "Overdue", monitored: false, avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Annetta Black", email: "annetta@example.com", products: 105, progress: 90, date: "05 July 2025", status: "Pending", monitored: true, avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Leslie Alexander", email: "leslie@example.com", products: 78, progress: 60, date: "01 July 2025", status: "Active", monitored: false, avatar: "https://i.pravatar.cc/150?img=4" },
];

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const customer = customers.find((c) => c.id.toString() === id);

  if (!customer) {
    return <p className="p-6">Customer not found</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6 ">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5 mr-1" /> Back
          </Button>
          <h1 className="text-xl font-bold">{customer.name}’s Details</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <p className="text-gray-600">{customer.email}</p>
              <span
                className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full
                  ${customer.status === "Accepted" && "bg-green-100 text-green-700"}
                  ${customer.status === "Overdue" && "bg-red-100 text-red-700"}
                  ${customer.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                  ${customer.status === "Active" && "bg-blue-100 text-blue-700"}
                `}
              >
                {customer.status}
              </span>
            </div>
          </div>
        </Card>

        {/* Activity Stats */}
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-500">Purchased Products</h3>
              <p className="text-xl font-bold">{customer.products}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-500">Progress</h3>
              <div className="flex items-center gap-2">
                <Progress value={customer.progress} className="w-full" />
                <span className="text-sm font-medium">{customer.progress}%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-500">Last Activity</h3>
              <p className="text-xl font-bold">{customer.date}</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        {/* Actions */}
<div className="flex gap-4">
  <Button
    className="bg-blue-600 text-white"
    onClick={() => router.push(`/messages?customerId=${customer.id}`)}
  >
    Send Message
  </Button>
  
  <Button
    variant="outline"
    onClick={() => router.push(`/invoices/new?customerId=${customer.id}`)}
  >
    Create Invoice
  </Button>
</div>

      </main>
    </div>
  );
}
