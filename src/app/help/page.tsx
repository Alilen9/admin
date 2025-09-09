"use client";

import { useState } from "react";
import { ChevronDown, Bell, User, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Mock data for FAQ sections
const faqData = [
  {
    id: "problems",
    title: "Problems",
    questions: [
      { id: "1", q: "Why is my invoice showing as unpaid?", a: "This could be due to a delay in payment processing. Please check your bank statement or contact support if the issue persists after 24 hours." },
      { id: "2", q: "My dashboard data is incorrect.", a: "Try refreshing the page or logging out and logging back in. If the data is still incorrect, please report the issue to our technical team." },
    ],
  },
  {
    id: "derived-etymology",
    title: "Derived from the term etymology",
    questions: [
      { id: "3", q: "What does CRM stand for?", a: "CRM stands for Customer Relationship Management. It refers to the strategies, tools, and technologies used by a business to manage and analyze customer interactions and data throughout the customer lifecycle." },
    ],
  },
  {
    id: "summary",
    title: "Summary",
    questions: [
      { id: "4", q: "Can I customize my dashboard?", a: "Yes, you can customize your dashboard by adding or removing widgets from the settings page." },
      { id: "5", q: "How do I add a new user?", a: "To add a new user, navigate to the 'Team Settings' section and click on 'Add User'. You will need to enter their email and set their permissions." },
    ],
  },
];

export default function HelpPage() {
  const [activeMenu, setActiveMenu] = useState("Help Centre");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-inter">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-black/90 flex flex-col p-4">
        <div className="flex items-center gap-2 mb-4">
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

        {/* Sidebar search is assumed here */}

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
          <Button
            variant="default"
            className="w-full justify-start bg-yellow-500 text-black hover:bg-yellow-600"
            onClick={() => setActiveMenu("Help Centre")}
          >
            Help Centre
          </Button>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 flex flex-col bg-white text-gray-900 rounded-l-2xl">
        {/* HEADER */}
        <header className="flex justify-between items-center p-6 ">
          <h1 className="text-xl font-bold">{activeMenu}</h1>
          <div className="flex items-center gap-4">
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
                  <ChevronDown size={16} className="text-gray-500" />
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
                  <Bell className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* BODY */}
        <main className="p-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* FAQ Section */}
            <div className="md:col-span-2 space-y-6">
              {faqData.map((section) => (
                <div key={section.id} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">{section.title}</h3>
                  {section.questions.map((item) => (
                    <Card
                      key={item.id}
                      className="bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-lg"
                      onClick={() => toggleQuestion(item.id)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900">{item.q}</p>
                        <ChevronDown
                          size={20}
                          className={`text-gray-500 transform transition-transform duration-300 ${
                            expandedQuestion === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      {expandedQuestion === item.id && (
                        <div className="mt-4 text-gray-700">{item.a}</div>
                      )}
                    </Card>
                  ))}
                </div>
              ))}
            </div>

            {/* Glossary Section */}
            <div className="md:col-span-1 space-y-6">
              <Card className="p-4 rounded-lg shadow bg-yellow-50">
                <h3 className="text-lg font-bold mb-3 text-yellow-800">Glossary</h3>
                <div className="space-y-2">
                  {faqData.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-yellow-700 hover:text-yellow-900 font-medium transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </Card>

              {/* Additional Info Card */}
              <Card className="p-4 rounded-lg shadow bg-green-50">
                <h3 className="text-lg font-bold mb-2 text-green-700">Info</h3>
                <div className="space-y-2 text-green-900">
                  <p className="flex justify-between items-center">
                    <span className="font-medium">Last Question:</span> <span>17-11-2023</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium">Last Answer:</span> <span>22-01-2024</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
