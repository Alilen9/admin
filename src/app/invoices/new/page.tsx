"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// 📦 Import jsPDF for PDF generation
import jsPDF from "jspdf";

export default function NewInvoicePage() {
  const router = useRouter();
  const [invoice, setInvoice] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    setInvoice({
      customer: formData.get("customer"),
      invoiceNo: formData.get("invoiceNo"),
      date: formData.get("date"),
      amount: formData.get("amount"),
      status: formData.get("status"),
      description: formData.get("description"),
    });
  };

  const handleDownload = () => {
    if (!invoice) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Customer: ${invoice.customer}`, 20, 40);
    doc.text(`Invoice No: ${invoice.invoiceNo}`, 20, 50);
    doc.text(`Date: ${invoice.date}`, 20, 60);
    doc.text(`Amount: $${invoice.amount}`, 20, 70);
    doc.text(`Status: ${invoice.status}`, 20, 80);
    doc.text("Description:", 20, 95);
    doc.text(invoice.description || "-", 20, 105);

    doc.save(`invoice-${invoice.invoiceNo}.pdf`);
  };

  const handlePrint = () => {
    if (!invoice) return;
    window.print();
  };

  const handleShare = () => {
    if (!invoice) return;

    const message = `Invoice ${invoice.invoiceNo} for ${invoice.customer} - Amount: $${invoice.amount}, Status: ${invoice.status}`;
    router.push(`/messages?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <Card className="w-full max-w-2xl shadow-lg border-none">
        <CardContent className="p-6 space-y-6">
          {/* Page header */}
          <h2 className="text-2xl font-bold">Create New Invoice</h2>

          {!invoice ? (
            // === FORM ===
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <Input name="customer" placeholder="Enter customer name" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Number
                  </label>
                  <Input name="invoiceNo" placeholder="INV-001" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input type="date" name="date" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <Input type="number" name="amount" placeholder="Enter amount" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Select name="status" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  name="description"
                  placeholder="Add additional details about the invoice..."
                  rows={4}
                />
              </div>

              {/* Save + Back Buttons at the bottom */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <Button type="submit" className="bg-blue-600 text-white">
                  Save Invoice
                </Button>
              </div>
            </form>
          ) : (
            // === INVOICE PREVIEW ===
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Invoice Preview</h3>
              <div className="border p-4 rounded-md bg-gray-50">
                <p><strong>Customer:</strong> {invoice.customer}</p>
                <p><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
                <p><strong>Date:</strong> {invoice.date}</p>
                <p><strong>Amount:</strong> ${invoice.amount}</p>
                <p><strong>Status:</strong> {invoice.status}</p>
                <p><strong>Description:</strong> {invoice.description || "-"}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button onClick={handleDownload} className="bg-green-600 text-white">
                  Download PDF
                </Button>
                <Button onClick={handlePrint} variant="outline">
                  Print
                </Button>
                <Button onClick={handleShare} className="bg-purple-600 text-white">
                  Share
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setInvoice(null)} // Reset to form
                >
                  Back to Form
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
