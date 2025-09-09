"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // === HARDCODED ADMIN CREDENTIALS ===
  const ADMIN_EMAIL = "alicemkangoma@gmail.com";
  const ADMIN_PASSWORD = "Alikin121#";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Normalize inputs
    const inputEmail = form.email.trim().toLowerCase();
    const inputPassword = form.password.trim();

    if (
      inputEmail === ADMIN_EMAIL.toLowerCase() &&
      inputPassword === ADMIN_PASSWORD
    ) {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      toast.error("Invalid email or password!");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative w-[400px] rounded-2xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-white/20 bg-white/20 px-4 py-2 text-white placeholder-white/70 outline-none focus:border-yellow-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg border border-white/20 bg-white/20 px-4 py-2 text-white placeholder-white/70 outline-none focus:border-yellow-400 pr-10"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-400 py-2 font-semibold text-gray-900 hover:bg-yellow-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
