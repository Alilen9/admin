"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReferencesPage() {
  const { id } = useParams(); // Get customer/chat ID from URL

  // Dummy references (replace with real data fetching later)
  const references = [
    { title: "Project A", description: "A project completed in 2023." },
    { title: "Project B", description: "Ongoing collaboration on mobile app." },
    { title: "Project C", description: "Website redesign and optimization." },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">References for Customer #{id}</h1>

        <div className="space-y-4">
          {references.map((ref, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white shadow border border-gray-200"
            >
              <h2 className="font-semibold text-lg">{ref.title}</h2>
              <p className="text-gray-600">{ref.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back Button at the Bottom */}
      <div className="mt-8">
        <Link
          href="/messages"
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Messages
        </Link>
      </div>
    </div>
  );
}
