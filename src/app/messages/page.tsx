"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  ArrowRight,
  Send,
  Paperclip,
  Smile,
  ChevronDown,
  Bell,
  User,
  LogOut,
  Lock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";

// --- Chat Data ---
const chatList = [
  { id: 1, name: "George Paul", avatar: "https://i.pravatar.cc/150?img=68", message: "Hey Erşad! How is going?", time: "09 Jan", online: true },
  { id: 2, name: "Zeke Siphron", avatar: "https://i.pravatar.cc/150?img=53", message: "I can help 👋", time: "09 Jan", online: false },
  { id: 3, name: "Giana Press", avatar: "https://i.pravatar.cc/150?img=25", message: "I have a new project!", time: "09 Jan", online: true },
  { id: 4, name: "Zain Bator", avatar: "https://i.pravatar.cc/150?img=61", message: "Need to fix this place...", time: "09 Jan", online: false },
  { id: 5, name: "Ann Henwitz", avatar: "https://i.pravatar.cc/150?img=47", message: "I understood, okey", time: "09 Jan", online: false },
  { id: 6, name: "Wilson Carder", avatar: "https://i.pravatar.cc/150?img=46", message: "As you wish", time: "09 Jan", online: true },
  { id: 7, name: "Paityn Lipschutz", avatar: "https://i.pravatar.cc/150?img=33", message: "Thank you!", time: "09 Jan", online: false },
];

// --- Messages Data ---
const messages = [
  { sender: "me", text: "Hey George! Thanks 👋" },
  { sender: "other", text: "I saw your references. They are very good!" },
  { sender: "me", text: "Congratulations! How is your job position? I have a very good offer for you." },
  { sender: "other", text: "Yes, I'm ready for new adventures! 😊" },
];

export default function MessagePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChat, setActiveChat] = useState(chatList[0]);

  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white font-inter">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-black/90 flex flex-col p-4">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-yellow-400">ADMIN</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none"
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
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
                Customers
              </Button>
            </Link>
            <Link href="/messanges">
              <Button variant="default" className="w-full justify-start bg-yellow-500 text-black">
                Messages
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 space-y-2">
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
      <div className="flex-1 flex flex-col bg-gray-100 text-gray-900">
        {/* HEADER */}
        <header className="flex justify-between items-center p-6 bg-white ">
          <h1 className="text-xl font-bold">Messages</h1>
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
              <Plus size={16} /> New Chat
            </Button>
            <button className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
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
                  <Lock className="mr-2 h-4 w-4" /> Lockscreen
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT CHAT LIST */}
          <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 flex-1 overflow-y-auto">
              {/* Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search message..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>

              {/* Chats */}
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-4 p-4 border-b border-gray-200 cursor-pointer transition-colors
                  ${chat.id === activeChat.id ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  onClick={() => setActiveChat(chat)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.avatar} alt={`${chat.name} Avatar`} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-gray-800">{chat.name}</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT CHAT CONTENT */}
          <main className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={activeChat.avatar} alt={`${activeChat.name} Avatar`} />
                  <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{activeChat.name}</h3>
                  <p className="text-sm text-gray-500">Developer Manager</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="font-semibold">View references</span>
                  <ArrowRight size={16} />
                </div>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col-reverse">
              {messages.slice().reverse().map((msg, index) => (
                <div key={index} className={`flex mb-4 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-3 rounded-xl shadow-sm
                    ${msg.sender === "me" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Smile size={20} className="text-gray-500 mr-2" />
                <input type="text" placeholder="Message..." className="flex-1 bg-transparent text-sm focus:outline-none" />
                <Paperclip size={20} className="text-gray-500 ml-2 cursor-pointer" />
                <Separator orientation="vertical" className="h-6 mx-2 bg-gray-300" />
                <button className="p-2 bg-blue-600 text-white rounded-full ml-1">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
