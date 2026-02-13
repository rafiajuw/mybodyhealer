"use client";

import { X } from "lucide-react";
import { FormEvent, useState } from "react";

interface Product {
  name: string;
  dosage?: string;
  packSize?: string;
  category?: string;
}

interface Props {
  product: Product;
  onClose: () => void;
}

export default function OrderForm({ product, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const data = new FormData(form);

    data.append("type", "order");
    data.append("productName", product.name);
    data.append("productCategory", product.category || "N/A");
    if (product.dosage) data.append("productDosage", product.dosage);
    if (product.packSize) data.append("productPackSize", product.packSize);

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => onClose(), 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close order form"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-emerald-800">
          Order {product.name}
        </h2>

        {(product.dosage || product.packSize) && (
          <p className="text-sm text-emerald-600 mt-1 mb-4">
            {product.dosage}
            {product.packSize && ` • ${product.packSize}`}
          </p>
        )}

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-green-700">Order request sent!</p>
            <p className="text-sm text-gray-500 mt-1">We&apos;ll contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <input
              name="name"
              required
              placeholder="Full Name"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
            <input
              name="phone"
              required
              placeholder="Phone / WhatsApp Number"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
            <textarea
              name="message"
              rows={3}
              placeholder="Quantity, city, delivery address etc."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Order Request"
              )}
            </button>

            {status === "error" && (
              <p className="text-center text-red-600 text-sm bg-red-50 p-2 rounded-lg">
                Failed to send order. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
