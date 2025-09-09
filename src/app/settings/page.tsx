"use client";

import { useState, useRef } from "react";
import { Bell, User, ChevronDown, Lock, QrCode, UploadCloud, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import React from "react";

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState("Settings");
  const [activeTab, setActiveTab] = useState("Profile");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [searchTerm, setSearchTerm] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [profileForm, setProfileForm] = useState({
    fullName: "Alice Kinona",
    email: "alice@example.com",
    phoneNumber: "+254 712 345 678",
    location: "Nairobi, Kenya",
  });
  const [profilePicture, setProfilePicture] = useState("https://i.pravatar.cc/100");

  const [notificationSettings, setNotificationSettings] = useState({
    projectUpdates: true,
    mentions: true,
    billingAlerts: false,
    newMessages: true,
  });
  
  // Create a ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileForm({ ...profileForm, [id]: value });
  };

  const handleSaveProfile = () => {
    console.log("Saving profile changes:", profileForm);
    setToastMessage("Profile changes saved successfully.");
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUploadClick = () => {
    // Check if the ref is not null before trying to click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files exist before trying to access the first element
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Create a URL for the selected file to display it
      const newPhotoUrl = URL.createObjectURL(file);
      setProfilePicture(newPhotoUrl);
      setToastMessage("Profile photo uploaded.");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
      // In a real app, you would send the 'file' to a server here
      console.log("File selected:", file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePicture("https://i.pravatar.cc/100");
    setToastMessage("Profile photo removed.");
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveNotifications = () => {
    console.log("Saving notification settings:", notificationSettings);
    setToastMessage("Notification settings saved.");
    setToastType("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setNotificationSettings({ ...notificationSettings, [id]: checked });
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

        <div className="space-y-2 flex-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              <span className="mr-2 h-4 w-4"></span> Business Overview
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              <span className="mr-2 h-4 w-4"></span> Analytics
            </Button>
          </Link>
          <Link href="/customers">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              <span className="mr-2 h-4 w-4"></span> Customers
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              <span className="mr-2 h-4 w-4"></span> Messages
            </Button>
          </Link>
          <Link href="/reviews">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              <span className="mr-2 h-4 w-4"></span> Customer Reviews
            </Button>
          </Link>
          <Button
            variant="default"
            className="w-full justify-start bg-yellow-500 text-black hover:bg-yellow-600"
            onClick={() => setActiveMenu("Settings")}
          >
            <span className="mr-2 h-4 w-4"></span> Settings
          </Button>
          <Link href="/help">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800">
              <span className="mr-2 h-4 w-4"></span> Help Centre
            </Button>
          </Link>
        </div>
      </aside>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 flex flex-col bg-white text-gray-900 rounded-l-2xl">
        {/* HEADER */}
        <header className="flex justify-between items-center p-6 bg-white">
          <h1 className="text-xl font-bold">{activeMenu}</h1>
          <div className="flex items-center gap-4">
            {/* Notification */}
            <button className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                                      <Bell className="h-5 w-5 text-gray-600" />
                                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        3
                                      </span>
                                    </button>

            {/* User Dropdown */}
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
          <Card className="rounded-xl shadow-lg border-gray-200">
            <CardHeader>
              {/* Tabs */}
              <div className="flex space-x-4 border-b border-gray-200 pb-2">
                {["Profile", "Security", "Notifications"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-yellow-500 text-gray-900"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Profile Tab Content */}
              {activeTab === "Profile" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profilePicture} alt="User Avatar" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold">Change Profile Photo</h2>
                      <div className="flex space-x-2">
                        {/* Hidden file input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <Button variant="outline" size="sm" onClick={handleUploadClick}>Upload</Button>
                        <Button variant="outline" size="sm" onClick={handleRemovePhoto}>Remove</Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileForm.fullName}
                        onChange={handleInputChange}
                        placeholder="Alice Kinona"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={profileForm.email} placeholder="alice@example.com" disabled />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+254 712 345 678"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileForm.location}
                        onChange={handleInputChange}
                        placeholder="Nairobi, Kenya"
                      />
                    </div>
                  </div>
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-600" onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              )}

              {/* Security Tab Content */}
              {activeTab === "Security" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold">Password</h2>
                    <p className="text-sm text-gray-500">
                      Update your password to keep your account secure.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input type="password" placeholder="Current Password" />
                      <Input type="password" placeholder="New Password" />
                      <Input type="password" placeholder="Confirm New Password" />
                    </div>
                    <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Update Password</Button>
                  </div>
                  
                  <div className="space-y-2 pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-bold">Two-Factor Authentication</h2>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account.
                    </p>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <QrCode className="text-gray-600" size={24} />
                        <div>
                          <p className="font-medium">Authenticator App</p>
                          <p className="text-sm text-gray-500">Use Google or Microsoft Authenticator.</p>
                        </div>
                      </div>
                      <Switch 
                        checked={twoFactorEnabled}
                        onCheckedChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className="bg-gray-200 data-[state=checked]:bg-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab Content */}
              {activeTab === "Notifications" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold">Email Notifications</h2>
                    <p className="text-sm text-gray-500">
                      Choose what to be notified about via email.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Project Updates</Label>
                        <Switch
                          checked={notificationSettings.projectUpdates}
                          onCheckedChange={(checked) => handleSwitchChange("projectUpdates", checked)}
                          className="bg-gray-200 data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Mentions</Label>
                        <Switch
                          checked={notificationSettings.mentions}
                          onCheckedChange={(checked) => handleSwitchChange("mentions", checked)}
                          className="bg-gray-200 data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Billing Alerts</Label>
                        <Switch
                          checked={notificationSettings.billingAlerts}
                          onCheckedChange={(checked) => handleSwitchChange("billingAlerts", checked)}
                          className="bg-gray-200 data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-6 border-t border-gray-200">
                    <h2 className="text-lg font-bold">Push Notifications</h2>
                    <p className="text-sm text-gray-500">
                      Receive alerts on your mobile device or browser.
                    </p>
                    <div className="flex items-center justify-between">
                      <Label>New Messages</Label>
                      <Switch
                        checked={notificationSettings.newMessages}
                        onCheckedChange={(checked) => handleSwitchChange("newMessages", checked)}
                        className="bg-gray-200 data-[state=checked]:bg-yellow-500"
                      />
                    </div>
                  </div>
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-600" onClick={handleSaveNotifications}>Save Notifications</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
        
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-xl text-white z-50 transition-transform duration-300 transform translate-y-0"
               style={{ backgroundColor: toastType === "success" ? "#10B981" : "#EF4444" }}>
            <div className="flex items-center justify-between">
              <span>{toastMessage}</span>
              <button onClick={() => setShowToast(false)} className="ml-4 text-white hover:text-gray-200">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}